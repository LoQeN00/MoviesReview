import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../../lib/prisma"
import { Comment } from '@prisma/client'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    const data = JSON.parse(req.body)

    console.log(data)

    if (data.reactionType) {

        if (data.reactionType === "+") {

            const updateComment = await prisma.comment.update({
                data: {
                    plus: {
                        increment: 1
                    }
                },
                where: {
                    id: data.commentId
                },
            })

            res.status(200).json({
                message:"succes"
            })

        } else if (data.reactionType === "-") {
            const updateComment = await prisma.comment.update({
                data: {
                    minus: {
                        increment: 1
                    }
                },
                where: {
                    id: data.commentId
                },
                
            })

            res.status(200).json({
                message:"succes"
            })
        } else {
            res.status(400).json({
                message:"error"
            })
        }

    }

    
}