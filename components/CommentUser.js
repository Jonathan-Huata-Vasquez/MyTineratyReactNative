import React from 'react';
import { useState } from 'react'
import { Text, View, StyleSheet, ScrollView, } from 'react-native'
import { Avatar, IconButton, Menu, Button, TextInput, ActivityIndicator } from 'react-native-paper'
import ImageView from "react-native-image-viewing";
import { myContainer } from '../helpers/myStyles'
import DismissKeyboard from '../components/DismissKeyboard'

const CommentUser = ({comment}) => {
    const [visibleMenu, setVisibleMenu] = useState(false);
    const openMenu = () => setVisibleMenu(true);
    const closeMenu = () => setVisibleMenu(false);

    const [modeEditComment, setModeEditComment] = useState({
        visible: false,
        newComment: comment.comentario,
        loadingRequest: false,
    });
    const toggleModeEditComment = () => {
        setModeEditComment({
            ...modeEditComment,
            visible: !modeEditComment.visible
        })
    };

    const readInputEditComment = (newComment) => {
        setModeEditComment({
            ...modeEditComment,
            newComment
        })
    }
    /*const leerInputEditar = (e) => {
        setComentarioAEditar({
            ...comentarioAEditar,
            nuevoComentario: e.target.value
        })
    }*/
    return (
        <View style={styles.boxComment}>
            <View style={styles.headerComment}>
                <View style={styles.AvatarAndUserName}>
                    <Avatar.Image size={40} source={{uri:comment.usuarioId.usuarioAvatar}}></Avatar.Image>
                    <Text style={styles.userName}>{`${comment.usuarioId.nombre} ${comment.usuarioId.apellido}`}</Text>
                </View>

                <Menu
                    visible={visibleMenu}
                    onDismiss={closeMenu}
                    style={{ marginTop: 15, }}
                    anchor={
                        <IconButton
                            icon="dots-vertical"
                            color="rgb(187,185,185)"
                            size={28}
                            style={{ margin: 0, right: 1, top: 3 }}
                            onPress={openMenu}
                        />}
                >
                    <Menu.Item icon="pencil" onPress={() => { toggleModeEditComment(); closeMenu() }} title="Edit" />
                    <Menu.Item icon="delete" onPress={() => { }} title="Delete" />
                </Menu>
            </View>
            <View style={styles.bodyComment}>
                {modeEditComment.visible
                    ? <DismissKeyboard>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TextInput
                                style={[{ backgroundColor: "#343a40",width:"90%" }]}
                                theme={{ colors: { text: "rgb(187,185,185)", primary: "#3dff65" } }}
                                onChangeText={(e) => readInputEditComment(e)}
                                value={modeEditComment.newComment}
                                onBlur={() => toggleModeEditComment()}
                                multiline={true}
                                autoFocus={modeEditComment.visible}
                            />
                            {modeEditComment.loadingRequest
                                ?
                                <ActivityIndicator size={28} color="#3dff65" />
                                :
                                <IconButton
                                    icon="send"
                                    color="white"
                                    size={28}
                                    style={{ margin: 0, backgroundColor: "#3dff65" }}
                                    onPress={() => console.log(modeEditComment.newComment)}
                                />
                            }

                        </View>

                    </DismissKeyboard>
                    : <Text style={styles.text}>{comment.comentario}</Text>
                }

            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    text: {
        color: "rgb(187,185,185)",
        fontSize: 15,

    },

    boxComment: {
        width: "100%",
        marginTop:30,
    },
    headerComment: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        position: "relative"
    },
    AvatarAndUserName: {
        flexDirection: "row",
        alignItems: 'center'
    },
    userName: {
        color: "#3dff65",
        fontSize: 15,
        marginLeft: 15,
        fontWeight: "bold",
        maxWidth: "70%"
    },
    bodyComment: {
        width: "100%",
        marginTop: 10
    },
})

export default CommentUser;