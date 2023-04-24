import { StyleSheet, View } from "react-native";
import { useNavigation } from 'expo-router';
import { Card, Text, TextInput, Title, Button } from "react-native-paper";
import { NativeBaseProvider, ScrollView } from "native-base";




export default function CriarTopico(){
    const navigation = useNavigation();
    return(
        <NativeBaseProvider>
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems:'center'}}>
                <View style={styles.navBar}>
                    <Text style={styles.navItem}>Home</Text>
                    <Text style={styles.navItem}>Sobre</Text>
                    <Text style={styles.navItem}>Contato</Text>
                </View>
                <ScrollView style={{width: '100%'}}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Title>Faça sua Pergunta</Title>
                        <Card style={styles.card}>
                            <Card.Title title='Titulo' style={{minHeight: 20}}/>
                            <Card.Content>
                                <TextInput mode="outlined" placeholder="Titulo" style={{backgroundColor: 'white'}}></TextInput>
                            </Card.Content>
                        </Card>
                        <Card style={styles.card}>
                            <Card.Title title='Chapter' style={{minHeight: 20}}/>
                            <Card.Content>
                                <TextInput mode="outlined" placeholder="Chapter" style={{backgroundColor: 'white'}}></TextInput>
                            </Card.Content>
                        </Card>
                        <Card style={styles.card}>
                            <Card.Title title='Descricao' style={{minHeight: 20}}/>
                            <Card.Content>
                                <TextInput mode="outlined" placeholder="Descricao" style={{backgroundColor: 'white'}}></TextInput>
                            </Card.Content>
                        </Card>
                        <Card style={styles.card}>
                            <Card.Title title='Adicionar Arquivo' style={{minHeight: 20}}/>
                            <Card.Content>
                                <TextInput mode="outlined" placeholder="Adicionar Arquivo" style={{backgroundColor: 'white'}}></TextInput>
                            </Card.Content>
                        </Card>
                        <Card style={styles.card}>
                            <Card.Title title='Tags' style={{minHeight: 20}}/>
                            <Card.Content>
                                <TextInput mode="outlined" placeholder="Tags" style={{backgroundColor: 'white'}}></TextInput>
                            </Card.Content>
                        </Card>
                        <View style={{marginTop: 16, marginBottom: 8}}>
                            <Button mode="contained" style={{backgroundColor: '#1981CD'}} labelStyle={{width: 150}} onPress={() => console.log()}>Perguntar</Button>
                        </View>
                    </View>
                </ScrollView>
            </View>
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
        paddingTop: 8,
        width: '94%'
    }
})