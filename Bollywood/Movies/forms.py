from django import forms
from django.forms import ModelForm
from .models import Movie


class MovieForm(ModelForm):
    
    name = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Enter Name', 'style': 'height: 30px;width: 400px;', 'class': 'form-control'}))
    # Here, Charfield is used and Textfield was used in Models
    actors = forms.CharField(required = True, widget=forms.TextInput(attrs={'placeholder': 'Enter Actors', 'style': 'height: 30px;width: 400px;', 'class': 'form-control'}))
    release_date = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Enter Release Date', 'style': 'height: 30px;width: 400px;', 'class': 'form-control'}))
    poster_path = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Enter Poster Path', 'style': 'height: 30px;width: 400px;', 'class': 'form-control'}))
    genres = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Enter Genres', 'style': 'height: 30px;width: 400px;', 'class': 'form-control'}))
    ratings = forms.FloatField(widget=forms.TextInput(attrs={'placeholder': 'Enter Ratings', 'style': 'height: 30px;width: 400px;', 'class': 'form-control'}))               # Added for ratings
    ratings_count = forms.IntegerField(widget=forms.TextInput(attrs={'placeholder': 'Enter Rating Count', 'style': 'height: 30px;width: 400px;', 'class': 'form-control'}))  # Added for ratings

    



    class Meta:
        model = Movie
        fields = "__all__"
        