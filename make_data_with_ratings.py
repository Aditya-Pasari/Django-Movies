import sys  

reload(sys)  
sys.setdefaultencoding('utf8')

import numpy as np
import xlrd
from collections import OrderedDict
import json
import pandas as pd

file_list = ['1950-1989', '1990-2009', '2010-2019']
loc = ('./Datasets/Full/')
#filename = ['bollywood_text_2010-2019.csv']

movies = OrderedDict()

for file in file_list:
    poster_file = open(loc + file + '/bollywood_' + file + '.csv').read().split('\n')[1:]
    genre_file = open(loc + file + '/bollywood_meta_' + file + '.csv').read().split('\n')[1:]
    actors_file = open(loc + file + '/bollywood_text_' + file + '.csv').read().split('\n')[1:]
    ratings_file = open(loc + file + '/bollywood_ratings_' + file + '.csv').read().split('\n')[1:]
    #f = open(loc+filename[0]).read().split('\n')


    for line in genre_file:
        line = line.split(',')
        if(len(line) > 1):
            movies[line[0]] = OrderedDict()
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

    for line in ratings_file:
        line = line.split(',')
        if(len(line) > 1):
            if(line[0] in movies):
                movies[line[0]] ['ratings'] = float(line[1]) if line[1] else 0
                movies[line[0]] ['ratings_count'] = int(line[2]) if line[2] else 0

    for key in movies:
        if 'ratings' not in movies[key]:
            movies[key]['ratings'] = 0
            movies[key]['ratings_count'] = 0



df = pd.DataFrame(data=movies)
df = (df.T)

# Re-arranging the columns of pandas dataframes
cols = df.columns.tolist()
print(cols)
# Title, Actors, release_date, poster_path, genres, ratings, rating_count
cols = cols[6:] + cols[0:1] + cols[5:6] + cols[2:3] + cols[1:2] + cols[3:4] + cols[4:5]
df = df[cols]

df.to_excel('full_file.xlsx')
