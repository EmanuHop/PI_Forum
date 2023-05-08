import { Tag } from "./Tag";
import { User } from "./User";


export interface ChapterAssunto{
    id: number;
    key: number,
    title: string,
    description: string,
    author: User,
    tags: Tag[] | undefined,
    time: string,
    views: number,
    comments: number,
    like: number,
    unlike: number,
    respondida: boolean
}