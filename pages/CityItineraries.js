import React from 'react';
import {Text,View,Button,StyleSheet} from 'react-native'
import {myContainer} from '../helpers/myStyles'
import { FAB } from 'react-native-paper';
class CityItineraries extends React.Component {
    
    render(){
        const {navigation} = this.props;
        return (
            <View style={myContainer.body}>
                <FAB
                    style={styles.fab}
                    small = {false}
                    icon="magnify"
                    onPress={() => navigation.navigate("Cities")}
                />
                <Text>Hola este es CityItineraries</Text>
                <Button title="Go Itinerary! " onPress = {()=> navigation.navigate("Itinerary")}/>
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
        backgroundColor:"red"
    },
})
export default CityItineraries;