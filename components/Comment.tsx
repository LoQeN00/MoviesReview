import React, {FC, useEffect, useState} from 'react'
import {Comment, Reaction} from "@prisma/client"
import Image from "next/image"
import { useSession } from 'next-auth/react'


interface CommentProps {
    comment: Comment;
}

const CommentComponent: FC<CommentProps> = ({comment}) => {

    const { data: session, status } = useSession()

    const [reactions,setReactions] = useState<Reaction[]>([])
    const [plusCount,setPlusCount] = useState()
    const [minusCount,setMinusCount] = useState()
    const [canAddReaction,setCanAddReaction] = useState(false)
    const [buttonsDisabled,setButtonsDisabled] = useState(false)


    useEffect(() => {

        const fetchData = async () => {
            const response = await fetch(`/api/reactions/${comment.id}`, {
                method: "POST",
                body: JSON.stringify({
                    userId: session?.user.userId
                })
            })
            const data = await response.json()

           

            setReactions(data.reactions)
            setPlusCount(data.plusCount)
            setMinusCount(data.minusCount)
            setCanAddReaction(data.canAddReaction)
        }

        fetchData()

    },[comment.id,session])

    
    const addReaction = async (type: "+" | "-") => {

        setButtonsDisabled(true)

        const response = await fetch('/api/reactions/addReaction', {
            method: "POST",
            body: JSON.stringify({
                reactionType: type,
                userId: session?.user.userId,
                comment: comment.id
            })
        })

        const updatedData = await fetch(`/api/reactions/${comment.id}`, {
            method: "POST",
            body: JSON.stringify({
                userId: session?.user.userId
            })
        })
        const data = await updatedData.json()

        setReactions(data.reactions)
        setPlusCount(data.plusCount)
        setMinusCount(data.minusCount)
        setCanAddReaction(data.canAddReaction)
        
    }


    return (
        <div className='text-white max-w-lg flex p-4'>
            <div className='w-[64px] h-[64px] relative mr-5'>
                {comment.authorImg ?
                    <Image layout='fill' quality={75} className='rounded-full' src={comment.authorImg} alt={comment.author} />:
                    <p>{comment.author}</p>
                }
                
            </div>
            <div className='flex flex-col relative'>
                <div className='bg-secondary p-4 rounded-2xl max-w-[350px] break-words relative'>
                    <p className='font-bold text-md tracking-wide'>{comment.author}</p>
                    <p>{comment.text}</p>
                    {plusCount && plusCount > 0 || minusCount && minusCount > 0 ? (
                         <div className='absolute bottom-[-10px] right-[-20px] bg-accent p-1 rounded-lg flex'>
                            <p>{plusCount}+ </p>
                            <p>{minusCount}- </p>
                        </div>
                        ):null
                    }
                   
                        
                </div>
                <div>
                    {session && session.user.userId != comment.userId  && canAddReaction ? (
                         <div className='flex mt-4 space-x-4'>
                            <button disabled={buttonsDisabled} className='border-2 border-secondary p-2 rounded-full w-8 h-8 flex justify-center items-center' onClick={() => addReaction("+")}> + </button>
                            <button disabled={buttonsDisabled} className='border-2 border-secondary p-2 rounded-full w-8 h-8 flex justify-center items-center' onClick={() => addReaction("-")}> - </button>
                        </div>
                        ): null

                    }
                </div>
            </div>
        </div>
    )
}



export default CommentComponent
