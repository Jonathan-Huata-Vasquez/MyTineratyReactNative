import React from 'react';
import { useState } from 'react'
import { Text, View, StyleSheet, ScrollView, } from 'react-native'
import { Avatar, IconButton, Menu, Button, TextInput, ActivityIndicator, Modal, Portal } from 'react-native-paper'
import { myContainer } from '../helpers/myStyles'
import DismissKeyboard from '../components/DismissKeyboard'
import { connect } from 'react-redux';
import cityItinerariesActions from '../redux/actions/cityItinerariesAction'
import { showToastMessage, toastMessageError500 } from '../helpers/myToasts'


const CommentUser = ({ comment, idItinerary, userLogged, modifyComment }) => {
    const [visibleMenu, setVisibleMenu] = useState(false);
    const openMenu = () => setVisibleMenu(true);
    const closeMenu = () => setVisibleMenu(false);

    const [modeEditComment, setModeEditComment] = useState({
        visible: false,
        newComment: comment.comentario,
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
    const [loadingRequest, setLoadingRequest] = useState(false);
    const requestModifyComment = async (accion) => {
        if (!userLogged)
            return showToastMessage("info", "You must be logged in to comment it");
        let comentario;

        switch (accion) {
            case "editar":
                comentario = modeEditComment.newComment;
                break;
            case "borrar":
                hideModal();
                break;
            default:
                return console.log("unknown action " + accion)
        }
        setLoadingRequest(true);
        await modifyComment(idItinerary, userLogged.token, { idComentario: comment._id, comentario, accion })
        setLoadingRequest(false);
        if(accion === "editar")
            toggleModeEditComment();
    }



    const hideModal = () => setStateModal({ ...stateModal, visible: false });

    const [stateModal, setStateModal] = useState({
        visible: false,
        title: "",
        body: "",
        fAccept: null,
    })

    const showModalDeleteComment = (body) => {
        setStateModal({
            visible: true,
            title: "Are you sure you want to delete the comment ?",
            body,
        })
    }

    return (
        <View style={styles.boxComment}>
            <View style={styles.headerComment}>
                <View style={styles.AvatarAndUserName}>
                    <Avatar.Image size={40} source={{ uri: comment.usuarioId.usuarioAvatar }}></Avatar.Image>
                    <Text style={styles.userName}>{`${comment.usuarioId.nombre} ${comment.usuarioId.apellido}`}</Text>
                </View>
                {modeEditComment.visible
                    ?
                    <IconButton
                        icon="close-circle-outline"
                        color="red"
                        size={28}
                        style={{ margin: 0, }}
                        onPress={() => toggleModeEditComment()}
                        disabled={loadingRequest}
                    />
                    :loadingRequest
                        ? <ActivityIndicator size={28} color="red" />
                        :
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
                            <Menu.Item icon="delete" onPress={() => { showModalDeleteComment(comment.comentario); closeMenu() }} title="Delete" />
                        </Menu>
                }

            </View>
            <View style={styles.bodyComment}>
                {modeEditComment.visible
                    ? <DismissKeyboard>
                        <View style={{ flexDirection: "row", alignItems: "center", width: "100%" ,justifyContent:"space-between"}}>
                            <TextInput
                                style={[{ backgroundColor: "#343a40", width: "85%",height:30 }]}
                                theme={{ colors: { text: "rgb(187,185,185)", primary: "#3dff65" } }}
                                onChangeText={(e) => readInputEditComment(e)}
                                value={modeEditComment.newComment}
                                //onBlur={() => toggleModeEditComment()}
                                multiline={true}
                                autoFocus={modeEditComment.visible}
                            />
                            {loadingRequest
                                ?
                                <ActivityIndicator size={28} color="#3dff65" />
                                :
                                <IconButton
                                    icon="send"
                                    color="white"
                                    size={25}
                                    style={{ margin: 0, backgroundColor: "#3dff65" }}
                                    onPress={() => requestModifyComment("editar")}
                                />
                            }

                        </View>

                    </DismissKeyboard>
                    : <Text style={styles.text}>{comment.comentario}</Text>
                }

            </View>

            <Portal>
                <Modal visible={stateModal.visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
                    <Text style={styles.modalTitle}>{stateModal.title} </Text>
                    <Text style={styles.modalBody}>{stateModal.body}</Text>
                    <View style={{ marginTop: 30, flexDirection: "row", justifyContent: "space-around" }}>
                        <Button mode="contained" onPress={() => requestModifyComment("borrar")}>
                            Yes!
                         </Button>
                        <Button mode="contained" onPress={ hideModal} theme={{colors:{primary:"red"}}}>
                            Cancel
                        </Button>
                    </View>

                </Modal>
            </Portal>
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
        marginTop: 30,
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
    modal: {
        backgroundColor: 'white',
        padding: 20,
        width: "80%",
        alignSelf: "center",
        justifyContent:"flex-start"
    },
    modalTitle:{
        fontWeight:'bold',
        fontSize:20
    },
    modalBody:{
        fontSize:17,
        marginTop:10
    }
})

const mapStateToProps = (state) => {
    return {
        userLogged: state.authReducer.userLogged,
    }
}
const mapDispatchToProps = {
    modifyComment: cityItinerariesActions.modifyComment
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentUser);