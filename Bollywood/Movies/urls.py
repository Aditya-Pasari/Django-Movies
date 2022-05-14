

from django.urls import path
from . import views


urlpatterns = [
    path('', views.home, name = "home"),
    path('login/', views.loginPage, name = "login"), 
    path('register/', views.registerPage, name = "register"), 
    path('logout/', views.logoutUser, name = "logout"), 

    path('create_movie/', views.create_movie, name = "create_movie"),  
    path('createMovie/', views.createMovie, name = "createMovie"),  
    path('createMovieUsingExcel/', views.createMovieUsingExcel, name = "createMovieUsingExcel"),  

    path('read_movie/', views.read_movie, name = "read_movie"),  
    path('delete_movie/', views.delete_movie, name = "delete_movie"),  
    path('delete_movie_key/<str:pk>', views.delete_movie_key, name = "delete_movie_key"),  
    path('update_movie/', views.update_movie, name = "update_movie"),  
    path('update_movie_key/<str:pk>', views.update_movie_key, name = "update_movie_key"),  

    

    #path('room/<str:pk>/', views.room, name = "room"), 
    #path('create-room/', views.createRoom, name = "create-room"), 
]
