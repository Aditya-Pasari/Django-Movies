
import datetime, sys
from multiprocessing import context
from platform import release
from django.shortcuts import redirect, render
# Import this only, Not something else
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

# FOR JWT - Login, Logout
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import permissions

from Movies.models import Movie

from .forms import MovieForm
from .resources import MovieResource
from django.contrib import messages
from tablib import Dataset

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser

from .serializers import MovieSerializer, UserSerializer

#Celery
#sys.path.append("..")
from .tasks import test_func  


import json


# Create your views here.

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


def home(request):
    is_superuser = request.user.is_superuser
    context = {'is_superuser': is_superuser}
    return render(request, 'Movies/home.html', context)


def loginPage(request):

    if request.user.is_authenticated:
        return redirect('home')

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        try:
            user = User.objects.get(username=username)
        except:
            messages.error(request, "User does not exist")
            print("User does not exist")
            return redirect('login')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            print("User logging in")
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
    return render(request, 'Movies/register.html', context)


def logoutUser(request):
    logout(request)
    return redirect('home')


@login_required(login_url='login')
def create_movie(request):
    context = {}
    return render(request, 'Movies/create_movie.html', context)


# To create entry for a single movie using web.
@login_required(login_url='login')
def createMovie(request):
    form = MovieForm()

    if request.method == 'POST':
        form = MovieForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "The movie was succesfully added")
            return redirect('home')
        else:
            messages.error(request, "Some Error")
            return redirect('createMovie')

    context = {'form': form}
    return render(request, 'Movies/create_movie_single.html', context)


# To create entry for a movie using Excel file.
@login_required(login_url='login')
def createMovieUsingExcel(request):
    if request.method == 'POST':
        # Not used I think. Delete in future and also resource.py
        movie_resource = MovieResource()
        dataset = Dataset()
        try:
            new_movie = request.FILES['myfile']
            if not new_movie.name.endswith('xlsx'):
                messages.info(
                    request, 'Wrong Format. Only Upload Excel file with xlsx extension')
                return redirect('createMovieUsingExcel')

            imported_data = dataset.load(new_movie.read(), format='xlsx')

            for data in imported_data:
                if(data[1] is not None):
                    value = {
                        'name': data[1],
                        'actors': data[2],
                        'release_date': data[3],
                        'poster_path': data[4],
                        'genres': data[5],
                        'ratings': data[6],
                        'ratings_count': data[7]
                    }

                    form = MovieForm(value)
                    if form.is_valid():
                        form.save()
            messages.success(
                request, 'The data was succesfully imported into database')
            return redirect('createMovieUsingExcel')

        except:
            messages.info(
                request, 'No file was chosen. Please select an excel file to upload.')
            return redirect('createMovieUsingExcel')

    return render(request, 'Movies/create_movie_using_excel.html')


# Various filters to read a movie
def read_movie(request):
    if request.method == "POST":

        actor_list = request.POST.get('actor_name').split(
            ',') if request.POST.get('actor_name') else ""
        genre_list = request.POST.get('genre').split(
            ',') if request.POST.get('genre') else ""
        release_date = request.POST.get(
            'release_date') if request.POST.get('release_date') else ""
        id = request.POST.get('id') if request.POST.get('id') else ""
        ratings = float(request.POST.get('ratings')) if request.POST.get(
            'ratings') else 0                       # Added for ratings
        ratings_count = int(request.POST.get('ratings_count')) if request.POST.get(
            'ratings_count') else 0       # Added for ratings

        if (id != ""):
            movie = movie.filter(pk=id)
        else:
            movie = Movie.objects.all()

        for actors in actor_list:
            movie = movie.filter(actors__icontains=actors.strip())

        for genre in genre_list:
            movie = movie.filter(genres__icontains=genre.strip())

        movie = movie.filter(release_date__icontains=release_date)

        movie = movie.filter(ratings__gte=ratings)
        movie = movie.filter(ratings_count__gte=ratings_count)

        total_movies = movie.count()
        is_superuser = request.user.is_superuser
        context = {'movie': movie, 'total_movies': total_movies,
                   'is_superuser': is_superuser}

        return render(request, 'Movies/read_movie.html', context)

    return render(request, 'Movies/read_movie.html')


