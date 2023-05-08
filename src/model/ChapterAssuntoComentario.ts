import { User } from "./User";

export interface ChapterAssuntoComentario{
    id: number;
    key: number,
    title: string | undefined | null,
    description: string,
    author: User,
    time: string,
    views: number,
    comments: number,
    like: number,
    unlike: number,
    respondida: boolean,
    curtida: boolean,
    descurtida: boolean
}