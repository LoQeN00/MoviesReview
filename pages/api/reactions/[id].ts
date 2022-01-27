import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../../lib/prisma"


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    
    if (req.query.id) {
      if (typeof req.query.id === "string") {

        const data = JSON.parse(req.body)

        const reactions = await prisma.reaction.findMany({
          where: {
            commentId: parseInt(req.query.id)
          }
        })

       

        const plusCount = await prisma.reaction.count({
          where: {
            type: "+",
            commentId: parseInt(req.query.id)
          }
        })

        const minusCount = await prisma.reaction.count({
          where: {
            type: "-",
            commentId: parseInt(req.query.id)
            
          }
        })

        const test = await prisma.reaction.findMany()
        
        res.status(200).json({reactions,plusCount,minusCount})

      } else {
        res.status(400).json({error: "Cannot find any reactions"})
      }
    }
    
}