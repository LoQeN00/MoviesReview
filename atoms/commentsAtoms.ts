import { atom } from "recoil";
import { Comment } from "@prisma/client";


export const commentsState = atom<Comment[] | null>({
    key: 'commentsAtom',
    default: []
})