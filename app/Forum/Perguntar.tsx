import { useContext, useState } from 'react'
import { Alert, StyleSheet, View } from "react-native";
import { useRouter } from 'expo-router';
import { Card, Text, TextInput, Title, Button, Modal, Portal, Provider, IconButton} from "react-native-paper";
import { Input, InputGroup, InputLeftAddon, NativeBaseProvider, ScrollView, Select } from "native-base";
import MultiSelect from 'react-native-multiple-select';
import { ChapterAssunto } from '../../src/model/ChapterAssunto';
import { obterTags } from '../../src/service/tagService';
import { faker } from '@faker-js/faker';
import { adicionarChapterAssunto, obterChaptersAssunto } from '../../src/service/ChapterAssuntoService';
import { Tag } from '../../src/model/Tag';
import moment from 'moment';
import { navBar } from '../../src/components/navBar';
import { UserContext } from '../../src/context/UserContext';

export default function Perguntar(){
    const router = useRouter();

    const user = useContext(UserContext);

    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const [selectedTags, setSelectedTags] = useState<string[]>([])

    function onSelectedItemsChange(selectedItems: string[]): void {
        setSelectedTags(selectedItems);
    };

    function convertTags(nomeTag: string[]){
        let tags: Tag[] = []
        nomeTag.map((nTag) => obterTags().map(oTag => {
            if(oTag.nome==nTag){
                tags.push(oTag);
            }
        }))
        return(tags);
    }

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('')
    
    function criarTopico(): void{
        let assunto: ChapterAssunto = {
            id: faker.datatype.number(100000),
            key: obterChaptersAssunto().length +1,
            title: titulo,
            description: descricao,
            author: user,
            tags: convertTags(selectedTags),
            time: moment().utcOffset('-03:00').format('DD/MM/YYYY'),
            views: 0,
            comments: 0,
            like: 0,
            unlike: 0,
            respondida: false
        }
        adicionarChapterAssunto(assunto);
        router.push({ pathname: 'Forum/Topico', params: { title: assunto.title, descricao: assunto.description, autor: assunto.author, time: assunto.time } })
    }

    return(
    <Provider>
        <NativeBaseProvider>
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems:'center'}}>
                {navBar()}
                <ScrollView style={{flex: 1, width: '100%'}}>
                    <View style={{alignItems: 'center'}}>
                        <Title style={{marginTop: 10}}>Faça sua Pergunta</Title>
                        {/* titulo */}
                        <Card style={styles.card}>
                            <Card.Title title='Titulo' style={{minHeight: 20}}/>
                            <Card.Content>
                                <TextInput onChangeText={setTitulo} mode="outlined" placeholder="Titulo" style={{backgroundColor: 'white'}}></TextInput>
                            </Card.Content>
                        </Card>
                        
                        {/* tag */}
                        <Card style={styles.card}>
                            <View style={styles.cardTitle}>
                                <Text style={{fontSize: 16, }}>Tags: </Text>
                                <Button mode='text' onPress={showModal} labelStyle={{color: 'blue'}}>Adicionar Tags</Button>
                            </View>
                            <Card.Content>
                                    <InputGroup borderColor='gray.400' borderWidth={1}>
                                        <InputLeftAddon color='blue' borderWidth={0} children={"Tags:"} />
                                        <Input fontSize={16} borderWidth={0} borderLeftWidth={1} borderColor='gray.400' borderRadius={0} isReadOnly={true} value={selectedTags.toString()} backgroundColor='white'  w={{ base: "85%", md: "100%" }} />
                                    </InputGroup>
                            </Card.Content>
                        </Card>
                        <Portal>        
                            <Modal visible={visible} onDismiss={hideModal}>
                                <Card style={styles.card}>
                                    <Card.Title title='Tags' style={{minHeight: 20}}/>
                                    <Card.Content>
                                        <MultiSelect displayKey="nome" items={obterTags()} uniqueKey='nome' selectedItems={selectedTags} onSelectedItemsChange={onSelectedItemsChange} />
                                    </Card.Content>
                                </Card>
                            </Modal>
                        </Portal>
                        
                        {/* chapter */}
                        <Card style={styles.card}>
                            <Card.Title title='Chapter' style={{minHeight: 20}}/>
                            <Card.Content>
                                <Select placeholder='chapter' style={{backgroundColor: 'white'}}>
                                    <Select.Item label='chapter 2021.1n' value='1'/>
                                    <Select.Item label='chapter 2021.2n' value='2'/>
                                    <Select.Item label='chapter 2022.1n' value='3'/>
                                </Select>
                            </Card.Content>
                        </Card>
                        {/* descricao */}
                        <Card style={styles.card}>
                            <Card.Title title='Descricao' style={{minHeight: 20}}/>
                            <Card.Content>
                                <TextInput mode="outlined" onChangeText={setDescricao} placeholder="Descricao" style={{backgroundColor: 'white'}}></TextInput>
                            </Card.Content>
                        </Card>
                        
                        {/* adicionar arquivo */}
                        <Card style={styles.card}>
                            <View style={styles.cardTitle}>
                                <Text style={{fontSize: 16, }}>Adicionar arquivo: </Text>
                                <IconButton icon='file-plus' iconColor='blue' size={24} />
                            </View>
                            <Card.Content>
                                <InputGroup backgroundColor='white' borderColor='gray.400' borderWidth={1}>
                                    <InputLeftAddon borderWidth={0} children={<IconButton icon='file' size={24} />} style={{paddingBottom: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0}} />
                                    <Input fontSize={16} borderWidth={0} borderLeftWidth={1} borderColor='gray.400' borderRadius={0} isReadOnly={true} backgroundColor='white'  w={{ base: "70%" }} />
                                </InputGroup>
                            </Card.Content>
                        </Card>
                        <View style={{marginTop: 16, marginBottom: 8}}>
                            <Button mode="contained" style={{backgroundColor: '#1981CD'}} labelStyle={{width: 150}} onPress={() => ((titulo.trim().length == 0 || descricao.trim().length == 0)?Alert.alert('Erro', 'Titulo e descricao nao podem estar vazios!'):criarTopico())}>Perguntar</Button>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </NativeBaseProvider>
    </Provider>
    )
}

const styles = StyleSheet.create({
    card: {
        marginLeft: '3%',
        marginRight: '3%',
        marginTop: '5%',
        paddingTop: 8,
        width: '94%'
    },
    cardTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 16,
    }
})