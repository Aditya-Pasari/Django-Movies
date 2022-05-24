import graphene
from graphene_django import DjangoObjectType, DjangoListField
from .models import Movie

class MovieType(DjangoObjectType):
    class Meta:
        model = Movie
        fields = "__all__"


# Query class defines GraphQL queries that API will provide to clients.
class Query(graphene.ObjectType):
    all_movies = graphene.List(MovieType)

    movie = graphene.Field(MovieType, movie_id = graphene.ID())
    actors = graphene.List(MovieType, actors = graphene.String())
    search = graphene.List(MovieType, actors = graphene.String(), genres = graphene.String())

    def resolve_all_movies(self, info, **kwargs):
        return Movie.objects.all()

    def resolve_movie(self, info, movie_id):
        return Movie.objects.get(pk = movie_id)

    def resolve_actors(self, info, actors):
        movies = Movie.objects.all()
        movies = movies.filter(actors__icontains=actors.strip())
        return movies

    def resolve_search(self,info,actors,genres):
        movies = Movie.objects.all()
        movies = movies.filter(actors__icontains=actors.strip())
        movies = movies.filter(genres__icontains=genres.strip())
        return movies

        

    

schema = graphene.Schema(query=Query)