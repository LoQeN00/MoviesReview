import React, {FC} from 'react'
import { Movie } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

interface MovieCardProps {
    movie: Movie;
}


const MovieCard: FC<MovieCardProps> = ({movie}) => {

    return (
        <div className='w-80 h-80' key={movie.id}>
            <Link href={`/movies/${movie.id}`} passHref>
                <Image layout='responsive' src={movie.img} alt={movie.name} width={300} height={390} />
            </Link>
        </div>
    )
}

export default MovieCard