# To delete any movie by its ID
@login_required(login_url='login')
def delete_movie(request):
    if request.method == "POST":
        movie_ID = request.POST.get('movie_ID')
        movie = Movie.objects.filter(pk=movie_ID)  # .delete()
        if(movie):
            movie = Movie.objects.get(pk=movie_ID)
            Movie.objects.get(pk=movie_ID).delete()
            message = "Movie with ID: " + \
                str(movie_ID) + " ( " + movie.name + \
                " ) was successfully deleted."
            messages.error(request, message)
            return render(request, 'Movies/delete_movie.html')
        else:
            message = "Movie with ID: " + str(movie_ID) + " was not found"
            messages.error(request, message)
            return redirect("delete_movie")

    return render(request, 'Movies/delete_movie.html')


@login_required(login_url='login')
def delete_movie_key(request, pk):
    movie = Movie.objects.filter(pk=pk)  # .delete()
    if(movie):
        movie = Movie.objects.get(pk=pk)
        Movie.objects.get(pk=pk).delete()
        message = "Movie " + str(movie.name) + " with Movie ID " + \
            str(movie.id) + " has been successfully deleted"
        messages.success(request, message)

        return redirect('home')
    else:
        return HttpResponse("Movie with given id not found")


# To update any movie by its ID
@login_required(login_url='login')
def update_movie(request):
    form = MovieForm()

    if request.method == "POST":
        movie_ID = request.POST.get('movie_ID')
        name = request.POST.get('name') if request.POST.get('name') else ""
        release_date = request.POST.get(
            'release_date') if request.POST.get('release_date') else ""
        genres = request.POST.get(
            'genres') if request.POST.get('genres') else ""
        actors = request.POST.get(
            'actors') if request.POST.get('actors') else ""
        poster_path = request.POST.get(
            'poster_path') if request.POST.get('poster_path') else ""

        movie = Movie.objects.filter(pk=movie_ID)  # .delete()
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

            message = movie.name + " with Movie ID " + \
                str(movie.id) + " has been successfully updated"
            messages.success(request, message)

            return redirect('home')
        else:
            return HttpResponse("Movie with given id not found. Cannot be updated")

    context = {'form': form}
    return render(request, 'Movies/update_movie.html', context)

# To update any movie by its ID


@login_required(login_url='login')
def update_movie_key(request, pk):
    if request.method == "POST":
        movie_ID = pk
        name = request.POST.get('name') if request.POST.get('name') else ""
        release_date = request.POST.get(
            'release_date') if request.POST.get('release_date') else ""
        genres = request.POST.get(
            'genres') if request.POST.get('genres') else ""
        actors = request.POST.get(
            'actors') if request.POST.get('actors') else ""
        poster_path = request.POST.get(
            'poster_path') if request.POST.get('poster_path') else ""

        movie = Movie.objects.filter(pk=movie_ID)  # .delete()
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

            message = movie.name + " with Movie ID " + \
                str(movie.id) + " has been successfully updated"
            messages.success(request, message)

            return redirect('home')
        else:
            return HttpResponse("Movie with given id not found. Cannot be updated")

    movie = Movie.objects.get(pk=pk)
    context = {'movie': movie, "updated": False}

    return render(request, 'Movies/update_movie.html', context)


###########################################################################
############################ REST API #####################################
###########################################################################
# Edit this in future
@api_view(['GET'])
def api_overview(request):
    api_urls = {
        'Get_all': '/api/get-all',
        'Create': '/api/movie-create/',
        'Read': '/api/movie-read/<str:pk>',
        'Update': '/api/movie-update/<str:pk>',
        'Delete': '/api/movie-delete/<str:pk>',
    }
    return Response(api_urls)

@api_view(['GET'])
def api_Get_all_Users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def api_Get_all(request):
    movies = Movie.objects.all()
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)


# Need to send JSON data here. // Form Data
@api_view(['POST'])
def api_movie_create(request):
    print(request.data)
    serializer = MovieSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        print(serializer.data)
        message = "Movie with name : " + \
            serializer.data['name'] + " was added successfully"
        message_type = 'success'
    else:
        message = "Movie was not added. There is some error"
        message_type = 'error'

    return JsonResponse({'data': serializer.data, 'message': message, 'message_type': message_type})


