import type { NextPage } from 'next'
import { useEffect } from 'react'
import { Movie } from '@prisma/client'
import { useRecoilState } from 'recoil'
import {moviesState} from "../atoms/moviesAtoms"
import MovieCard from '../components/MovieCard'
import { useSession,signOut } from 'next-auth/react'
import Link from 'next/link'

const Home: NextPage = () => {

  const [movies,setMovies] = useRecoilState<Movie[]>(moviesState)

  const { data: session, status } = useSession()


  useEffect(() => {

    const fetchData = async () => {
      const data = await fetch(`/api/movies`)
      const response = await data.json()
      setMovies(response) 
    }

    fetchData()

  },[setMovies])

  


  return (
    <>
    {session ? <h1>Witaj {session.user?.name}</h1> : <h1>Witaj, aby w pełni móc korzystać z serwisu <Link href="/login"><a className='border-2 rounded-md border-black'>Zaloguj się</a></Link></h1> }
    {session ? <button onClick={() => signOut()}>Wyloguj</button> : null} 
    <div className='h-screen flex justify-center items-center'>
      <div className='flex justify-center items-center'>
        {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
    </>
  )
}

export default Home
