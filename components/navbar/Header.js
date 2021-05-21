import * as React from 'react'; //sin esto no andan los componentes de react-native-paper
import { useState } from "react"
import { StyleSheet,View } from 'react-native'
import { Appbar } from 'react-native-paper';

const Header = ({openDrawer}) => {
    return (
        <>
        <Appbar style={styles.bottom}>
            <Appbar.Action icon="menu" onPress={() => openDrawer()} />
        </Appbar>
        <View style={styles.spacing}/>
        </>
    )
}
const styles = StyleSheet.create({
    bottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        
    },
    spacing:{
        width:"100%",
        height:30,
        marginBottom:30
    }
});


export default Header;