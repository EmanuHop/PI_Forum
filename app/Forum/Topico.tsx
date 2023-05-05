import { useEffect, useState } from 'react';
import {View, Text, StyleSheet, ScrollView} from "react-native"
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router'
import { Button, Card, Chip, IconButton, Title, TextInput} from 'react-native-paper'
import { ChapterAssuntoComentario } from '../../src/model/ChapterAssuntoComentario';
import { obterChaptersAssuntoComentario } from '../../src/service/ChapterAssuntoComentarioService';
import { faker } from '@faker-js/faker';

function ListChaptersAssuntoComentario(chaptersAssunto: ChapterAssuntoComentario[], curtir: Function, descurtir: Function) {
    return(
        (chaptersAssunto.map((assunto, index) => (
            <Card style={styles.card} key={index} >
                <View style={styles.cardTopSideComentario}>
                    <View style={{flexDirection: 'row', alignItems: "center", flexGrow: 0}}>
                        <Chip mode="outlined" style={{flexGrow: 0}} textStyle={{marginVertical: 4, color: 'blue'}}>{assunto.author}</Chip>
                        <Text style={{color: 'grey', fontSize: 12, marginLeft: 8}}>{assunto.time.toString()}</Text>
                    </View>
                    {(assunto.respondida)?<IconButton icon="check-circle"  iconColor='blue' size={15} onPress={() => (console.log('check'))}/>:<></>}
                </View>
               <Card.Content style={styles.cardConteudo}>
                 <View style={styles.cardTopSide}>
                   <Text style={{fontSize: 16, width: '85%'}}>{assunto.description}</Text>
                 </View>
                 <View style={styles.cardBotSide}>
                   <Button icon={(assunto.curtida)?'thumb-up':'thumb-up-outline'} style={{minWidth: 15}} contentStyle={{flexDirection: 'row-reverse', gap:10, justifyContent: 'flex-end'}} onPress={() => (curtir(assunto.id))} labelStyle={{marginHorizontal: 0, marginVertical: 0, color: 'blue'}}>{assunto.like}</Button>
                   <Button icon={(assunto.descurtida)?'thumb-down':'thumb-down-outline'} style={{minWidth: 15}} contentStyle={{flexDirection: 'row-reverse', gap:10, justifyContent: 'flex-end'}}  onPress={() => (descurtir(assunto.id))} labelStyle={{marginHorizontal: 0, marginVertical: 0, color: 'blue'}}>{assunto.unlike}</Button>
                 </View>
               </Card.Content>
             </Card>

    ))))
}

const Perguntar = (adicionarComentario: Function, chaptersAssuntoComentario: ChapterAssuntoComentario[]) => {
    const [descricaoResposta, setDescricaoResposta] = useState('');
    const setResposta = (text: string) => {
        setDescricaoResposta(text);
    }
    
    const criarResposta = () => {
        const novaPergunta: ChapterAssuntoComentario = {
            id: 1,
            key: (chaptersAssuntoComentario.length+1),
            title: null,
            description: descricaoResposta,
            author: faker.name.firstName(),
            time: faker.date.birthdate({min:0, max: 2, mode: 'age'}),
            views: 0,
            comments: 0,
            like: 0,
            unlike: 0,
            respondida: false,
            curtida: false,
            descurtida: false
        }
        adicionarComentario(novaPergunta);
    }
    return(
        <Card style={{marginLeft: '3%', marginRight: '3%', marginTop: 8, padding: 8}}>
            <Text style={{color: 'grey', fontSize: 12, marginLeft: 8}}>Responder como user</Text>
            <TextInput style={{backgroundColor: 'white'}} outlineColor='blue' onChangeText={text => setResposta(text)} multiline={true} mode='outlined' placeholder='Resposta'/>
            <Button onPress={() => (criarResposta())}>Perguntar</Button>
        </Card>
    )
}

