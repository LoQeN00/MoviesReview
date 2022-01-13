import type { NextPage } from 'next'
import { useEffect } from 'react'


const Home: NextPage = () => {


  useEffect(() => {

    const fetchData = async () => {
      const data = await fetch("http://localhost:3000/api/movies")
      const response = await data.json()
      console.log(response)
    }

    fetchData()

  },[])


  return (
    <div>
      
    </div>
  )
}

export default Home
