import React,{useEffect,useRef} from 'react'
import type { NextPage } from 'next'
import { GetServerSideProps } from "next"
import {Movie, Comment} from "@prisma/client"
import Image from "next/image"
import { useRecoilState } from 'recoil'
import { commentsState } from "../../atoms/commentsAtoms"
import CommentComponent from "../../components/Comment"
import {useRouter} from "next/router"
import { useSession} from 'next-auth/react'
import Header from "../../components/Header"
import CommentsContainer from "../../components/CommentsContaier"

interface MoviePageProps {
    movieData: Movie;
    comments: Comment[];
}

const MoviePage: NextPage<MoviePageProps> = ({movieData,comments}) => {

    const [coms,setComs] = useRecoilState<Comment[] | null>(commentsState)

    useEffect(() => {
        setComs(comments)
    },[setComs,comments])

   
    if (!movieData || !coms) return null

    return (
        <div className='flex flex-col h-screen'>
            <Header />
            <div className='flex-1 bg-primary text-white p-6'>
                <h1 className='text-3xl mb-6'>{movieData.name}</h1>
                <Image src={movieData.img} alt={movieData.name} width={320} height={410} />
                <h2 className='text-2xl'>Komentarze</h2>
                <CommentsContainer setComs={setComs} coms={coms} />
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    if (context.params) {


        if (context.params.slug) {
            const slug = context.params.slug[0]
            const res = await fetch(`https://movies-review-three.vercel.app/api/movie/${slug}`)

            // const res = await fetch(`http://localhost:3000/api/movie/${slug}`)
            
            const data = await res.json()

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
