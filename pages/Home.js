import React from 'react';
import { Text, View, Button } from 'react-native'
import { myContainer } from '../helpers/myStyles'
import Header from '../components/navbar/Header'
import authAction from '../redux/actions/authAction'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux'
class Home extends React.Component {



    render() {
        AsyncStorage.getItem("token")
            .then(token => {
                if (!this.props.userLogged && token && token !== "undefined") {
                    this.props.forcedLogIn(JSON.parse(token))
                }
            })
            .catch(err => console.log(err))

        const { navigation } = this.props;
        return (

            <View style={myContainer.body}>
                <Header openDrawer={navigation.openDrawer} />
                <Text>Hola este es Home</Text>

                <Button title="Go CITIES! " onPress={() => {
                    navigation.navigate("Cities");
                }} />
            </View>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        userLogged: state.authReducer.userLogged
    }
}
const mapDispatchToProps = {
    forcedLogIn: authAction.forcedLogIn
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
