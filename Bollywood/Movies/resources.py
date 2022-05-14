from import_export import resources
from .models import Movie

class MovieResource(resources.ModelResource):
    class meta:
        model = Movie
