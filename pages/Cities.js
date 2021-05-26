import React from 'react';
import { Text, View, Button, StyleSheet, Image, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { myContainer, myStyles } from '../helpers/myStyles';
import { FAB, ActivityIndicator, TextInput, TouchableRipple } from 'react-native-paper';
import { connect } from 'react-redux';
import citiesActions from '../redux/actions/citiesActions'
import cityItinerariesAction from '../redux/actions/cityItinerariesAction'
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DismissKeyboard from '../components/DismissKeyboard'

class Cities extends React.Component {

    componentDidMount() {
        if (this.props.stateCities.cities.length === 0) {
            this.props.getAllCities();
        }
        this.props.navigation.addListener("focus",()=>{
            this.props.clearItineraries();
        })
    }

    render() {
        const { navigation, stateCities } = this.props;
        const { mt_2, mt_3, mt_5, mx_3, m } = myStyles

        if (stateCities.loading) {
            return (
                <View style={myContainer.body}>
                    <ActivityIndicator color="red" size={50} />
                </View>
            )
        }

        return (
            <View style={myContainer.body}>
                <DismissKeyboard>
                    <TextInput
                        theme={{ colors: { primary: "red" } }}
                        label="Search your City"
                        style={[{ width: "80%", marginVertical: 10 }]}
                        onChangeText={(e) => this.props.getFilteredCities(e)}
                    />
                </DismissKeyboard>


                <View style={styles.filteredCitiesContainer}>

                    {stateCities.filteredCities.length === 0
                        ?
                        <View style={styles.cityNotFoundContainer}>
                            <ImageBackground source={require('../assets/CityNotFound.jpg')} style={styles.cityNotFoundBackgroundImage} imageStyle={{ borderRadius: 15 }}>
                                <View style={myContainer.container}>
                                    <Text style={{ fontSize: 25 }}>It seems that the city you are looking for is not yet ... Try another!</Text>
                                </View>
                            </ImageBackground>
                        </View>

                        : (
                            <ScrollView style={{ height: "90%" }}>
                                {stateCities.filteredCities.map(city => {
                                    return (
                                        <TouchableRipple
                                            key={city._id}
                                            onPress={() => navigation.navigate("CityItineraries", { idCity: city._id })}
                                        >
                                            <View style={[styles.filteredCityContainer, myContainer.backgroundMainColor]} >
                                                <Image style={styles.imageCity} source={{ uri: city.fotoHost }} />
                                                <View style={{ width: "30%" }}>
                                                    <Text style={styles.cityName}>{city.nombreCiudad}</Text>
                                                    <Text style={styles.countryName}>{city.pais}</Text>
                                                </View>
                                            </View>
                                        </TouchableRipple>
                                    )
                                })}
                            </ScrollView>
                        )
                    }
                </View>


               { <FAB
                    style={styles.fab}
                    small={false}
                    icon="menu"
                    onPress={() => navigation.openDrawer()}
               />}
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
        backgroundColor: "rgba(0,123,255,50)"
    },
    filteredCitiesContainer: {
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%"
    },
    filteredCityContainer: {
        flexDirection: 'row',
        justifyContent: "space-around",
        width: "97%",
        height: 100,
        backgroundColor: "white",
        marginTop: 20
    },
    imageCity: {
        width: "70%",
        height: "100%",
        borderRadius: 15,
        marginRight: 20
    },
    cityName: {
        fontSize: 16,
        color: "white"
    },
    countryName: {
        color: "grey"
    },
    cityNotFoundContainer: {
        width: "90%",
        height: "80%",
        borderRadius: 25,
    },
    cityNotFoundBackgroundImage: {
        height: 400,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',

    }


})

const mapStateToProps = (state) => {
    return {
        stateCities: state.citiesReducer
    }
}

const mapDispatchToProps = {
    getAllCities: citiesActions.getAllCities,
    getFilteredCities: citiesActions.getFilteredCities,
    clearItineraries : cityItinerariesAction.clearItineraries,
}



export default connect(mapStateToProps, mapDispatchToProps)(Cities);