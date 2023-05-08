import { useRouter } from "expo-router"
import {View, Text, StyleSheet} from "react-native"

export function navBar(){
    const router = useRouter()
    return(
        <View style={styles.navBar}>
            <Text style={styles.navItem} onPress={() => (router.push('Forum/TelaInicial'))}>Home</Text>
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
    }
})