export default function Topico(){
    const {title, descricao, autor, time} = useLocalSearchParams();
    
    const [chaptersAssunto, setChaptersAssunto] = useState<ChapterAssuntoComentario[]>([]);

    useEffect(() => {setChaptersAssunto(obterChaptersAssuntoComentario())}, [])

    function curtir(id : number){
        let newState = chaptersAssunto.map(assunto => {
            if(assunto.id == id){
                if(assunto.curtida == true){
                    return {...assunto, like: assunto.like-1, curtida: false}
                }
                if(assunto.descurtida == true){
                    return {...assunto, unlike: assunto.unlike-1, descurtida: false, like: assunto.like+1, curtida: true}
                }
                return {...assunto, like: assunto.like+1, curtida: true}
            }
            return(assunto);
        })
        setChaptersAssunto(newState);
    }

    function descurtir(id : number){
        let newState = chaptersAssunto.map(assunto => {
            if(assunto.id == id){
                if(assunto.descurtida == true){
                    return {...assunto, unlike: assunto.unlike-1, descurtida: false}
                }
                if(assunto.curtida == true){
                    return {...assunto, like: assunto.like-1, curtida: false, unlike: assunto.unlike+1, descurtida: true}
                }
                return {...assunto, unlike: assunto.unlike+1, descurtida: true}
            }
            return(assunto);
        })
        setChaptersAssunto(newState);
    }

    function adicionarComentário(comentario: ChapterAssuntoComentario){
        setChaptersAssunto([...chaptersAssunto, comentario]);
    }

    return(
        <View style={{justifyContent: 'flex-start', alignItems: 'center', flex: 1}}>
                <View style={styles.navBar}>
                    <Text style={styles.navItem}>Home</Text>
                    <Text style={styles.navItem}>Sobre</Text>
                    <Text style={styles.navItem}>Contato</Text>
                </View>
                <ScrollView>
                    <View style={{width:'100%'}}>
                        <Card style={{marginLeft: '3%', marginRight: '3%', marginTop: '5%'}}>
                            <View style={styles.cardTopSide}>
                                <Chip mode="outlined" textStyle={{marginVertical: 4, color: 'blue'}}>{autor}</Chip>
                                <Text style={{color: 'grey', fontSize: 12, marginLeft: 8}}>{time}</Text>
                            </View>
                            <Title style={{fontSize: 28, paddingHorizontal:16, fontWeight: '800', marginTop: 8}}>{title}</Title>
                            <Card.Content style={{}}>
                                <Text style={{fontSize: 16, marginTop: 8}}>{descricao}</Text>
                            </Card.Content>
                            <View>
                                <Button icon='file' style={{flexGrow: 1, justifyContent: 'flex-start', paddingHorizontal: 8, paddingVertical: 8}} labelStyle={{color: 'black', marginVertical: 0, marginHorizontal: 0, justifyContent: 'center'}} contentStyle={{flexDirection:'row', justifyContent: 'flex-start', gap:10}}>arq01</Button>
                            </View>
                        </Card>
                    </View>
                    <View style={{width:'100%', flex:1}}>
                        {ListChaptersAssuntoComentario(chaptersAssunto, curtir, descurtir)}
                        {Perguntar(adicionarComentário, chaptersAssunto)}
                    </View>
                </ScrollView>
            </View>
    )
}

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#1981CD',
        height: 85,
        width: '100%',
        paddingTop: 35
    },
    navItem: {
        color: '#fff',
        fontSize: 18,
    },
    card: {
        marginLeft: '3%',
        marginRight: '3%',
        marginTop: '5%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        paddingHorizontal: 0
      },
      cardConteudo:{
        paddingVertical: 0,
        paddingLeft: 8,
        paddingBottom: 8,
        paddingHorizontal: 0,
        width: '100%'
      },
      cardBotSide: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%'
      },
    cardTopSide: {
        flexDirection: 'row',
        alignItems: "center",
        paddingLeft: 8,
        paddingTop: 8,
        flexShrink: 0
    },
    cardTopSideComentario: {
        flexDirection: 'row',
        alignItems: "flex-start",
        justifyContent: 'space-between',
        paddingLeft: 8,
        paddingTop: 8,
        flexShrink: 0
    }
})