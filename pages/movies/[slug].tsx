import React,{useEffect,useRef} from 'react'
import type { NextPage } from 'next'
import { GetServerSideProps } from "next"
import {Movie, Comment} from "@prisma/client"
import Image from "next/image"
import { useRecoilState } from 'recoil'
import { commentsState } from "../../atoms/commentsAtoms"
import CommentComponent from "../../components/Comment"
import {useRouter} from "next/router"

interface MoviePageProps {
    movieData: Movie;
    comments: Comment[];
}

const MoviePage: NextPage<MoviePageProps> = ({movieData,comments}) => {

    const [coms,setComs] = useRecoilState<Comment[] | null>(commentsState)
    const router = useRouter()

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setComs(comments)
    },[setComs,comments])

    const addComment = async () => {
        const slug = router.query.slug

        if (inputRef.current) {

            const data = await fetch("/api/comments/addComment", {
                method: "POST",
                body: JSON.stringify({
                    text: inputRef.current.value,
                    slug
                })
            })

            const updatedDataJson = await fetch(`https://movies-review-three.vercel.app/api/movie/${slug}`)

            const updatedData = await updatedDataJson.json()

            setComs(updatedData.comments)

        }
        
    }
    
    if (!movieData || !coms) return null

    return (
        <div>
            <h1>{movieData.name}</h1>
            <Image src={movieData.img} alt={movieData.name} width={300} height={300} />
            <h2>Komentarze</h2>

            {coms.map(comment => <CommentComponent comment={comment} key={comment.id} />) }
            <input className='border-black border-2' type="text" ref={inputRef}  />
            <button onClick={addComment}>Dodaj komentarz</button>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    if (context.params) {


        if (context.params.slug) {
            const slug = context.params.slug[0]
            const res = await fetch(`https://movies-review-three.vercel.app/api/movie/${slug}`)
            
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
