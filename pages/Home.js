import React from 'react';
import {Text,View,Button} from 'react-native'
import {myContainer} from '../helpers/myStyles'
import Header from '../components/navbar/Header'
class Home extends React.Component {

    render(){
        const {navigation} = this.props;
        return (

            <View style={myContainer.body}>
                <Header openDrawer={navigation.openDrawer}/>
                <Text>Hola este es Home</Text>
                <Button title="Go CITIES! " onPress = {()=> navigation.navigate("Cities")}/>
            </View>
        )
    }
};

export default Home;