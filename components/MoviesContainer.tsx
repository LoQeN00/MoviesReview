import React,{FC} from 'react';
import MovieCard from './MovieCard';
import { Movie } from "@prisma/client"
import Header from "../components/Header"

interface MoviesContainerProps {
    movies: Movie[]
}

const MoviesContainer : FC<MoviesContainerProps> = ({movies}) => {
  return (
    <div className='flex flex-col h-screen'>
        <Header />
        <div className='flex flex-1 justify-center  items-center flex-wrap gap-4 bg-primary py-6 '>
            {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
        </div>
  </div>
  )
};

export default MoviesContainer;
