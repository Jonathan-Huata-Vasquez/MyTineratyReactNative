import React from 'react';
import { useState } from 'react'
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native'
import { Avatar, FAB, IconButton, Chip, TouchableRipple, } from 'react-native-paper'
import { myContainer } from '../helpers/myStyles'
import ImageView from "react-native-image-viewing";
import CommentUser from '../components/CommentUser'
import CommentNotTheUser from '../components/CommentNotTheUser'
import DismissKeyboard from '../components/DismissKeyboard'
import {connect} from 'react-redux'

const Itinerary = (props) => {
    const [stateImageView, setStateImageView] = useState({
        visible: false,
        index: 0
    });
    let itinerary = props.currentItinerary
    
    const images = itinerary.activities.map(activity => ({ uri: activity.imagenHost }));

    return (
        <ScrollView style={{ height: "90%", width: "100%" }}>
            <View style={[myContainer.body,]}>
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
                        <View style={styles.iconContainer}>
                            <Text style={styles.amount}>{itinerary.likes} </Text>
                            <IconButton
                                icon={itinerary.estaLikeado ? "cards-heart" : "heart-outline"}
                                color="#f50057"
                                size={23}
                                style={{ margin: 0, }}
                                onPress={() => console.log('Pressed')}
                            />
                        </View>
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

                <View style={{ height: 200 }}>
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
                                    <Image source={{ uri: activity.imagenHost }} style={styles.imagenActivity} />
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
                    <Text style={[styles.title, { textAlign: 'center' }]}>Leave a Comment</Text>
                    {itinerary.comentarios.map(comment=> (
                        comment.esModificable?  <CommentUser key={comment._id} idItinerary={itinerary._id} comment={comment}/>: <CommentNotTheUser key={comment._id} comment={comment}/>
                    ))}
                    
                    
                </View>
            </View>
        </ScrollView>
    )

};

const styles = StyleSheet.create({
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
        width: "90%"
    },
    
})
const mapStateToProps = (state)  => {
    return {
        currentItinerary: state.cityItinerariesReducer.currentItinerary
    }
}

export default connect(mapStateToProps)(Itinerary);