import React from 'react';
import { Text, View,  StyleSheet, Image } from 'react-native'
import {  Avatar, IconButton, TouchableRipple} from 'react-native-paper';
import FadeCarousel from "rn-fade-carousel";

const ItineraryWithOutComments = ({ itinerary , navigation }) => {
    const slides = itinerary.activities.map(activity => {
        return  <Image source={{uri:activity.imagenHost}} style={styles.imageActivity} resizeMode="cover" />
    })
    return (
        <TouchableRipple onPress = {()=>{navigation.navigate("Itinerary")}}>
        <View style={styles.itineraryContainer} >
            {/*<Image style={styles.imageActivity} source={{ uri: itinerary.activities[0].imagenHost }} />*/}
            <FadeCarousel
                    elements={slides}
                    containerStyle={styles.imageActivity}
                    fadeDuration={2000}
                    stillDuration={2000}
                    start={true}
                />
            
            <View style={styles.itineraryInfo}>
                <Avatar.Image size={50} source={{ uri: itinerary.autorFotoHost }} style={styles.avatar} />
                
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={styles.titleItinerary}>{itinerary.titulo}</Text>
                        <View style={styles.icon}>
                            <Text style={styles.textItinerary}>{itinerary.likes} </Text>
                            <IconButton
                                icon={itinerary.estaLikeado ? "cards-heart" : "heart-outline"}
                                color="#f50057"
                                size={17}
                                style={{ margin: 0,  }}
                                onPress={() => console.log('Pressed')}
                            />
                        </View>
                    </View>

                    <Text style={styles.textItinerary}>Author: {itinerary.autorNombre}</Text>
                    <View style={styles.iconsContainer}>

                        <View style={styles.icon}>
                            <Text style={styles.textItinerary}>Price:  </Text>
                            {[...Array(itinerary.precio)].map((element, indice) =>
                                <IconButton
                                    key={indice}
                                    icon="cash"
                                    color="#22bd22"
                                    size={20}
                                    style={{ margin: 0, padding: 0 }}
                                />)
                            }

                        </View>
                        <View style={styles.icon}>
                            <Text style={styles.textItinerary}>{itinerary.duracion} </Text>

                            <IconButton
                                icon="clock-time-four-outline"
                                color="rgb(72,144,226)"
                                size={17}
                                style={{ margin: 0, }}
                            />

                        </View>
                    </View>

                </View>
            </View>
        </View>
        </TouchableRipple>
    )
}

const styles = StyleSheet.create({
    
    itineraryContainer: {
        width: "90%",
        height: 200,
        marginTop: 20

    },
    imageActivity: {
        width: 350,
        height: 120,
        borderRadius:10
    },
    itineraryInfo: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "nowrap",
        flex: 1,
        alignItems: "center"
    },
    avatar: {
        marginRight: 10,
        alignSelf: 'center'

    },
    titleItinerary: {
        color: "white",
        fontSize: 17
    },
    textItinerary: {
        color: "rgb(187,185,185)"

    },
    icon: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

    },

    iconsContainer: {
        //width:"80%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
    }

})


export default ItineraryWithOutComments;