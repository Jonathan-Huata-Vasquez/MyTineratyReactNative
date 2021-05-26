import {View,Text,Image,StyleSheet} from "react-native"
import {Avatar} from "react-native-paper"
import {connect} from 'react-redux'
import React from 'react'
const Logo = ({userLogged}) => {
    return (
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <Image style={styles.image} source={require("../assets/logoCompleto2.png")}/>
                <Text style={styles.text}>MyTinerary</Text>
            </View>
            {userLogged
            ?<Avatar.Image size={50} source={{ uri: userLogged.usuarioAvatar }} />
            :<Avatar.Image size={50} source={require("../assets/header/usuarioGenerico.png")} />
            }
            
            
        </View>
    )
}

const styles = StyleSheet.create({
    text:{
        color:"white",
        fontSize:15
    },
    container: {
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },
    image:{
        width:70,
        height:50
    },
    containerLogo:{
        
        flexDirection:"row",
        alignItems:"center",
    }
})
const mapStateToProps =(state) => {
    return {
        userLogged:state.authReducer.userLogged
    }
}

export default connect(mapStateToProps)(Logo)