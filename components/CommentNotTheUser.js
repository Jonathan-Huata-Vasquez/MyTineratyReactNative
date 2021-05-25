import React from 'react';

import { Text, View, StyleSheet } from 'react-native'
import { Avatar, } from 'react-native-paper'


const CommentNotTheUser = ({comment}) => {
    
    return (
        <View style={styles.boxComment}>
            <View style={styles.headerComment}>
                <View style={styles.AvatarAndUserName}>
                    <Avatar.Image size={40} source={{uri:comment.usuarioId.usuarioAvatar}}></Avatar.Image>
                    <Text style={styles.userName}>{`${comment.usuarioId.nombre} ${comment.usuarioId.apellido}`}</Text>
                </View>
            </View>
            <View style={styles.bodyComment}>
                <Text style={styles.text}>{comment.comentario}</Text>
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
        color: "white",
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

export default CommentNotTheUser;