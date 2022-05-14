from csv import list_dialects
from django.contrib import admin

# Register your models here.

from .models import Movie
from import_export.admin import ImportExportActionModelAdmin


admin.site.register(Movie)        # Need to add this so that Model is registered with admin. And we can view it in admin panel.

