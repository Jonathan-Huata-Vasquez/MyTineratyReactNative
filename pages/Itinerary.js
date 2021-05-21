import React from 'react';
import {Text,View} from 'react-native'
import {myContainer} from '../helpers/myStyles'

class Itinerary extends React.Component {
    render(){
        return (
            <View style={myContainer.body}>
                <Text>Hola este es Itinerary</Text>
            </View>
        )
    }
};

export default Itinerary;