from data_processing import *

movies = load()
features, tfidf, mlb = build_features(movies)

feedback = load_feedback()

feedback['likes'] = [603692, 299534, 19950]
feedback['dislikes'] = [1428301, 1153399]

user_vec = build_user_profile(features, movies, feedback)
recs = recommend_movies(features, movies, user_vec, feedback, top_n = 10)

print(recs)