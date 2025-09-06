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