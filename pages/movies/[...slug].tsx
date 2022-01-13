import React from 'react'
import type { NextPage } from 'next'
import { GetServerSideProps } from "next"
import {Movie} from "@prisma/client"
import Image from "next/image"

interface MoviePageProps {
    movieData: Movie;
}

const MoviePage: NextPage<MoviePageProps> = ({movieData}) => {

    if (!movieData) return null

    return (
        <div>
            <h1>{movieData.name}</h1>
            <Image src={movieData.img} alt={movieData.name} width={300} height={300} />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    if (context.params) {

        console.log(window.location.hostname)

        if (context.params.slug) {
            const slug = context.params.slug[0]
            const res = await fetch(`${process.env.NOW_URL ? process.env.NOW_URL : "http://localhost:3000"}/api/movie/${slug}`)
            const data = await res.json()
            

            return {
                props: {
                    movieData: data.data
                }
            }
        }
       
    }
    

    return {
        props: {

        }
    }

}




   
    





export default MoviePage
