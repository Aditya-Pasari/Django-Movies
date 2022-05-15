from platform import release
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Movie(models.Model):
    name            =   models.CharField(max_length=200)
    actors          =   models.TextField()
    release_date    =   models.CharField(max_length=50)
    poster_path     =   models.TextField()
    genres          =   models.TextField()
    ratings         =   models.FloatField()                                 # Added for ratings
    ratings_count   =   models.IntegerField()                               # Added for ratings
    updated         =   models.DateTimeField(auto_now=True)
    created         =   models.DateTimeField(auto_now_add=True)