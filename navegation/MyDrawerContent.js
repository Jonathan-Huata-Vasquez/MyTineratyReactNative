import { Avatar, Title, Caption, Drawer } from 'react-native-paper'
import { StyleSheet, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { View, Text } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import React from 'react'
import { connect } from 'react-redux'
import authAction from '../redux/actions/authAction'

function DrawerContent(props) {
    const { navigation, userLogged } = props;
    return (

        <View style={{ flex: 1 }}>

            <DrawerContentScrollView {...props}>

                <View style={styles.drawerContent}>
                    <View style={styles.userInformation}>
                        <View style={{ flexDirection: "row", marginTop: 15, alignItems: "center" }}>

                            {userLogged
                                ?
                                <>
                                    <Avatar.Image size={50} source={{ uri: userLogged.usuarioAvatar }} />
                                    <View style={{ marginLeft: 15, flexDirection: "column" }}>
                                        <Title style={styles.title}>{userLogged.nombreCompleto}</Title>
                                        <Caption style={styles.caption}>{userLogged.email}</Caption>
                                    </View>
                                </>
                                :
                                <>
                                    <Image source={require('../assets/logoCompleto2.png')} style={{ width: 100, height: 100 }} resizeMode="contain" />
                                    <Title style={[styles.title, { marginLeft: 15 }]}>MyTinerary</Title>
                                </>
                            }

                        </View>
                    </View>
                </View>
                <Drawer.Section style={styles.drawerSection}>
                    {/*<DrawerItemIcon nameIcon="home-outline" label="Home" navigate={navigation.navigate} componentNameDestination="Home" />*/}
                    <DrawerItemIcon nameIcon="city-variant-outline" label="Cities" navigate={navigation.navigate} componentNameDestination="Cities" />
                    {!userLogged &&
                        <>
                            <DrawerItemIcon nameIcon="account" label="Log In" navigate={navigation.navigate} componentNameDestination="LogIn" />
                            <DrawerItemIcon nameIcon="account-plus" label="Sign Up" navigate={navigation.navigate} componentNameDestination="SignUp" />
                        </>
                    }
                </Drawer.Section>

            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottonDrawerSection}>
                {userLogged
                    && <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="exit-to-app"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Sign out"
                        onPress={() => {
                            props.signOutUser();
                            navigation.navigate("Cities");
                        }}
                    >
                    </DrawerItem>
                }

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
        flex: 1,
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

const DrawerItemIcon = ({ nameIcon, label, navigate, componentNameDestination }) => {

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

const mapStateToProps = (state) => {
    return {
        userLogged: state.authReducer.userLogged
    }
}

const mapDispatchToProps = {
    signOutUser: authAction.signOutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)