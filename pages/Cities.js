import React from 'react';
import { Text, View, Button,StyleSheet } from 'react-native'
import { myContainer } from '../helpers/myStyles'
import { FAB } from 'react-native-paper';
class Cities extends React.Component {

    render() {
        const { navigation } = this.props;
        return (
            <View style={myContainer.body}>
                <FAB
                    style={styles.fab}
                    small = {false}
                    icon="home-outline"
                    onPress={() => navigation.navigate("Home")}
                />
                <Text>Hola este es Cities</Text>
                <Button title="Go CityItineraries!" onPress={() => navigation.navigate("CityItineraries")} />
            </View>
        )
    }
};



const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor:"rgba(0,123,255,50)"
    },
})

export default Cities;