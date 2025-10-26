import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.metrics.pairwise import cosine_similarity
import scipy.sparse as sp
import json

feedback_path = "movie_rec/user_data/feedback.json"

def load():
    df = pd.read_csv("movie_rec/data/TMDB_movie_dataset_v11.csv")
    df = df[df['vote_count'] >= 10]
    df = df[['id', 'title', 'genres', 'overview', 'vote_average', 'vote_count', 'runtime']].fillna('')
    df['genres'] = df['genres'].apply(lambda x: x.split(", "))
    return df

def build_features(movies):
    mlb = MultiLabelBinarizer()
    genre_features = mlb.fit_transform(movies['genres'])

    tfidf = TfidfVectorizer(stop_words='english', max_features=5000)
    overview_features = tfidf.fit_transform(movies['overview'])

    features = sp.hstack([genre_features, overview_features])
    return features, tfidf, mlb

def load_feedback():
    if not feedback_path.exists():
        return {"likes": [], "dislikes": []}
    with open(feedback_path, "r") as f:
        return json.load(f)

def save_feedback(feedback):
    with open(feedback_path, "w") as f:
        json.dump(feedback, f)


