import type { NextPage, GetServerSideProps } from 'next'
import { useEffect } from 'react'
import { Movie } from '@prisma/client'
import { useRecoilState } from 'recoil'
import {moviesState} from "../atoms/moviesAtoms"
import MoviesContainer from '../components/MoviesContainer'

interface HomeProps {
  moviesData: Movie[]
}


const Home: NextPage<HomeProps> = ({moviesData}) => {

  const [movies,setMovies] = useRecoilState<Movie[]>(moviesState)

 
  useEffect(() => {

    setMovies(moviesData)

  },[setMovies,moviesData])

  if (!movies) return null

  return (
    <MoviesContainer movies={movies} />
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {


  const data = await fetch(`https://movies-review-three.vercel.app/api/movies`)
  const response = await data.json()

  return {
    props: {
      moviesData: response
    }
  }

}


export default Home
