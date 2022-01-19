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
        text: data.text,
        movie: {
           connect: {
               id: parseInt(data.slug)
           }
        }
            
        
    }

    const result = await prisma.comment.create({
        data: commentData
    })
    
    res.status(200).json({
        message:"succes"
    })
}