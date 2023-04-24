export interface ChapterAssuntoComentario{
    id: string;
    key: number,
    title: string,
    description: string,
    author: string,
    time: Date,
    views: number,
    comments: number,
    like: number,
    unlike: number,
    respondida: boolean
}