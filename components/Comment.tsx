import React, {FC} from 'react'
import {Comment} from "@prisma/client"


interface CommentProps {
    comment: Comment;
}

const CommentComponent: FC<CommentProps> = ({comment}) => {
    return (
        <div>
            <p>{comment.text}</p>
        </div>
    )
}

export default CommentComponent
