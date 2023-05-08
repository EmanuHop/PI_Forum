import { useContext, useEffect, useState } from 'react';
import {View, Text, StyleSheet, ScrollView } from "react-native"
import { useLocalSearchParams } from 'expo-router'
import { Button, Card, Chip, IconButton, Title, TextInput, Provider} from 'react-native-paper'
import { navBar } from '../../src/components/navBar';
import { ChapterAssuntoComentario } from '../../src/model/ChapterAssuntoComentario';
import { obterChaptersAssuntoComentario } from '../../src/service/ChapterAssuntoComentarioService';
import { faker } from '@faker-js/faker';
import { FormControl, Input, Menu, Modal, NativeBaseProvider } from 'native-base';
import moment from 'moment';
import { UserContext } from '../../src/context/UserContext';
import { User } from '../../src/model/User';

function ListChaptersAssuntoComentario(chaptersAssunto: ChapterAssuntoComentario[], curtir: Function, descurtir: Function, excluirComentario: Function, editarComentario: Function) {
    const [showModal, setShowModal] = useState(false);

    const [editComentario, setEditComentario] = useState<string>('');

    function handleChange(text: string){
        setEditComentario(text);
    }

    const [ editId, setEditId] = useState<number>()

    return(
        (chaptersAssunto.map((assunto, index) => (
            <Card style={styles.card} key={index} >
                <View style={styles.cardTopSideComentario}>
                    <View style={{flexDirection: 'row', alignItems: "center", flexGrow: 0, width: '70%'}}>
                        <Chip mode="outlined" style={{flexGrow: 0}} textStyle={{marginVertical: 4, color: 'blue'}}>{assunto.author.nome}</Chip>
                        <Text style={{color: 'grey', fontSize: 12, marginLeft: 8}}>{assunto.time.toString()}</Text>
                    </View>
                    <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end'}}>
                        {(assunto.respondida)?<IconButton icon="check-circle"  iconColor='blue' size={15} onPress={() => (console.log('check'))}/>:<></>}
                        <Menu lineHeight={15} shadow={2}  w="120" placement='left top' trigger={triggerProps => {
                            return <IconButton icon='settings-helper' borderless={false}  style={{transform: [{ rotate: '90deg' }]}}  {...triggerProps}/>;
                        }}>
                            <Menu.Item onPress={() => excluirComentario(assunto.id)}>Excluir</Menu.Item>
                            <Menu.Item onPress={() => (setShowModal(true), setEditId(assunto.id))}>Editar</Menu.Item>
                        </Menu>
                        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                            <Modal.Content maxWidth="400px">
                            <Modal.CloseButton />
                            <Modal.Header>Editar Comentario</Modal.Header>
                            <Modal.Body>
                                <FormControl isRequired={true}>
                                    <FormControl.Label>Comentario</FormControl.Label>
                                    <Input onChangeText={handleChange}/>
                                </FormControl>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onPress={() => (setShowModal(false))}>Cancel</Button>
                                <Button disabled={(editComentario?.trim().length == 0)?true:false} onPress={() => (setShowModal(false), editarComentario(editId, editComentario))}>Save</Button>
                            </Modal.Footer>
                            </Modal.Content>
                        </Modal>
                    </View>
                </View>
               <Card.Content style={styles.cardConteudo}>
                 <View style={styles.cardTopSide}>
                   <Text style={{fontSize: 16, width: '85%'}}>{assunto.description}</Text>
                 </View>
                 <View style={styles.cardBotSide}>
                   <Button icon={(assunto.curtida)?'thumb-up':'thumb-up-outline'} style={{minWidth: 15}} contentStyle={{flexDirection: 'row-reverse', gap:10, justifyContent: 'flex-end'}} onPress={() => (curtir(assunto.id))} labelStyle={{marginHorizontal: 0, marginVertical: 0, color: 'blue'}}>{assunto.like}</Button>
                   <Button icon={(assunto.descurtida)?'thumb-down':'thumb-down-outline'} style={{minWidth: 15}} contentStyle={{flexDirection: 'row-reverse', gap:10, justifyContent: 'flex-end'}}  onPress={() => (descurtir(assunto.id))} labelStyle={{marginHorizontal: 0, marginVertical: 0, color: 'blue'}}>{assunto.unlike}</Button>
                 </View>
                 
                 {/* {comentarioMenu(assunto, index, curtir, descurtir)} */}
               </Card.Content>
               
             </Card>
                // {/* {assuntoComentario(assunto, index, curtir, descurtir)} */}
            
    ))))
}



const Perguntar = (adicionarComentario: Function, chaptersAssuntoComentario: ChapterAssuntoComentario[], user: User) => {
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
            author: user,
            time: moment().utcOffset('-03:00').format('DD/MM/YYYY'),
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
            <Text style={{color: 'grey', fontSize: 12, marginLeft: 8}}>Responder como {user.nome}</Text>
            <TextInput style={{backgroundColor: 'white'}} outlineColor='blue' onChangeText={text => setResposta(text)} multiline={true} mode='outlined' placeholder='Resposta'/>
            <Button onPress={() => (criarResposta())}>Perguntar</Button>
        </Card>
    )
}

export default function Topico(){
    const user = useContext(UserContext);
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

    function excluirComentario(id: number){
        setChaptersAssunto(chaptersAssunto.filter(assunto => assunto.id != id));
    }

    function editarComentario(id: number, editComentario: string){
        let newState = chaptersAssunto.map(assunto => {
            if(assunto.id == id){
                console.log(id);
                return {...assunto, description: editComentario}
            }
            return(assunto);
        })
        setChaptersAssunto(newState);
        console.log("teste");
    }

    return(
        <NativeBaseProvider>
            <Text>{user.nome}</Text>
            <View style={{justifyContent: 'flex-start', alignItems: 'center', flex: 1}}>
                {navBar()}
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
                        {ListChaptersAssuntoComentario(chaptersAssunto, curtir, descurtir, excluirComentario, editarComentario)}
                        {Perguntar(adicionarComentário, chaptersAssunto, user)}
                    </View>
                </ScrollView>
            </View>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
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