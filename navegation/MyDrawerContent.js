import { Avatar, Title, Caption, Drawer } from 'react-native-paper'
import { SafeAreaView, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { View } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import React from 'react'
export default function DrawerContent(props) {
    const  {navigation} = props;
    return (
        <View style={{ flex: 1, backgroundColor: "" }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInformation}>
                        <View style={{ flexDirection: "row", marginTop: 15 ,alignItems:"center"}}>
                            <Avatar.Image size={50} source={require('../assets/header/usuarioGenerico.png')} />
                            <View style={{ marginLeft: 15, flexDirection: "column" }}>
                                <Title style={styles.title}>FirstName LastName</Title>
                                <Caption style={styles.caption}>user@gamil.com</Caption>
                            </View>
                        </View>
                    </View>
                </View>
                <Drawer.Section style={styles.drawerSection}>
                    <DrawerItemIcon nameIcon="home-outline" label="Home" navigate = {navigation.navigate} componentNameDestination="Home"/>
                    <DrawerItemIcon nameIcon="city-variant-outline" label="Cities" navigate = {navigation.navigate} componentNameDestination="Cities"/>
                    <DrawerItemIcon nameIcon="account" label="Log In" navigate = {navigation.navigate} componentNameDestination="LogIn"/>
                    <DrawerItemIcon nameIcon="account-plus" label="Sign Up" navigate = {navigation.navigate} componentNameDestination="SignUp"/>
                </Drawer.Section>

            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottonDrawerSection}>
                <DrawerItemIcon nameIcon="exit-to-app" label="Sign Out" navigate = {navigation.navigate} componentNameDestination="Home"/>
            </Drawer.Section>
        </View>
    );
}
const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInformation: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: "bold",
    },
    caption: {
        fontSize: 14,
        lineHeight: 14
    },
    row: {
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center"
    },
    section: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 15,
    },
    paragraph: {
        fontWeight: "bold",
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15
    },
    bottonDrawerSection: {
        marginBottom: 15,
        borderTopColor: "#f4f4f4",
        borderWidth: 1
    },
    preference: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 16
    }
})

const DrawerItemIcon = ({ nameIcon, label,navigate, componentNameDestination  }) => {
    return (
        <DrawerItem
            icon={({ color, size }) => (
                <Icon
                    name={nameIcon}
                    color={color}
                    size={size}
                />
            )}
            label={label}
            onPress={() => navigate(componentNameDestination)}
        >
        </DrawerItem>
    )
}