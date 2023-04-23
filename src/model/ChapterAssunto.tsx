import { Tag } from "./Tag";


export interface ChapterAssunto{
    id: string;
    key: number,
    title: string,
    description: string,
    author: string,
    tags: Tag[] | undefined,
    views: number,
    comments: number,
    like: number,
    unlike: number,
    respondida: boolean
}