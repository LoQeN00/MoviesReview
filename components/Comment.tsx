import React, {FC} from 'react'
import {Comment} from "@prisma/client"
import Image from "next/image"
import { useSession } from 'next-auth/react'


interface CommentProps {
    comment: Comment;
}

const CommentComponent: FC<CommentProps> = ({comment}) => {

    const { data: session, status } = useSession()


    const addReaction = async (reaction: "+" | "-") => {  
        // const data = fetch('https://movies-review-three.vercel.app/api/comments/addReaction')
        const data = await fetch("/api/comments/addReaction", {
            method: "POST",
            body: JSON.stringify({
                commentId: comment.id,
                reactionType: reaction
            })
        })

    }


    return (
        <div className='text-white max-w-lg flex p-4'>
            <div className='w-[64px] h-[64px] relative mr-5'>
                <Image layout='fill' quality={75} className='rounded-full' src={comment.authorImg} alt={comment.author} />
            </div>
            <div className='flex flex-col'>
                <div className='bg-secondary p-4 rounded-2xl max-w-[350px] break-words relative'>
                    <p className='font-bold text-md tracking-wide'>{comment.author}</p>
                    <p>{comment.text}</p>
                    <div className='absolute bottom-[-18px] right-[-10px] w-14 h-8 bg-accent rounded-lg flex justify-center items-center'>
                        <p><span>{comment.plus}+</span>  <span>{comment.minus}-</span></p>
                    </div>
                </div>
                {session && <div className='space-x-4 mt-2 flex'>
                    <div onClick={() => addReaction("+")} className='border-2 border-secondary rounded-full w-7 cursor-pointer'>
                        <p className='text-center'>+</p>
                    </div>
                    <div onClick={() => addReaction("-")} className='border-2 border-secondary rounded-full w-7 cursor-pointer'>
                        <p className='text-center'> - </p>
                    </div>
                </div>}
            </div>
           
            
        </div>
    )
}

export default CommentComponent
