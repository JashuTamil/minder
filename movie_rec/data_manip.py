import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.metrics.pairwise import cosine_similarity
import scipy.sparse as sp

def load():
    df = pd.read_csv("movie_rec/data/TMDB_movie_dataset_v11.csv")
    df = df[df['vote_count'] >= 10]
    df = df[['id', 'title', 'genres', 'overview', 'vote_average', 'vote_count', 'runtime']].fillna('')
    df['genres'] = df['genres'].apply(lambda x: x.split(", "))
    return df

def build_features():
    
