
from multiprocessing import context
from django.shortcuts import redirect, render
from django.http import HttpResponse    # Import this only, Not something else
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from django.contrib.auth.decorators import login_required

from Movies.models import Movie   
from .forms import MovieForm
from .resources import MovieResource
from django.contrib import messages
from tablib import Dataset

# Create your views here.
def home(request):
    is_superuser = request.user.is_superuser
    context = {'is_superuser': is_superuser}
    return render (request, 'Movies/home.html', context)


def loginPage(request):

    if request.user.is_authenticated:
        return redirect('home')

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        try:
            user =User.objects.get(username = username)
        except:
            messages.error(request, "User does not exist")
            return redirect('login')
        
        user = authenticate(request, username = username, password = password)

        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, "Username and password do not match")

    context = {}
    return render(request, 'Movies/login.html', context)


def registerPage(request):
    form = UserCreationForm()

    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, "Error during registration")
    

    context = {'form': form}
    return render (request, 'Movies/register.html', context )

def logoutUser(request):
    logout(request)
    return redirect('home')


@login_required(login_url='login')
def create_movie(request):
    context = {}
    return render (request, 'Movies/create_movie.html', context)




# To create entry for a single movie using web.
@login_required(login_url='login')
def createMovie(request):
    form = MovieForm()

    if request.method == 'POST':
        form = MovieForm(request.POST)
        print(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "The movie was succesfully added")
            return redirect('home')
        else:
            messages.error(request, "Some Error")
            return redirect('createMovie')

        
    context = {'form':form}
    return render (request, 'Movies/create_movie_single.html', context)


# To create entry for a movie using Excel file.
@login_required(login_url='login')
def createMovieUsingExcel(request):
    if request.method == 'POST':
        movie_resource = MovieResource()      # Not used I think. Delete in future and also resource.py
        dataset = Dataset()
        try: 
            new_movie = request.FILES['myfile']
            if not new_movie.name.endswith('xlsx'):
                messages.info(request,'Wrong Format. Only Upload Excel file with xlsx extension')
                return redirect('createMovieUsingExcel')

            imported_data = dataset.load(new_movie.read(), format = 'xlsx')

            for data in imported_data:
                if(data[1] is not None):
                    value = {
                        'name': data[1],
                        'actors': data[2],
                        'release_date': data[3],
                        'poster_path': data[4],
                        'genres': data[5]
                    }

                    form = MovieForm(value)
                    if form.is_valid():
                        form.save()
            messages.success(request,'The data was succesfully imported into database')
            return redirect('createMovieUsingExcel')
                        
        except:
            messages.info(request,'No file was chosen. Please select an excel file to upload.')
            return redirect('createMovieUsingExcel')


    return render (request, 'Movies/create_movie_using_excel.html')


#Various filters to read a movie
def read_movie(request):
    if request.method == "POST":
        actor_list = request.POST.get('actor_name').split(',') if request.POST.get('actor_name') else ""
        genre_list = request.POST.get('genre').split(',') if request.POST.get('genre') else ""
        release_date = request.POST.get('release_date') if request.POST.get('release_date') else ""
        id = request.POST.get('id') if request.POST.get('id') else ""

        movie = Movie.objects.all()
        for actors in actor_list:
            movie = movie.filter(actors__icontains = actors.strip())
        
        for genre in genre_list:
            movie = movie.filter(genres__icontains = genre.strip())
        
        movie = movie.filter(release_date__icontains = release_date)
        if (id != ""):
            movie = movie.filter(pk = id)

        total_movies = movie.count()
        context = {'movie':movie, 'total_movies' : total_movies}
        
        return render (request, 'Movies/read_movie.html', context)


    return render (request, 'Movies/read_movie.html')


# To delete any movie by its ID
@login_required(login_url='login')
def delete_movie(request):
    if request.method == "POST":
        movie_ID = request.POST.get('movie_ID') 
        movie = Movie.objects.filter(pk=movie_ID)#.delete()
        if(movie):
            movie = Movie.objects.get(pk=movie_ID)
            Movie.objects.get(pk=movie_ID).delete()
            message = "Movie with ID: " + str(movie_ID) + " ( " + movie.name  + " ) was successfully deleted."
            messages.error(request, message)
            return render (request, 'Movies/delete_movie.html')
        else:
            message = "Movie with ID: " + str(movie_ID) + " was not found"
            messages.error(request, message)
            return redirect("delete_movie")

    return render (request, 'Movies/delete_movie.html')


@login_required(login_url='login')
def delete_movie_key(request, pk):
    movie = Movie.objects.filter(pk=pk)#.delete()
    if(movie):
        movie = Movie.objects.get(pk=pk)
        Movie.objects.get(pk=pk).delete()
        message = "Movie " + str(movie.name) + " with Movie ID " + str(movie.id) + " has been successfully deleted"
        messages.success(request, message)

        return redirect ( 'home')
    else:
        return HttpResponse("Movie with given id not found")


# To update any movie by its ID
@login_required(login_url='login')
def update_movie(request):
    form = MovieForm()

    if request.method == "POST":
        movie_ID = request.POST.get('movie_ID')
        name = request.POST.get('name') if request.POST.get('name') else ""
        release_date = request.POST.get('release_date') if request.POST.get('release_date') else ""
        genres = request.POST.get('genres') if request.POST.get('genres') else ""
        actors = request.POST.get('actors') if request.POST.get('actors') else ""
        poster_path = request.POST.get('poster_path') if request.POST.get('poster_path') else ""

        movie = Movie.objects.filter(pk=movie_ID)#.delete()
        if(movie):
            movie = Movie.objects.get(pk=movie_ID)
            if(name != ""):
                movie.name = name
            if(release_date != ""):
                movie.release_date = release_date
            if(genres != ""):
                movie.genres = genres
            if(actors != ""):
                movie.actors = actors
            if(poster_path != ""):
                movie.poster_path = poster_path

            print(poster_path)
            movie.save()
            
            message = movie.name +  " with Movie ID " + str(movie.id) + " has been successfully updated"
            messages.success(request, message)
            
            return redirect ( 'home')
        else:
            return HttpResponse("Movie with given id not found. Cannot be updated")

    context = {'form' : form}

    return render (request, 'Movies/update_movie.html', context)

# To update any movie by its ID
@login_required(login_url='login')
def update_movie_key(request, pk):
    if request.method == "POST":
        movie_ID = pk
        name = request.POST.get('name') if request.POST.get('name') else ""
        release_date = request.POST.get('release_date') if request.POST.get('release_date') else ""
        genres = request.POST.get('genres') if request.POST.get('genres') else ""
        actors = request.POST.get('actors') if request.POST.get('actors') else ""
        poster_path = request.POST.get('poster_path') if request.POST.get('poster_path') else ""

        movie = Movie.objects.filter(pk=movie_ID)#.delete()
        if(movie):
            movie = Movie.objects.get(pk=movie_ID)

            if(name != ""):
                movie.name = name
            if(release_date != ""):
                movie.release_date = release_date
            if(genres != ""):
                movie.genres = genres
            if(actors != ""):
                movie.actors = actors
            if(poster_path != ""):
                movie.poster_path = poster_path

            movie.save()
            
            message = movie.name +  " with Movie ID " + str(movie.id) + " has been successfully updated"
            messages.success(request, message)
            
            return redirect ( 'home')
        else:
            return HttpResponse("Movie with given id not found. Cannot be updated")

    
    movie = Movie.objects.get(pk=pk)  
    context = {'movie' : movie, "updated": False}

    return render (request, 'Movies/update_movie.html', context)