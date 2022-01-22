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

    const { data: session, status } = useSession()

    const [coms,setComs] = useRecoilState<Comment[] | null>(commentsState)

    const router = useRouter()

    useEffect(() => {
        setComs(comments)
    },[setComs,comments])

    // const addComment = async () => {

    //     const slug = router.query.slug

    //     if (inputRef.current) {

    //         if (inputRef.current.value === "") return

    //         if (session) {

    //             if (session.user) {

    //                 const data = await fetch("/api/comments/addComment", {
    //                     method: "POST",
    //                     body: JSON.stringify({
    //                         text: inputRef.current.value,
    //                         author: session.user.name,
    //                         authorImg: session.user.image,
    //                         slug
    //                     })
    //                 })

    //                 const updatedDataJson = await fetch(`https://movies-review-three.vercel.app/api/movie/${slug}`)

    //                 // const updatedDataJson = await fetch(`http://localhost:3000/api/movie/${slug}`)

    //                 const updatedData = await updatedDataJson.json()
        
    //                 setComs(updatedData.comments)
        
    //                 inputRef.current.value = ""

    //             }
    //         }
    //     }
    // }
    
    if (!movieData || !coms) return null


    return (
        <div className='flex flex-col h-screen'>
            <Header />
            <div className='flex-1 bg-primary text-white'>
                <h1>{movieData.name}</h1>
                <Image src={movieData.img} alt={movieData.name} width={300} height={300} />
                <h2 >Komentarze</h2>
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
