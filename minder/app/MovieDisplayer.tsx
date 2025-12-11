"use client";

import { useDispatch, useSelector } from "react-redux";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { MovieType } from "./types";
import { useAppDispatch, useAppSelector } from "./StoreProvider";

const App: React.FC = () => {

    const dispatch = useAppDispatch()
    const movies = useAppSelector((state: any) => state.movies)
    const loading_movies = useAppSelector((state) => state.loading_movies)
    const loading_user = useAppSelector((state) => state.loading_user)
    const error = useAppSelector((state) => state.error)

    const setMovies = (name: string, position: number) => {dispatch({type:'inputHandling/setIdx', payload: {name, position}})}
    const setSeen = (name: string) => {dispatch({type:'inputHandling/setSeen', payload: name})}

    if (loading_movies || loading_user) {
      return <div className="grid h-[400px] w-full place-items-center">Loading movies...</div>;
    }

    if (error) {
      return <div className="grid h-[400px] w-full place-items-center text-red-500">Error: {error}</div>;
    }

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
            name={movie.title}
            url={movie.poster_path}
          />
        );
      })}

      {movies.length > 0 ? (
        <ul className="text-center">
          <li className="text-l"> {movies[movies.length - 1].title}</li>
          <li className="text-l"> Director: {movies[movies.length - 1].director}</li>
          <li className="text-l"> {movies[movies.length - 1].release_date}</li>
          <li className="text-l"> Cast: {movies[movies.length - 1].cast}</li>
          <li className="text-l"> Description: {movies[movies.length-1].overview}</li>
          <li className="text-l"> Runtime: {movies[movies.length-1].runtime} minutes</li>
          <li className="text-l"> Rating: {movies[movies.length-1].vote_average}/10</li>
        </ul>
        
      ) : (
        <p className="text-2xl font-bold">No more movies :|</p>
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