# @login_required(login_url='login')
@api_view(['GET'])
def api_movie_read(request, pk):

    movies = Movie.objects.get(id=pk)
    serializer = MovieSerializer(movies, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def api_movie_update(request, pk):
    movies = Movie.objects.get(id=pk)
    serializer = MovieSerializer(instance=movies, data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
def api_movie_delete(request, pk):
    try:
        movies = Movie.objects.get(id=pk)
        movie_copy = movies
        movies.delete()
        serializer = MovieSerializer(movies, many=False)
        message = 'Movie ' + movie_copy.name + ' has been deleted successfully.'
        return JsonResponse(
            {'data': serializer.data, 'message': message, 'message_type': 'success'})
    except:
        message = 'Movie was not deleted. There is some error.'
        return JsonResponse(
            {'message': message, 'message_type': 'error'})


@api_view(['DELETE'])
def api_movie_delete_all(request):
    try:
        Movie.objects.all().delete()
        return JsonResponse(
            {'message': 'All Movie data has been deleted', 'message_type': 'success'})
    except:
        return JsonResponse({'message': 'There is some error',
                             'message_type': 'error'})


@api_view(['GET'])
def api_movie_read_genre(request, genre, ratings_count):
    movies = Movie.objects.filter(genres__icontains=genre)
    # Only show movies which have decent rating count
    movies = movies.filter(ratings_count__gte=ratings_count)

    #movies = movies.filter(release_date__gte=datetime.date(2011, 1, 1))
    movies = movies.order_by('-ratings')

    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def api_movie_read_top_latest_year(request):
    movies = Movie.objects.filter(release_date__gte=datetime.date(
        2019, 1, 1))  # Only show newer movies in 'latest top'
    # Only show movies which have decent rating count
    movies = movies.filter(ratings_count__gte=1000)
    # Only show movies which have decent ratings
    movies = movies.filter(ratings__gte=7)
    movies = movies.order_by('-ratings')

    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)


###########################################################################
######################## END OF  REST API #################################
###########################################################################


# Used to modify incoming data in 'api_movie_search' view
def modify_data(data, default_value):
    if(data == ' ' or data == '' or data == 'None'):
        return default_value
    else:
        return data

# Modify this 'view' and send data in post request.
# This looks too clumsy


@api_view(['GET', 'POST'])
def api_movie_search(request, movie_name, actor_name, release_date, genres, ratings, ratings_count):

    movie_name = modify_data(movie_name, '')
    actor_name = modify_data(actor_name, '')
    release_date = modify_data(release_date, '')
    genres = modify_data(genres, '')
    ratings = modify_data(ratings, 0)
    ratings_count = modify_data(ratings_count, 0)

    actor_list = actor_name.split(',')
    genre_list = genres.split(',')

    print("Movie name = " + movie_name)
    print("Actor name = " + actor_name)
    print("Release date = " + release_date)
    print("Genres = " + genres)
    print("Ratings = " + str(ratings))
    print("Ratings count = " + str(ratings_count))

    movies = Movie.objects.all()

    movies = movies.filter(name__icontains=movie_name.strip())

    for actors in actor_list:
        movies = movies.filter(actors__icontains=actors.strip())

        for genre in genre_list:
            movies = movies.filter(genres__icontains=genre.strip())

    movies = movies.filter(release_date__icontains=release_date)
    movies = movies.filter(ratings__gte=ratings)
    movies = movies.filter(ratings_count__gte=ratings_count)

    movies = movies.order_by('-ratings')
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)


# Used to add excel sheet from React frontend
@csrf_exempt
def createMovieUsingExcelViaReact(request):
    print("RECEIVED REQUEST")
    if request.method == 'POST':

        dataset = Dataset()

        try:
            new_movie = request.FILES['myFile']
            if not new_movie.name.endswith('xlsx'):
                message = 'Wrong Format. Only Upload Excel file with xlsx extension'
                return JsonResponse({'message': message, 'message_type': 'error'})

            imported_data = dataset.load(new_movie.read(), format='xlsx')

            for data in imported_data:
                if(data[1] is not None):
                    value = {
                        'name': data[1],
                        'actors': data[2],
                        'release_date': data[3],
                        'poster_path': data[4],
                        'genres': data[5],
                        'ratings': data[6],
                        'ratings_count': data[7]
                    }

                    form = MovieForm(value)
                    if form.is_valid():
                        form.save()
                    else:
                        message = 'The excel file is not in correct form'
                        return JsonResponse({'message': message, 'message_type': 'error'})

            message = 'The data was succesfully imported into database'
            return JsonResponse({'message': message, 'message_type': 'success'})
        except:
            message = 'The data was succesfully imported into database'
            return JsonResponse({'message': message, 'message_type': 'error'})


##########################################################################################################

# Celery
# importing task from tasks.py file  
  
# Create your views here.  
  
def test(request):  
    # call the test_function using delay, calling task  
    test_func.delay()    

    return HttpResponse("Done")  