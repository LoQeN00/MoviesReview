import React, {FC, useRef} from 'react';
import CommentComponent from "../components/Comment"
import { Comment } from "@prisma/client"
import { useSession} from 'next-auth/react'
import {useRouter} from "next/router"


interface CommentsContainerProps {
    coms: Comment[];
    setComs: (comments: Comment[]) => void;
}

const CommentsContaier: FC<CommentsContainerProps> = ({coms,setComs}) => {

  const router = useRouter()

  const { data: session, status } = useSession()

  const inputRef = useRef<HTMLInputElement>(null)

  const addComment = async () => {

    const slug = router.query.slug

    if (inputRef.current) {

        if (inputRef.current.value === "") return

        if (session) {

            if (session.user) {

                const data = await fetch("/api/comments/addComment", {
                    method: "POST",
                    body: JSON.stringify({
                        text: inputRef.current.value,
                        author: session.user.name,
                        authorImg: session.user.image,
                        slug
                    })
                })

                const updatedDataJson = await fetch(`https://movies-review-three.vercel.app/api/movie/${slug}`)

                // const updatedDataJson = await fetch(`http://localhost:3000/api/movie/${slug}`)

                const updatedData = await updatedDataJson.json()
    
                setComs(updatedData.comments)
    
                inputRef.current.value = ""

            }
        }
    }
}


  return (

    <div className='flex-1 bg-primary text-white max-h-[400px] overflow-hidden overflow-y-scroll p-4'>
        {coms.map(comment => <CommentComponent comment={comment} key={comment.id} />) }
        
        {session ? (
            <>
                <input className='border-black border-2 text-black' type="text" ref={inputRef}  />
                <button onClick={addComment}>Dodaj komentarz</button>
            </>
            
        ) : <p>Aby móc dodawać komentarze zaloguj się</p>}
    </div>

  );
};

export default CommentsContaier;
