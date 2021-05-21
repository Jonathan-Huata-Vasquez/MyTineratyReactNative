import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import LogIn from '../pages/LogIn';
import SignUp from '../pages/SingUp';
import React from 'react'

const bottomNavegator = createBottomTabNavigator();

const BottomTab = () => {
    return (
        //aqui creamos el navegador con el .Navigator, por defecto carga el primero siempre
        <bottomNavegator.Navigator>
            {/*Este sera un screen y le pasara por props los objetos navegation y routes */}
            <bottomNavegator.Screen name ="LogIn"  component={LogIn} options={{title:"Log In"}}/> 
            <bottomNavegator.Screen name ="SignUp"  component={SignUp} options={{title:"Sign Up"}}/>
            
            
        </bottomNavegator.Navigator>
    )
}

export default BottomTab;