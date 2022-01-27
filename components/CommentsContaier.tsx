import React, {FC} from 'react';
import CommentComponent from "../components/Comment"
import { Comment } from "@prisma/client"
import { useSession} from 'next-auth/react'
import {useRecoilValue} from "recoil"
import { commentsState } from "../atoms/commentsAtoms"
import AddCommentInput from './AddCommentInput';


const CommentsContaier: FC = () => {

  const { data: session, status } = useSession()

  const comments = useRecoilValue<Comment[] | null>(commentsState)

  if(!comments) return null

  return (

    <div className='flex-1 bg-primary text-white max-h-[400px] overflow-hidden overflow-y-scroll p-4'>
        {comments.map(comment => <CommentComponent comment={comment} key={comment.id} />) }
        
        {session ? <AddCommentInput /> : <p>Aby móc dodawać komentarze zaloguj się</p>}
    </div>

  );
};

export default CommentsContaier;
