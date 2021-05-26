import {createStackNavigator} from '@react-navigation/stack' ;
import LogIn from '../pages/LogIn';
import SignUp from '../pages/SingUp';
import Home from '../pages/Home'
import Cities from '../pages/Cities'
import CityItineraries from '../pages/CityItineraries'
import Itinerary from '../pages/Itinerary'
import Logo from "../components/Logo"
import React from 'react'
//creamos una cte que  sea una instancia del stack navigator para poder crear el navegador y otras cosas mas
const stackNavegator = createStackNavigator();

const styleHeader = (title,color) =>{
    return {
        headerTitle: props => <Logo  />,
        headerStyle: {
            backgroundColor: color,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            color:"white"
        },
    }
}

export const StackCities = () => {
    return (
        //aqui creamos el navegador con el .Navigator, por defecto carga el primero siempre
        <stackNavegator.Navigator>
            {/*Este sera un screen y le pasara por props los objetos navegation y routes */}
            <stackNavegator.Screen name ="Cities"  component={Cities} options={styleHeader("","red")} /> 
            <stackNavegator.Screen name ="CityItineraries"  component={CityItineraries} options={styleHeader("Itineraries of City","rgb(187,134,49)")}/> 
            <stackNavegator.Screen name ="Itinerary"  component={Itinerary} options={styleHeader("Itinerary of ...","rgb(12,173,12)")}/>
        </stackNavegator.Navigator>
    )
}

