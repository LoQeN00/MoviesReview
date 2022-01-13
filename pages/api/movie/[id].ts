import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../../lib/prisma"
import { Movie } from '@prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    
    if (req.query.id) {
      if (typeof req.query.id === "string") {

        const movieData = await prisma.movie.findUnique({
          where: {
            id: parseInt(req.query.id)
          }
        })

        res.status(200).json({data: movieData})

      } else {
        res.status(400).json({error: "Cannot find that movie"})
      }
    }
    

    

    



}
  