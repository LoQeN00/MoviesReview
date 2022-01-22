import React, {FC} from 'react'
import { Movie } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

interface MovieCardProps {
    movie: Movie;
}


const MovieCard: FC<MovieCardProps> = ({movie}) => {

    return (
        <div key={movie.id}>
            <div className='w-[300px] h-[390px] relative'>
                <Link href={`/movies/${movie.id}`} passHref>
                    <Image layout="fill" src={movie.img} alt={movie.name} width={300} height={390} />
                </Link>
            </div>
        </div>
    )
}

export default MovieCard
