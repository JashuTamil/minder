"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { MovieType } from "./types";
import { GET } from "./api/feedback/routes";




const App: React.FC = () => {

    const dispatch = useDispatch()
    const movies = useSelector((state: any) => state.movies)
    const example = useSelector((state: any) => state.example)
    const setMovies = (name: string, position: number) => {dispatch({type:'inputHandling/setIdx', payload: {name, position}})}
    const setSeen = (name: string) => {dispatch({type:'inputHandling/setSeen', payload: name})}
    const setExample = (example: any) => ({type:'inputHandling/setExample', payload: example})

    const fetchExample = async () => {
        const response = await GET();
        const data = await response.json();
        dispatch(setExample(data.message));
    }

    useEffect(() => {
      fetchExample();
    }, [dispatch])


    console.log("=== DEBUG INFO ===")
    console.log("Movies array:", movies)
    console.log("Movies length:", movies.length)
    console.log("Example data:", example)
    console.log("Should show message?", movies.length === 0)
    console.log("Example message:", example?.message)
    console.log("===================")

   return (
    <div
      className="grid h-[400px] w-full place-items-center gap-5"
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
        <ul className="text-center">
          <li className="text-l"> {movies[movies.length - 1].name}</li>
          <li className="text-l"> Director: {movies[movies.length - 1].director}</li>
          <li className="text-l"> {movies[movies.length - 1].year}</li>
          <li className="text-l"> Cast: {movies[movies.length - 1].cast.join(', ')}</li>
        </ul>
        
      ) : (
        <p className="text-2xl font-bold">{example}</p>
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