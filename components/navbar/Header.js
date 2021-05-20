import * as React from 'react'; //sin esto no andan los componentes de react-native-paper
import { useState } from "react"
import { StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper';

const Header = () => {
    const [toogleDrawer, setToogleDrawer] = useState(false);
    function openCloseDrawer() {
        setToogleDrawer(!toogleDrawer)
    }
    return (

        <Appbar style={styles.bottom}>
            <Appbar.Action icon="menu" onPress={() => openCloseDrawer} />
        </Appbar>

    )
}
const styles = StyleSheet.create({
    bottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0
    },
});


export default Header;