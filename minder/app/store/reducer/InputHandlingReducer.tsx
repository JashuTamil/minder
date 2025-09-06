import { createAction, createReducer } from '@reduxjs/toolkit'
import { Movie } from "@/app/movies";

interface InputHandlingState {
    movies: Movie[],
    yes: Movie[],
    no: Movie[]
}

const setYes = createAction<Movie[]>('inputHandling/setYes')
const setNo = createAction<Movie[]>('inputHandling/setNo')

const initialState = { movies: [{
        name: "Inception",
        director: "Christopher Nolan",
        cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
        year: 2010,
        image: "/inception.jpg",
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
    },
    {
        name: "The Matrix",
        director: "The Wachowskis",
        cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
        year: 1999,
        image: "/matrix.jpg",
        description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers."
    },
    {
        name: "Interstellar",
        director: "Christopher Nolan",
        cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
        year: 2014,
        image: "/interstellar.jpg",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
    }], yes: [], no: [] } satisfies InputHandlingState as InputHandlingState

    export const inputHandlingReducer = createReducer(initialState, (builder) => {
        builder
         .addCase(setYes, (state, action) => {

         })
         .addCase(setNo, (state, action) => {
            
         })
    })