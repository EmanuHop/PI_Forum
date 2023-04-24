import { Tag } from "./Tag";


export interface ChapterAssunto{
    id: number;
    key: number,
    title: string,
    description: string,
    author: string,
    tags: Tag[] | undefined,
    time: Date,
    views: number,
    comments: number,
    like: number,
    unlike: number,
    respondida: boolean
}