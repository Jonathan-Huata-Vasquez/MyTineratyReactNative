import React from 'react';
import { useState } from 'react'
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native'
import { Avatar, FAB, IconButton, Chip, TouchableRipple, TextInput, ActivityIndicator, Card, Title } from 'react-native-paper'
import { myContainer } from '../helpers/myStyles'
import ImageView from "react-native-image-viewing";
import CommentUser from '../components/CommentUser'
import CommentNotTheUser from '../components/CommentNotTheUser'
import DismissKeyboard from '../components/DismissKeyboard'
import { connect } from 'react-redux'
import cityItinerariesAction from '../redux/actions/cityItinerariesAction'
import BtnLike from '../components/BtnLike'


const Itinerary = ({ itinerary, userLogged, modifyComment, navigation }) => {
    const [stateImageView, setStateImageView] = useState({
        visible: false,
        index: 0
    });
    const [loadingRequest, setLoadingRequest] = useState(false)
    const [inputSend, setInputSend] = useState("")

    if (!itinerary){
        navigation.navigate("Cities")
        return null  
    } 

    const images = itinerary.activities.map(activity => ({ uri: activity.imagenHost }));

    const requestSendComment = async () => {
        if (!userLogged)
            return showToastMessage("info", "You must be logged in to comment it");
        let comentario = inputSend;
        setLoadingRequest(true);
        let success = await modifyComment(itinerary._id, userLogged.token, { comentario, accion: "agregar" })
        if (success) setInputSend("")
        setLoadingRequest(false);
    }



    return (
        < >
            <ScrollView style={{ height: "90%", width: "100%" }} >
                <View style={[myContainer.body, { paddingBottom: 80 }]}>

                    <View style={styles.infoItinerary}>
                        <View style={{ width: "25%" }}>
                            <Avatar.Image size={85} source={{ uri: itinerary.autorFotoHost }} style={{ width: 85, height: 85, }} />
                        </View>
                        <View style={{ marginLeft: 10, width: "70%" }}>
                            <Text style={styles.title}>{itinerary.titulo}</Text>
                            <Text style={styles.author}>by: {itinerary.autorNombre}</Text>
                        </View>

                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", width: "100%", marginTop: 10 }}>
                        <View>
                            <BtnLike />
                            <Text style={styles.textInfoIcon}>Likes</Text>
                        </View>
                        <View>
                            <View style={styles.iconContainer}>
                                <Text style={styles.amount}>{itinerary.precio} </Text>
                                <IconButton
                                    icon="cash"
                                    color="#3dff65"
                                    size={23}
                                    style={{ margin: 0, }}
                                    onPress={() => console.log('Pressed')}
                                />
                            </View>
                            <Text style={styles.textInfoIcon}>Price</Text>
                        </View>
                        <View>
                            <View style={styles.iconContainer}>
                                <Text style={styles.amount}>{itinerary.duracion} </Text>
                                <IconButton
                                    icon="clock-time-four-outline"
                                    color="rgb(72,144,226)"
                                    size={23}
                                    style={{ margin: 0, }}
                                />
                            </View>
                            <Text style={styles.textInfoIcon}>Duration</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: "space-around", marginTop: 20, width: "80%" }}>
                        {itinerary.hashTags.map(hashTag => <Chip key={hashTag} mode="outlined" >{hashTag}</Chip>)}
                    </View>

                    <View style={{ height: 300 }}>
                        <ScrollView horizontal={true} style={{ marginTop: 20 }}>
                            {itinerary.activities.map((activity, index) => {
                                return (
                                    <TouchableRipple key={activity._id} onPress={() => {
                                        setStateImageView({
                                            ...stateImageView,
                                            index,
                                            visible: true
                                        })
                                    }}>
                                        <View style={{width:350 ,marginHorizontal:10,alignItems:'center'}}>
                                        <View style={styles.headerCard}>
                                                    <IconButton
                                                        icon="star"
                                                        color="#ffff00"
                                                        size={23}
                                                        style={{ margin: 0, }}
                                                    />
                                                    <Text style={styles.titleActivity}>{activity.titulo}</Text>
                                                </View>
                                        {<Image source={{ uri: activity.imagenHost }} style={styles.imagenActivity} />}
                                        </View>
                                    </TouchableRipple>
                                )
                            })}
                        </ScrollView>
                        <ImageView
                            images={images}
                            imageIndex={stateImageView.index}
                            visible={stateImageView.visible}
                            onRequestClose={() => setStateImageView({ ...stateImageView, visible: false })}
                        />
                    </View>
                    <View style={styles.containerBoxComments}>
                        <Text style={[styles.title, { textAlign: 'center', backgroundColor: "#4caf50", width: "100%", borderRadius: 15 }]}>Leave a Comment</Text>
                        <ScrollView style={styles.scrollViewComments} nestedScrollEnabled={true}>

                            {itinerary.comentarios.map(comment => (
                                comment.esModificable ? <CommentUser key={comment._id} idItinerary={itinerary._id} comment={comment} /> : <CommentNotTheUser key={comment._id} comment={comment} />
                            ))}
                        </ScrollView>

                        <DismissKeyboard>
                            <View style={{ flexDirection: "row", alignItems: "center", width: "100%", justifyContent: "space-between", marginTop: 40 }}>
                                <TextInput
                                    style={[{ width: "85%", height: 50 }]}
                                    theme={{ colors: { primary: "#4caf50" } }}
                                    onChangeText={(e) => setInputSend(e)}
                                    value={inputSend}
                                    //onBlur={() => toggleModeEditComment()}
                                    multiline={true}
                                    placeholder={userLogged ? "Leave your comment here" : "You must be logued to comment it"}
                                    disabled={userLogged ? false : true}

                                />
                                {loadingRequest
                                    ?
                                    <ActivityIndicator size={40} color="#3dff65" />
                                    :
                                    <IconButton
                                        icon="send"
                                        color="white"
                                        disabled={userLogged ? false : true}
                                        size={28}
                                        style={{ margin: 0, backgroundColor: "#3dff65" }}
                                        onPress={() => requestSendComment()}
                                    />
                                }
                            </View>

                        </DismissKeyboard>
                    </View>


                </View>
            </ScrollView>
            <FAB
                style={styles.fab}
                small={false}
                icon="magnify"
                onPress={() => navigation.navigate("Cities")}
            />
        </>
    )

};

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: "red"
    },
    infoItinerary: {
        flexDirection: "row",
        marginLeft: 30,
        width: "100%",
        flexWrap: "nowrap",
        alignItems: 'center'
    },
    title: {
        width: "90%",
        fontSize: 35,
        color: "white",
    },
    author: {
        color: "rgb(187,185,185)",
        fontSize: 17,
    },
    amount: {
        color: "white",
        fontSize: 23,

    },
    text: {
        color: "rgb(187,185,185)",
        fontSize: 15,
    },
    textInfoIcon: {
        color: "rgb(187,185,185)",
        fontSize: 15,
        textAlign: "center"
    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: 'center',

    },
    scrollHorizontal: {
        marginLeft: 30,
        height: 200
    },

    imagenActivity: {
        width: 350,
        height: 200,
        marginHorizontal: 10
    },
    containerBoxComments: {
        marginTop: 20,
        alignItems: "center",
        width: "90%",

        height: 400

    },
    scrollViewComments: {
        marginTop: 10,
        height: 200,
        width: "100%",
        borderTopColor: "grey"
    },
    titleActivity: {
        color: "white",
        fontSize: 20,
        textAlign: 'center'
    },
    headerCard: {
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        width:"100%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: "#1a237e",
        borderColor: "#0091ea",
        borderWidth: 2
    }

})
const mapStateToProps = (state) => {
    return {
        itinerary: state.cityItinerariesReducer.currentItinerary,
        userLogged: state.authReducer.userLogged
    }
}
const mapDispatchToProps = {
    modifyComment: cityItinerariesAction.modifyComment
}

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);