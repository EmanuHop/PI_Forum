import { URL } from '@env';
import { faker } from '@faker-js/faker';
import { ChapterAssuntoComentario } from '../model/ChapterAssuntoComentario';

const endpoint = `${URL}/chapter/`;

function obterChaptersAssuntoComentario() {
    var lista = [];

    for (let index = 0; index < faker.datatype.number({min:0, max:8}); index++) {

        var item: ChapterAssuntoComentario = {
            id: faker.datatype.uuid(),
            key: index,
            title: faker.lorem.sentence(),
            description: faker.lorem.paragraph(),
            author: faker.name.firstName(),
            time: faker.date.birthdate({min:0, max: 2, mode: 'age'}),
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

export{ obterChaptersAssuntoComentario }