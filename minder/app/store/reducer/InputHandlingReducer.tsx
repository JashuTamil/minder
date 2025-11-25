import { createAction, createReducer } from '@reduxjs/toolkit'
import { z } from 'zod'
import { FeedbackType, idxProp, MovieType, FeedbackSchema } from "@/app/types";
import { GET } from '@/app/api/feedback/routes';
import { NextResponse } from 'next/server';

interface InputHandlingState {
    movies: MovieType[],
    yes: MovieType[],
    no: MovieType[],
    seen: MovieType[],
    loading: boolean,
    error: string | null
}
const setSeen = createAction<string>('inputHandling/setSeen')
const setIdx = createAction<idxProp>('inputHandling/setIdx')

const fetchFeedbackStart = createAction('inputHandling/fetchFeedbackStart')
const fetchFeedbackSuccess = createAction<{ likes: MovieType[], dislikes: MovieType[] }>('inputHandling/fetchFeedbackSuccess')
const fetchFeedbackFailure = createAction<string>('inputHandling/fetchFeedbackFailure')

export const fetchFeedback = () => async (dispatch: any) => {
    dispatch(fetchFeedbackStart());

    try{
        const response = await GET()


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

const initialState = { movies: [{
        id: 27205,
        name: "Inception",
        director: "Christopher Nolan",
        cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
        year: 2010,
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        url: "https://www.movieposters.com/cdn/shop/files/inception.mpw.123395_9e0000d1-bc7f-400a-b488-15fa9e60a10c.jpg?v=1708527589&width=1680"
    },
    {
        id: 603,
        name: "The Matrix",
        director: "The Wachowskis",
        cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
        year: 1999,
        description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        url: "https://www.movieposters.com/cdn/shop/files/Matrix.mpw.102176_bb2f6cc5-4a16-4512-881b-f855ead3c8ec.jpg?v=1708703624&width=1680"
    },
    {
        id: 157336,
        name: "Interstellar",
        director: "Christopher Nolan",
        cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
        year: 2014,
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        url: "https://www.movieposters.com/cdn/shop/files/interstellar-139400.jpg?v=1708527834&width=1680"
    }], yes: [], no: [], seen: [], loading: false, error: null } satisfies InputHandlingState as InputHandlingState

    export const inputHandlingReducer = createReducer(initialState, (builder) => {
        builder
         .addCase(setSeen, (state, action) => {
            const movie = state.movies.find(item => item.name === action.payload)
            state.movies = state.movies.filter(item => item.name !== action.payload)
            
            if (movie) {
                state.seen.push(movie)
            }
         })
         .addCase(setIdx, (state, action) => {
            const movie = state.movies.find(item => item.name === action.payload.name)
            state.movies = state.movies.filter(item => item.name !== action.payload.name)

            if (action.payload.position > 100 && movie) {
                state.yes.push(movie)
                console.log(state.yes)
            }
            else if (movie) {
                state.no.push(movie)
                console.log(state.no)
            }
         })
         .addCase(fetchFeedbackSuccess, (state, action) => {
            state.loading = false;
            action.payload.likes.map((movie: MovieType) => {
                state.yes.push(movie)
            })
            console.log(typeof state.yes)
            console.log(state.yes)
            action.payload.dislikes.map((movie: MovieType) => {
                state.no.push(movie)
            })
            console.log(typeof state.no)
            console.log(state.no)
         })
         .addCase(fetchFeedbackFailure, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
    })