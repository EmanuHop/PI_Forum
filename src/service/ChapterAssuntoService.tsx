import { URL } from '@env';
import { faker } from '@faker-js/faker';
import { obterTags } from './tagService';
import { ChapterAssunto } from '../model/ChapterAssunto';

const endpoint = `${URL}/chapter/`;

const allTags: Tag[] = obterTags();

interface Tag {
    id: number,
    nome: string
}

const randomTag = (): Tag => {
    const generateRandomTag = () => {
        return allTags.find(t => t.id === faker.datatype.number({min:1, max:10}))
    }
    do{
        var tag: Tag | undefined = generateRandomTag();
    }while (tag === undefined);
    return(tag);
}

function obterChaptersAssunto() {
    var lista = [];

    for (let index = 0; index < 15; index++) {
        var tags: Tag[] = []

        for (let j = 0; j < faker.datatype.number({min:1,max:3}); j++) {
            let tag: Tag = randomTag();
            if(!tags.includes(tag)){
                tags.push(tag);
            }
        }

        var item: ChapterAssunto = {
            id: faker.datatype.uuid(),
            key: index,
            title: faker.lorem.sentence(),
            description: faker.lorem.paragraph(),
            author: faker.name.firstName(),
            tags,
            views: Math.floor(Math.random() * 100),
            comments: Math.floor(Math.random() * 10),
            like: Math.floor(Math.random() * 100),
            unlike: Math.floor(Math.random() * 100),
            respondida: faker.datatype.boolean()
        };

        lista.push(item);
    }

    return lista;
}

export{ obterChaptersAssunto }