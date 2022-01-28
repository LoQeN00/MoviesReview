import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../lib/prisma"
import { Movie } from '@prisma/client'


async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Movie[]>
  ) {
    
    const movies = await prisma.movie.findMany()
    res.status(200).json(movies)


}


export default handler