import { createAction, createReducer } from '@reduxjs/toolkit'
import { z } from 'zod'
import { idxProp, MovieType, FeedbackSchema, MovieSchema } from "@/app/types";
import { GET_USER_DATA, SEND_USER_DATA } from '@/app/api/feedback/routes';
import { GET_MOVIE_DATA } from '@/app/api/movies/routes';

interface InputHandlingState {
    movies: MovieType[],
    yes: MovieType[],
    no: MovieType[],
    seen: MovieType[],
    loading_user: boolean,
    loading_movies: boolean,
    error: string | null
}
const setSeen = createAction<string>('inputHandling/setSeen')
const setIdx = createAction<idxProp>('inputHandling/setIdx')

const fetchFeedbackStart = createAction('inputHandling/fetchFeedbackStart')
const fetchFeedbackSuccess = createAction<{ likes: MovieType[], dislikes: MovieType[] }>('inputHandling/fetchFeedbackSuccess')
const fetchFeedbackFailure = createAction<string>('inputHandling/fetchFeedbackFailure')

const fetchMovieStart = createAction('inputHandling/fetchMovieStart')
const fetchMovieSuccess = createAction<MovieType[]>('inputHandling/fetchMovieSuccess')
const fetchMovieFailure = createAction<string>('inputHandling/fetchMovieFailure')

export const fetchFeedback = () => async (dispatch: any) => {
    dispatch(fetchFeedbackStart());

    try{
        const response = await GET_USER_DATA()


        if (!response.ok){
            const errorData = await response.json()
            throw new Error((errorData as any).error || "Failed to fetch feedback.")
        }
        const data = await response.json()
        
        const finalData = z.object(FeedbackSchema).parse(data)

        dispatch(fetchFeedbackSuccess(finalData))
    }

    catch (error) {
        dispatch(fetchFeedbackFailure(error instanceof Error ? error.message : 'Unknown error'))
    }
}

export const fetchMovies = () => async (dispatch: any) => {
    dispatch(fetchMovieStart());

    try{
        const response = await GET_MOVIE_DATA()


        if (!response.ok){
            const errorData = await response.json()
            throw new Error((errorData as any).error || "Failed to fetch feedback.")
        }
        const data = await response.json()
        
        const finalData = z.array(MovieSchema).parse(data)

        dispatch(fetchMovieSuccess(finalData))
    }

    catch (error) {
        dispatch(fetchMovieFailure(error instanceof Error ? error.message : 'Unknown error'))
    }
}

export const sendFeedback = ({likes, dislikes}: {likes: MovieType[], dislikes: MovieType[] }) => async () => {
    const data = {likes, dislikes}
    const request = new Request('https://dummy.com', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    })

    try{
        const response = await SEND_USER_DATA(request)

        if (!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to send feedback.');
        }
    }
    catch (error){
        console.error('Error sending feedback:', error)
    }
}

const initialState = { movies: [], yes: [], no: [], seen: [], loading_user: true, loading_movies: true, error: null } satisfies InputHandlingState as InputHandlingState

    export const inputHandlingReducer = createReducer(initialState, (builder) => {
        builder
         .addCase(setSeen, (state, action) => {
            const movie = state.movies.find(item => item.title === action.payload)
            state.movies = state.movies.filter(item => item.title !== action.payload)
            
            if (movie) {
                state.seen.push(movie)
            }
            if (state.movies.length === 0) {
                sendFeedback({likes: state.yes, dislikes: state.no})
            }
         })
         .addCase(setIdx, (state, action) => {
            const movie = state.movies.find(item => item.title === action.payload.name)
            state.movies = state.movies.filter(item => item.title !== action.payload.name)

            if (action.payload.position > 100 && movie) {
                state.yes.push(movie)
                console.log(state.yes)
            }
            else if (movie) {
                state.no.push(movie)
                console.log(state.no)
            }
            if (state.movies.length === 0) {
                sendFeedback({likes: state.yes, dislikes: state.no})
            }
         })
         .addCase(fetchFeedbackSuccess, (state, action) => {
            state.loading_user = false;
            action.payload.likes.map((movie: MovieType) => {
                state.yes.push(movie)
            })
            action.payload.dislikes.map((movie: MovieType) => {
                state.no.push(movie)
            })
         })
         .addCase(fetchFeedbackFailure, (state, action) => {
            state.loading_user = false
            state.error = action.payload
         })
         .addCase(fetchMovieSuccess, (state, action) => {
            state.loading_movies = false;
            state.movies = action.payload
         })
         .addCase(fetchMovieFailure, (state, action) => {
            state.loading_movies = false
            state.error = action.payload
         })
    })