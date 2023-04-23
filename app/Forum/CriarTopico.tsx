import {NativeBaseProvider, Button} from 'native-base'
import { View } from "react-native";
import { useNavigation } from 'expo-router';




export default function CriarTopico(){
    const navigation = useNavigation();
    return(
        <NativeBaseProvider>
            <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
                <Button onPress={() => navigation.goBack()}>Voltar</Button>
            </View>
        </NativeBaseProvider>
    )
}