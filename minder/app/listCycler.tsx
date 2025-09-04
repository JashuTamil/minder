import { useState } from "react";
import { Movie } from "./movies";

const listCycler = (movies: Movie[]) => {
        const [index, setIndex] = useState(0);
        let yes: Movie[] = []
        var no: Movie[] = []

        const handleYes = () => {
            setIndex((prevIndex) => (prevIndex + 1) % movies.length)
            yes.push(movies[index])
        }

        const handleNo = () => {
            setIndex((prevIndex) => (prevIndex + 1) % movies.length)
            no.push(movies[index])
        }

        return (
            <div>
                {movies.length > 0  && index < movies.length? (
                    <p> {movies[index].name}</p>
                ) : (
                    <p> No items to display!</p>
                )
                }
                <button onClick = {handleYes}> I like it!</button>
                <button onClick = {handleNo}> Me no like</button>
            </div>
        )
    }

export type listCycler;