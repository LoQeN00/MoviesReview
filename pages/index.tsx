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
    <div className='bg-primary flex flex-col h-screen'>
      <header className='bg-[#2EC4B6] p-8 text-primary text-2xl flex justify-between'>
        <div>
          <h1 className='text-primary font-bold text-4xl'>MOVIES REVIEW</h1>
        </div>
        <div>
            {session ?
            <h1>Witaj {session.user?.name}</h1> :
            <h1>Witaj, aby w pełni móc korzystać z serwisu <Link href="/login"><a className='border-2 rounded-md border-black'>Zaloguj się</a></Link></h1>
            }
            
            {session ?
            <button onClick={() => signOut()}>Wyloguj</button> :
              null
            }
        </div>
      </header> 
      
      <div className='flex flex-1 justify-center  items-center flex-wrap gap-4'>
        {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  )
}

export default Home
