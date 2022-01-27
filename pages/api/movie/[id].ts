import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../../lib/prisma"
import { Movie, Comment } from '@prisma/client'

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

        const comments = await prisma.comment.findMany({
          where: {
            movieId: parseInt(req.query.id)
          },

          include: {
            movie: true
          }
        })

        res.status(200).json({movieData,comments})

      } else {
        res.status(400).json({error: "Cannot find that movie"})
      }
    }
    

    

    



}
  