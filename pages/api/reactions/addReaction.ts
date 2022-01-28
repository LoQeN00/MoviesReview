import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../../lib/prisma"
import { Reaction } from '@prisma/client'
import { getSession } from 'next-auth/react'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    const session = await getSession({req})

    if (!session) return res.status(400).json({message:"Not authenticated"})

    const data = JSON.parse(req.body)

    const result = await prisma.reaction.create({
        data: {
            type: data.reactionType,
            commentId: data.comment,
            userId: data.userId
        }
    })
    
   res.status(200).json({"message":"succes"})
    
}