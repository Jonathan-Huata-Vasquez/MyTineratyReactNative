import React from 'react';
import { Text, View, Button, StyleSheet, Image, FlatList, ImageBackground } from 'react-native'
import { myContainer } from '../helpers/myStyles'
import { FAB, ActivityIndicator } from 'react-native-paper';
import { connect } from 'react-redux'
import cityItinerariesAction from '../redux/actions/cityItinerariesAction'
import FadeCarousel from "rn-fade-carousel";
import ItineraryWithOutComments from '../components/ItineraryWithOutComments'

class CityItineraries extends React.Component {

    componentDidMount() {
        if (this.props.itinerariesOfCity.length === 0) {
            this.props.getItinerariesWithActivities(this.props.route.params.idCity)
        }
        console.log(this.props.navigation)
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
            <ItineraryWithOutComments itinerary={item} navigation={navigation} />
        );
        return (
            <View style={[myContainer.body,{alignItems:'center'}]}>
                {itinerariesOfCity.length === 0
                    ?
                    <View style={styles.itineraryNotFoundContainer}>
                        <ImageBackground source={require('../assets/itinerarios/withOutOfItineraries.jpg')} style={styles.itinerariesNotFoundBackgroundImage} imageStyle={{ borderRadius: 15 }}>
                            <View style={myContainer.container}>
                                <Text style={{ fontSize: 25 }}>Sorry, we don't have any itinerary in this city yet :(</Text>
                            </View>
                        </ImageBackground>
                    </View>
                    :
                    <FlatList
                        data={itinerariesOfCity}
                        renderItem={renderItem}
                        keyExtractor={item => item._id}
                        style={{ width: "90%", height: "80%" }}
                        contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
                        extraData={navigation}
                    />
                }

                <FAB
                    style={styles.fab}
                    small={false}
                    icon="magnify"
                    onPress={() => navigation.navigate("Cities")}
                />
                
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
        marginTop: 20,

    },
    itinerariesNotFoundBackgroundImage: {
        height: "100%",
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        

    },
    itineraryNotFoundContainer: {
        width: "90%",
        height: "80%",
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },


})

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

