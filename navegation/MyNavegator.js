import {createDrawerNavigator,DrawerContentScrollView,DrawerItem} from '@react-navigation/drawer'
import LogIn from '../pages/LogIn';
import SignUp from '../pages/SingUp';

import React from 'react'
import {StackCities} from './Stack'


import MyDrawerContent from './MyDrawerContent'
const drawerNavegator = createDrawerNavigator();

const MyNavegator = () => {
    return (
        //aqui creamos el navegador con el .Navigator, por defecto carga el primero siempre
        <drawerNavegator.Navigator drawerContent = { props=> <MyDrawerContent {...props} />}>
            <drawerNavegator.Screen name ="Cities"  component={StackCities} options={{title:"List of Cities"}}/> 
            <drawerNavegator.Screen name ="LogIn"  component={LogIn} options={{title:"Log In"}}/> 
            <drawerNavegator.Screen name ="SignUp"  component={SignUp} options={{title:"Sign Up"}}/>
            
        </drawerNavegator.Navigator>
    )
}

export default MyNavegator;