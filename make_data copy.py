import sys  

reload(sys)  
sys.setdefaultencoding('utf8')

import numpy as np
import xlrd
from collections import OrderedDict
import json
import pandas as pd

loc = ('./Datasets/2019/')
#filename = ['bollywood_text_2010-2019.csv']

poster_file = open(loc+'bollywood_2010-2019.csv').read().split('\n')[1:]
genre_file = open(loc+'bollywood_meta_2010-2019.csv').read().split('\n')[1:]
actors_file = open(loc+'bollywood_text_2010-2019.csv').read().split('\n')[1:]
#f = open(loc+filename[0]).read().split('\n')

movies = OrderedDict()

for line in genre_file:
    line = line.split(',')
    if(len(line) > 1):
        movies[line[0]] = dict()
        movies[line[0]] ['title'] = line[1]
        movies[line[0]] ['genres'] = ', '.join(line[6].split('|') )

for line in actors_file:
    line = line.split(',')
    if(len(line) > 1):
        if(line[0] in movies):
            movies[line[0]] ['actors'] = ', '.join(line[4].split('|') ) if line[4] else 'N/A'
            movies[line[0]] ['release_date'] = line[6] if line[6] else 'N/A'
        


for line in poster_file:
    line = line.split(',')
    if(len(line) > 1):
        if(line[1] in movies):
            movies[line[1]] ['poster_path'] = line[2] if line[2] else 'N/A'

df = pd.DataFrame(data=movies)
df = (df.T)
df.to_excel('movies.xlsx')