import React, {FC, useEffect, useState} from 'react'
import {GetServerSideProps} from "next"
import {Comment, Reaction} from "@prisma/client"
import Image from "next/image"
import { useSession } from 'next-auth/react'


interface CommentProps {
    comment: Comment;
}

const CommentComponent: FC<CommentProps> = ({comment}) => {

    const { data: session, status } = useSession()

    const [reactions,setReactions] = useState<Reaction[]>([])

    useEffect(() => {

        const fetchData = async () => {
            const response = await fetch(`/api/reactions/${comment.id}`)
            const data = await response.json()

            setReactions(data)
        }

        fetchData()

    },[comment.id])

    console.log(reactions)


    return (
        <div className='text-white max-w-lg flex p-4'>
            <div className='w-[64px] h-[64px] relative mr-5'>
                <Image layout='fill' quality={75} className='rounded-full' src={comment.authorImg} alt={comment.author} />
            </div>
            <div className='flex flex-col'>
                <div className='bg-secondary p-4 rounded-2xl max-w-[350px] break-words relative'>
                    <p className='font-bold text-md tracking-wide'>{comment.author}</p>
                    <p>{comment.text}</p>
                    
                </div>
            </div>
        </div>
    )
}



export default CommentComponent
