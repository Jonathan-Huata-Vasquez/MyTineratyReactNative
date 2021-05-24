import React from 'react';
import { Text, View, Button, StyleSheet, Image, FlatList } from 'react-native'
import { myContainer } from '../helpers/myStyles'
import { FAB, ActivityIndicator, Avatar, IconButton } from 'react-native-paper';
import { connect } from 'react-redux'
import cityItinerariesAction from '../redux/actions/cityItinerariesAction'
class CityItineraries extends React.Component {

    componentDidMount() {
        if (this.props.itinerariesOfCity.length === 0) {
            this.props.getItinerariesWithActivities(this.props.route.params.idCity)
        }
    }


    createNComponents(n, component) {
        let aux = Array.from(new Array(n), (_, indice) => <View key={indice}>{component}</View>)
        return aux;
    }
    
    render() {
        const { navigation, loading, itinerariesOfCity } = this.props;

        if (loading) {
            return (
                <View style={myContainer.body}>
                    <ActivityIndicator color="rgb(12,173,12)" size={50} />
                </View>
            )
        }

        const renderItem = ({ item }) => (
        <Item itinerary={item} />
        );

        return (
            <View style={[myContainer.body]}>
                <FlatList
                    data={itinerariesOfCity}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    style={{width:"90%",height:"80%"}}
                    contentContainerStyle={{flexGrow:1,alignItems:"center"}}
                    
                />
                <FAB
                    style={styles.fab}
                    small={false}
                    icon="magnify"
                    onPress={() => navigation.navigate("Cities")}
                />
                <Text>Hola este es CityItineraries</Text>
                <Button title="Go Itinerary! " onPress={() => navigation.navigate("Itinerary")} />
            </View>
        )
    }
};

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: "red"
    },
    itineraryContainer: {
        width: "90%",
        height: 200,
        borderColor: "grey",
        borderWidth: 1,
        marginTop: 20

    },
    imageActivity: {
        width: 350,
        height: 120,
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
        alignSelf:'center'

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

const Item = ({ itinerary }) => (
    <View style={styles.itineraryContainer} >
        <Image style={styles.imageActivity} source={{ uri: itinerary.activities[0].imagenHost }} />
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
                            style={{ margin: 0, marginRight: 10 }}
                            onPress={() => console.log('Pressed')}
                        />
                    </View>
                </View>

                <Text style={styles.textItinerary}>Author: {itinerary.autorNombre}</Text>
                <View style={styles.iconsContainer}>

                    <View style={styles.icon}>
                        <Text style={styles.textItinerary}>Price:  </Text>
                        {[...Array(itinerary.precio)].map((element,indice) =>
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
                            style={{ margin: 0, marginRight: 10 }}
                        />

                    </View>
                </View>

            </View>
        </View>
    </View>
)

const mapStateToProps = (state) => {
    return {
        itinerariesOfCity: state.cityItinerariesReducer.itinerariesOfCity,
        loading: state.cityItinerariesReducer.loading
    }
}

const mapDispatchToProps = {
    getItinerariesWithActivities: cityItinerariesAction.getItinerariesWithActivities,
}


export default connect(mapStateToProps, mapDispatchToProps)(CityItineraries);

