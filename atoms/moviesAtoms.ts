import { atom } from "recoil";
import { Movie } from "@prisma/client";


export const moviesState = atom<Movie[]>({
    key: 'moviesAtom',
    default: []
})