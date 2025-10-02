"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { MovieType } from "./types";


const App: React.FC  = () => {
    const dispatch = useDispatch()
    const movies = useSelector((state: any) => state.movies)
    const setMovies = (name: string, position: number) => {dispatch({type:'inputHandling/setIdx', payload: {name, position}})}
    const setSeen = (name: string) => {dispatch({type:'inputHandling/setSeen', payload: name})}

   return (
    <div
      className="grid h-[400px] w-full place-items-center"
    >
      {movies.map((movie: MovieType) => {
        return (
          <Movie
            key={movie.id}
            setMovies={setMovies}
            setSeen={setSeen}
            name={movie.name}
            url={movie.url}
          />
        );
      })}

      {movies.length > 0 ? (
        <p className="text-xl font-bold"> Name: {movies[movies.length - 1].name}</p>
      ) : (
        <p className="text-xl font-bold">No more cards</p>
      )}
    </div>
  );

}

type MovieProps = {
  name: string;
  url: string;
  setMovies: (name: string, position: number) => void;
  setSeen: (name: string) => void;
};

const Movie: React.FC<MovieProps> = ({ name, url, setMovies, setSeen }) => {
  const x = useMotionValue(0);

  const rotate = useTransform(x, [-150, 150], [-18, 18]);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 100) {
      setMovies(name, x.get());
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
      onDoubleClick={() => setSeen(name)}
    />
    </>
 );
};

export default App;