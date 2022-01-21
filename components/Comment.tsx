import React, {FC} from 'react'
import {Comment} from "@prisma/client"
import Image from "next/image"


interface CommentProps {
    comment: Comment;
}

const CommentComponent: FC<CommentProps> = ({comment}) => {
    return (
        <div>
            <p>{comment.author}:{comment.text}</p>
        </div>
    )
}

export default CommentComponent
