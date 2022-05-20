

from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import MyTokenObtainPairView

urlpatterns = [
    path('', views.home, name="home"),
    path('login/', views.loginPage, name="login"),
    path('register/', views.registerPage, name="register"),
    path('logout/', views.logoutUser, name="logout"),

    path('api_login/', views.api_loginPage, name="api_login"),
    path('api_register/', views.api_registerPage, name="api_register"),
    path('api_logout/', views.api_logoutUser, name="api_logout"),

    path('create_movie/', views.create_movie, name="create_movie"),
    path('createMovie/', views.createMovie, name="createMovie"),
    path('createMovieUsingExcel/', views.createMovieUsingExcel,
         name="createMovieUsingExcel"),

    path('createMovieUsingExcelViaReact/', views.createMovieUsingExcelViaReact,
         name="createMovieUsingExcelViaReact"),


    path('read_movie/', views.read_movie, name="read_movie"),
    path('delete_movie/', views.delete_movie, name="delete_movie"),
    path('delete_movie_key/<str:pk>',
         views.delete_movie_key, name="delete_movie_key"),
    path('update_movie/', views.update_movie, name="update_movie"),
    path('update_movie_key/<str:pk>',
         views.update_movie_key, name="update_movie_key"),


    path('api/', views.api_overview, name="api_overview"),
    path('api/get-all/', views.api_Get_all, name="api_Get_all"),
    path('api/movie-create/', views.api_movie_create, name="api_movie_create"),
    path('api/movie-read/<str:pk>', views.api_movie_read, name="api_movie_read"),
    path('api/movie-update/<str:pk>',
         views.api_movie_update, name="api_movie_update"),
    path('api/movie-delete/<str:pk>',
         views.api_movie_delete, name="api_movie_delete"),
    path('api/movie-delete-all/', views.api_movie_delete_all,
         name="api_movie_delete_all"),
    path('api/movie-read-genre/<str:genre>/<str:ratings_count>',
         views.api_movie_read_genre, name="api_movie_read_genre"),
    path('api/movie-read-top-latest-year/', views.api_movie_read_top_latest_year,
         name="api_movie_read_top_latest_year"),
    path('api/movie-search/<str:movie_name>/<str:actor_name>/<str:release_date>/<str:genres>/<str:ratings>/<str:ratings_count>/', views.api_movie_search,
         name="api_movie_search"),


    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/mytoken/', MyTokenObtainPairView.as_view(), name='token_obtain_pair')

    # path('room/<str:pk>/', views.room, name = "room"),
    # path('create-room/', views.createRoom, name = "create-room"),
]
