import { Button, StyleSheet, View } from 'react-native';

export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <Button
                title="Bản đồ"
                onPress={() => {
                    navigation.navigate('Map');
                }}
            />
            <Button
                title="DashBoard"
                onPress={() => {
                    navigation.navigate('DashBoard');
                }}
            />
            <Button
                title="Giám sát"
                onPress={() => {
                    navigation.navigate('Supervision');
                }}
            />
            <Button
                title="Phân công"
                onPress={() => {
                    navigation.navigate('Assignment');
                }}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
});
