import { URL } from '@env'

const endpoint: string = `${URL}/api/`;

export function obterTags() {
    const DATA = [
        { id: 1, nome: 'Java' },
        { id: 2, nome: 'PHP' },
        { id: 3, nome: 'C#' },
        { id: 4, nome: 'JS' },
        { id: 5, nome: 'Oracle' },
        { id: 6, nome: 'Postgres' },
        { id: 7, nome: 'SQL' },
        { id: 8, nome: 'DB' },
        { id: 9, nome: 'AWS' },
        { id: 10, nome: 'Azure' }];

    return DATA;
}