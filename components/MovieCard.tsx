import React, {FC} from 'react'
import { Movie } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

interface MovieCardProps {
    movie: Movie;
}


const MovieCard: FC<MovieCardProps> = ({movie}) => {

    return (
        <Link href={`/movies/${movie.id}`} passHref>
            <div className='flex flex-col cursor-pointer w-[310px] h-[390px]'>
                <div className='w-[100%] h-[100%] relative'>
                    <Image layout="fill" src={movie.img} alt={movie.name} />
                </div>
                <div className='bg-accent w-[100%]  rounded-b-lg'>
                    <p className='text-black text-center text-lg p-4 font-bold'>{movie.name}</p>
                </div>
            </div>
        </Link>
    )
}

export default MovieCard
