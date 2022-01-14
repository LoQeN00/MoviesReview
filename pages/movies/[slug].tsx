import React from 'react'
import type { NextPage } from 'next'
import { GetServerSideProps } from "next"
import {Movie} from "@prisma/client"
import Image from "next/image"

interface MoviePageProps {
    movieData: Movie;
    comments: any[];
}

const MoviePage: NextPage<MoviePageProps> = ({movieData,comments}) => {

    if (!movieData) return null

    console.log(comments)

    return (
        <div>
            <h1>{movieData.name}</h1>
            <Image src={movieData.img} alt={movieData.name} width={300} height={300} />
            <h2>Komentarze</h2>
            {comments.map(comment => {
                return (
                    <p key={comment.id}>{comment.text}</p>
                )
            })}
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    if (context.params) {


        if (context.params.slug) {
            const slug = context.params.slug[0]
            const res = await fetch(`https://movies-review-three.vercel.app/api/movie/${slug}`)
            
            const data = await res.json()

            console.log(data)
            

            return {
                props: {
                    movieData: data.movieData,
                    comments: data.comments
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
