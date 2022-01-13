import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../lib/prisma"


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    
    const movies = await prisma.movie.findMany()
    res.status(200).json(movies)


}
  