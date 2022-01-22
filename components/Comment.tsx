import React, {FC} from 'react'
import {Comment} from "@prisma/client"
import Image from "next/image"


interface CommentProps {
    comment: Comment;
}

const CommentComponent: FC<CommentProps> = ({comment}) => {
    return (
        <div className='text-white'>
            <p><Image quality={75} className='rounded-full' width={64} height={64} src={comment.authorImg} alt={comment.author} />{comment.author}:{comment.text}</p>
        </div>
    )
}

export default CommentComponent
