import React from 'react';
import {Text,View,Button,StyleSheet} from 'react-native'
import {myContainer} from '../helpers/myStyles'
import { FAB,ActivityIndicator,Avatar } from 'react-native-paper';
import {connect} from 'react-redux'
import cityItinerariesAction from '../redux/actions/cityItinerariesAction'
class CityItineraries extends React.Component {
    
    componentDidMount(){
        if(this.props.itinerariesOfCity.length === 0){
            this.props.getItinerariesWithActivities(this.props.route.params.idCity)
        }
    }

    render(){
        const {navigation,loading,itinerariesOfCity} = this.props;
        console.log(this.props);

        if (loading) {
            return (
                <View style={myContainer.body}>
                    <ActivityIndicator color="rgb(12,173,12)" size={50} />
                </View>
            )
        }

        return (
            <View style={myContainer.body}>
                {itinerariesOfCity.map(itinerary=>{
                    return (
                        <Avatar.Image key={itinerary._id} size={24} source={{uri:itinerary.autorFotoHost}} />
                    )
                })}



                <FAB
                    style={styles.fab}
                    small = {false}
                    icon="magnify"
                    onPress={() => navigation.navigate("Cities")}
                />
                <Text>Hola este es CityItineraries</Text>
                <Button title="Go Itinerary! " onPress = {()=> navigation.navigate("Itinerary")}/>
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
        backgroundColor:"red"
    },
})

const mapStateToProps = (state) => {
    return {
        itinerariesOfCity : state.cityItinerariesReducer.itinerariesOfCity,
        loading : state.cityItinerariesReducer.loading
    }
}

const mapDispatchToProps = {
    getItinerariesWithActivities : cityItinerariesAction.getItinerariesWithActivities,
}


export default connect(mapStateToProps,mapDispatchToProps)(CityItineraries);

