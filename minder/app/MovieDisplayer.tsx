"use client";

import Button from "@mui/material/Button"
import React from "react";
import { useDispatch, useSelector } from "react-redux";


const App: React.FC  = () => {
    const dispatch = useDispatch()
    const movies = useSelector((state: any) => state.movies)
    const index = useSelector((state: any) => state.index)

    const handleYes = () => {
        dispatch({type: 'inputHandling/setYes', payload: movies[index]})
        dispatch({type: 'inputHandling/setIdx'})
    }

    const handleNo = () => {
        dispatch({type: 'inputHandling/setNo', payload: movies[index]})
        dispatch({type: 'inputHandling/setIdx'})
    }

    const handleSeen = () => {
        dispatch({type: 'inputHandling/setSeen', payload: movies[index]})
        dispatch({type: 'inputHandling/setIdx'})
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
                        <Button onClick = {handleYes}>I like it!</Button>
                        <Button onClick = {handleNo}>Me no like</Button>
                        <Button onClick = {handleSeen}>Seen it :|</Button>
                    </div>
                ): (<p>No items to display!</p>)}
                
            </div>
        </div>

    )

}

export default App;