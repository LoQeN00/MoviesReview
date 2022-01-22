import React, {FC, useRef} from 'react';
import CommentComponent from "../components/Comment"
import { Comment } from "@prisma/client"
import { useSession} from 'next-auth/react'

interface CommentsContainerProps {
    coms: Comment[];
    addComment: () => void;
}

const CommentsContaier: FC<CommentsContainerProps> = ({coms,addComment}) => {

  const { data: session, status } = useSession()

  const inputRef = useRef<HTMLInputElement>(null)


  return (

    <div className='flex-1 bg-primary text-white'>
        {coms.map(comment => <CommentComponent comment={comment} key={comment.id} />) }
        
        {session ? (
            <>
                <input className='border-black border-2' type="text" ref={inputRef}  />
                <button onClick={addComment}>Dodaj komentarz</button>
            </>
            
        ) : <p>Aby móc dodawać komentarze zaloguj się</p>}
    </div>

  );
};

export default CommentsContaier;
