from data_processing import *

movies = load()
features, tfidf, mlb = build_features(movies)

feedback = load_feedback()

feedback['likes'] = [441717, 334541, 324857, 335984, 1091]
feedback['dislikes'] = [1428301, 1153399, 758323, 868759, 719221]

user_vec = build_user_profile(features, movies, feedback)
recs = recommend_movies(features, movies, user_vec, feedback, top_n = 10)

print(recs)