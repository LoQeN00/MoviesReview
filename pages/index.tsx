import type { NextPage } from 'next'
import { useEffect } from 'react'


const Home: NextPage = () => {


  useEffect(() => {

    const fetchData = async () => {
      const data = await fetch(`${process.env.NODE_ENV === "development" ? process.env.DEV_URL : process.env.PRODUCTION_URL}`)
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
