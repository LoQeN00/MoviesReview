import type { NextPage } from 'next'
import { useEffect } from 'react'
import { Movie } from '@prisma/client'
import { useRecoilState } from 'recoil'
import {moviesState} from "../atoms/moviesAtoms"

const Home: NextPage = () => {

  const [movies,setMovies] = useRecoilState<Movie[]>(moviesState)


  useEffect(() => {

    const fetchData = async () => {
      const data = await fetch(`/api/movies`)
      const response = await data.json()
      setMovies(response) 
    }

    fetchData()

  },[setMovies])


  return (
    <div>
      {movies.map(movie => {
        return (
          <div className='border-teal-400 rounded-lg border-2 w-32 h-32' key={movie.id}>
            <p>{movie.name}</p>
            <p>{movie.director}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Home
