import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Product from './Product';


export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" backgroundColor='#F49741' />
             <Product />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
