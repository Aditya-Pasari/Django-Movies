"""Bollywood URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls
from rest_framework_swagger.views import get_swagger_view

from graphene_django.views import GraphQLView

#schema_view = get_schema_view(title = 'Movie API')
schema_view = get_swagger_view(title = 'Movie API')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('Movies.urls')),

    path('api-auth/', include('rest_framework.urls')),                 # API for User Authentication
    path('api/dj-rest-auth/', include('dj_rest_auth.urls')),            # api/dj-rest-auth/login  & /logout
    path('api/dj-rest-auth/registration', include('dj_rest_auth.registration.urls')),            # API for User Authentication
    #path('schema/', schema_view),                                      # Returns schema for all with @api_view decorator
    path('docs/', include_docs_urls(title = 'Movie API')),
    path('swagger-docs/', schema_view),                                 # Returns schema for all with @api_view decorator

    path('graphql', GraphQLView.as_view(graphiql = True)),

    
]
