import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../../lib/prisma"


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    
    if (req.query.id) {
      if (typeof req.query.id === "string") {

        const reactions = await prisma.reaction.findMany({
          where: {
            commentId: parseInt(req.query.id)
          }
        })

        console.log(reactions)

        res.status(200).json({reactions})

      } else {
        res.status(400).json({error: "Cannot find any reactions"})
      }
    }
    
}