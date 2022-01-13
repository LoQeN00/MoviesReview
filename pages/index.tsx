import type { NextPage } from 'next'
import { useEffect } from 'react'


const Home: NextPage = () => {


  useEffect(() => {

    const fetchData = async () => {
      const data = await fetch(`${process.env.WEBSITE_URL}/api/movies`)
      const response = await data.json()
      console.log(response)
    }

    fetchData()

  },[])


  return (
    <div>
      <h1>ELO</h1>
    </div>
  )
}

export default Home
