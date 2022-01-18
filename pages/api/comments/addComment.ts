import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../../lib/prisma"
import {  } from '@prisma/client'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    const data = JSON.parse(req.body)

    const commentData = {
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        text: req.body.text,
        movie: {
           connect: {
               id: parseInt(req.body.slug)
           }
        }
            
        
    }

    const result = await prisma.comment.create({
        data: commentData
    })

    const movies = await fetch(`https://movies-review-three.vercel.app/api/movie/${req.body.slug}`)

    const moviesJSON = await movies.json()

    console.log(moviesJSON)

    res.status(200).json(moviesJSON)
   
    
}