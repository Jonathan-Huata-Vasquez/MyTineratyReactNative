import React from 'react';
import { Text, View, Button } from 'react-native'
import { myContainer } from '../helpers/myStyles'
import Header from '../components/navbar/Header'
import Toast from 'react-native-toast-message';
class Home extends React.Component {

    render() {
        const { navigation } = this.props;
        return (

            <View style={myContainer.body}>
                <Header openDrawer={navigation.openDrawer} />
                <Text>Hola este es Home</Text>
                <Toast ref={(ref) => Toast.setRef(ref)} style={{zIndex:100}} />
                <Button title="Go CITIES! " onPress={() => {
                    navigation.navigate("Cities"); 
                    Toast.show({
                        text1: 'Hello',
                        text2: 'This is some something 👋'
                    });
                }} />
            </View>
        )
    }
};

export default Home;