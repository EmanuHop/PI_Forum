import { useEffect, useState } from 'react';
import {View, Text, StyleSheet} from "react-native"
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router'
import { Button, Card, Chip, IconButton, Title, TextInput} from 'react-native-paper'
import { ChapterAssuntoComentario } from '../../src/model/ChapterAssuntoComentario';
import { obterChaptersAssuntoComentario } from '../../src/service/ChapterAssuntoComentarioService';
import { NativeBaseProvider, ScrollView, VStack } from 'native-base';

function listarChaptersAssuntoComentario(list : ChapterAssuntoComentario[]) {
    return(
        (list.map(assunto => (
            <Card style={styles.card} key={assunto.key} >
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
                   <Button icon='thumb-up' style={{minWidth: 15}} contentStyle={{flexDirection: 'row-reverse', gap:10, justifyContent: 'flex-end'}} labelStyle={{marginHorizontal: 0, marginVertical: 0, color: 'blue'}}>{assunto.like}</Button>
                   <Button icon='thumb-down' style={{minWidth: 15}} contentStyle={{flexDirection: 'row-reverse', gap:10, justifyContent: 'flex-end'}} labelStyle={{marginHorizontal: 0, marginVertical: 0, color: 'blue'}}>{assunto.unlike}</Button>
                 </View>
               </Card.Content>
             </Card>
        )))
    )
};


function ListChaptersAssuntoComentario() {
    const [chaptersAssunto, setChaptersAssunto] = useState<ChapterAssuntoComentario[]>([]);
    useEffect(() => {setChaptersAssunto(obterChaptersAssuntoComentario())}, [])
    return(
        <VStack style={{paddingBottom: 8}}>
            {listarChaptersAssuntoComentario(chaptersAssunto)}
        </VStack>
    )
}

export default function Topico(){
    const navigation = useNavigation();
    const router = useRouter();
    const {title, descricao, autor, time} = useLocalSearchParams();

    return(
        <NativeBaseProvider>
            <ScrollView >
                <View style={{justifyContent: 'flex-start', alignItems: 'center', flex: 1}}>
                    <View style={styles.navBar}>
                        <Text style={styles.navItem}>Home</Text>
                        <Text style={styles.navItem}>Sobre</Text>
                        <Text style={styles.navItem}>Contato</Text>
                    </View>
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
                    <View style={{width:'100%'}}>
                        {ListChaptersAssuntoComentario()}
                    </View>
                    <View style={{width: '100%'}}>
                        <Card style={{marginLeft: '3%', marginRight: '3%', marginTop: 8, padding: 8}}>
                            <Text style={{color: 'grey', fontSize: 12, marginLeft: 8}}>Responder como user</Text>
                            <TextInput style={{backgroundColor: 'white'}} outlineColor='blue' multiline={true} mode='outlined' placeholder='Resposta'/>
                        </Card>
                    </View>
                    <Button onPress={() => navigation.goBack()}>Voltar</Button>
                </View>
            </ScrollView>
        </NativeBaseProvider>
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