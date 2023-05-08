import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TelaForum from './Forum/TelaInicial';
import Topico from './Forum/Topico';
import Perguntar from './Forum/Perguntar';
import { UserContext } from '../src/context/UserContext'
import { _layout } from './_layout';


const Stack = createNativeStackNavigator();

export default function home(){

    return(
        <_layout>
            <Topico/>
            <Stack.Navigator initialRouteName='forum' screenOptions={{headerShown: false}}>
                <Stack.Group>
                    <Stack.Screen name='forum' component={TelaForum}/>
                    <Stack.Screen name='topico' component={Topico}/>
                    <Stack.Screen name='perguntar' component={Perguntar}/>
                </Stack.Group>
            </Stack.Navigator>
        </_layout>
    )
}