"use client";

import Button from "@mui/material/Button"
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { MovieType } from "./movies";


const App: React.FC  = () => {
    const dispatch = useDispatch()
    const movies = useSelector((state: any) => state.movies)
    const setMovies = (movieName: string) => {dispatch({type:'inputHandling/SetIdx', payload: movieName})
}
    
    const handleSeen = () => {
        dispatch({type: 'inputHandling/setIdx'})
    }

   return (
    <div
      className="grid h-[400px] w-full place-items-center"
    >
      {movies.map((movie: MovieType) => {
        return (
          <Movie
            key={movie.id}
            setMovies={setMovies}
            name={movie.name}
            url={movie.url}
          />
        );
      })}

      {movies.length > 0 ? (
        <p className="mt-4"> Name: {movies[movies.length - 1].name}</p>
      ) : (
        <p className="mt-4">No more cards</p>
      )}
    </div>
  );

}

type MovieProps = {
  name: string;
  url: string;
  setMovies: (name: string) => void;
};

const Movie: React.FC<MovieProps> = ({ name, url, setMovies }) => {
  const x = useMotionValue(0);

  const rotate = useTransform(x, [-150, 150], [-18, 18]);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 100) {
      setMovies(name);
    }
  };

  return (
    <>
    <motion.img
      src={url}
      alt="Placeholder alt"
      className="h-96 w-72 origin-bottom rounded-lg bg-white object-cover hover:cursor-grab active:cursor-grabbing"
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        opacity,
        rotate,
        transition: "0.125s transform",
      }}
      drag='x'
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      onDragEnd={handleDragEnd}
    />
    </>
 );
};

export default App;