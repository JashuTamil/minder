import { createAction, createReducer } from '@reduxjs/toolkit'
import { idxProp, MovieType } from "@/app/types";
import { GET } from '@/app/api/feedback/routes';
import { NextResponse } from 'next/server';

interface InputHandlingState {
    movies: MovieType[],
    yes: MovieType[],
    no: MovieType[],
    seen: MovieType[],
    example: any | null
}
const setSeen = createAction<string>('inputHandling/setSeen')
const setIdx = createAction<idxProp>('inputHandling/setIdx')
const setExample = createAction<any>('inputHandling/setExample')

const initialState = { movies: [{
        id: 1,
        name: "Inception",
        director: "Christopher Nolan",
        cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
        year: 2010,
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        url: "https://www.movieposters.com/cdn/shop/files/inception.mpw.123395_9e0000d1-bc7f-400a-b488-15fa9e60a10c.jpg?v=1708527589&width=1680"
    },
    {
        id: 2,
        name: "The Matrix",
        director: "The Wachowskis",
        cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
        year: 1999,
        description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        url: "https://www.movieposters.com/cdn/shop/files/Matrix.mpw.102176_bb2f6cc5-4a16-4512-881b-f855ead3c8ec.jpg?v=1708703624&width=1680"
    },
    {
        id: 3,
        name: "Interstellar",
        director: "Christopher Nolan",
        cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
        year: 2014,
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        url: "https://www.movieposters.com/cdn/shop/files/interstellar-139400.jpg?v=1708527834&width=1680"
    }], yes: [], no: [], seen: [], example: null } satisfies InputHandlingState as InputHandlingState

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
            }
            else if (movie) {
                state.no.push(movie)
            }
         })
         .addCase(setExample, (state, action) => {
            state.example = action.payload
         })
    })