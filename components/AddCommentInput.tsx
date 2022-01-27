import React,{FC,useRef} from 'react';
import { useRecoilState } from 'recoil';
import { commentsState } from '../atoms/commentsAtoms';
import { Comment } from "@prisma/client"
import {useRouter} from "next/router"
import { useSession} from 'next-auth/react'

const AddCommentInput:FC = () => {


    const inputRef = useRef<HTMLInputElement>(null)

    const [comments,setComments] = useRecoilState<Comment[] | null>(commentsState)

    const router = useRouter()

    const { data: session, status } = useSession()

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
                            userId: session.user.userId,
                            slug
                        })
                    })
    
                    const updatedDataJson = await fetch(`https://movies-review-three.vercel.app/api/movie/${slug}`)
    
                    // const updatedDataJson = await fetch(`http://localhost:3000/api/movie/${slug}`)
    
                    const updatedData = await updatedDataJson.json()
        
                    setComments(updatedData.comments)
        
                    inputRef.current.value = ""
    
                    }
                }
            }
        }



  return (
      <div>
        <input className='border-black border-2 text-black' type="text" ref={inputRef}  />
        <button onClick={addComment}>Dodaj komentarz</button>
      </div>
  )
};

export default AddCommentInput;
