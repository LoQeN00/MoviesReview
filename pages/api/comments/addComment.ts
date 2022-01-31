import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../../lib/prisma"
import { Movie } from '@prisma/client'
import { getSession } from 'next-auth/react'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    const session = await getSession({req})

    if (!session) return res.status(400).json({message:"Not authenticated"})

    const data = JSON.parse(req.body)

    const commentData = {
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        text: data.text,
        author: data.author,
        authorImg: data.authorImg,
        userId: data.userId,
        movie: {
           connect: {
               id: parseInt(data.slug)
           }
        }
            
        
    }

    const result = await prisma.comment.create({
        data: commentData
    })

    console.log(result)
    
    res.status(200).json({
        message:"succes"
    })
}