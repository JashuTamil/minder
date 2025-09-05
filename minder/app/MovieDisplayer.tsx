"use client";

import { Movie } from "./movies"
import Button from "@mui/material/Button"
import React, { useState } from "react";


const App: React.FC  = () => {
    const [index, setIndex] = useState(0);
    const [yesitem, setYesItem] = useState<Movie[]>([])
    const [noitem, setNoItem] = useState<Movie[]>([])


    const handleYes = () => {
        setIndex((prevIndex) => (prevIndex + 1))
        setYesItem((previousState) => [...previousState, movies[index]])
    }

    const handleNo = () => {
        setIndex((prevIndex) => (prevIndex + 1))
        setNoItem((previousState) => [...previousState, movies[index]])
    }


    const movies: Movie[] = [{
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
    }
];


    return (
        <div className="movie-displayer">
            <h1>Minder</h1>
            <div>
                {index < movies.length ? (
                    <div className="movie-details">
                        <h2>{movies[index].name}</h2>
                        <p><strong>Director:</strong> {movies[index].director}</p>
                        <p><strong>Cast:</strong> {movies[index].cast.join(", ")}</p>
                        <p><strong>Year:</strong> {movies[index].year}</p>
                        <p>{movies[index].description}</p>
                        <Button onClick = {handleYes}> I like it!</Button>
                        <Button onClick = {handleNo}> Me no like</Button>
                    </div>
                ): (<p>No items to display!</p>)}
                
            </div>
        </div>

    )

}

export default App;