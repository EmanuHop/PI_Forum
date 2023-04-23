import { Button, NativeBaseProvider } from "native-base";
import {View, Text} from "react-native"
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router'
import { ChapterAssunto } from "../../src/model/ChapterAssunto";

export default function Topico(){
    const navigation = useNavigation();
    const router = useRouter();
    const {Title, descricao} = useLocalSearchParams();

    return(
        <NativeBaseProvider>
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Button onPress={() => navigation.goBack()}>Voltar</Button>
            <Text>{Title}</Text>
            <Text>{descricao}</Text>
            </View>
        </NativeBaseProvider>
    )
}