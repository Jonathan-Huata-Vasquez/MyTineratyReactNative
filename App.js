import 'react-native-gesture-handler';
import React from 'react'
import {  StyleSheet, StatusBar } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper';
import { TextInput, DefaultTheme  } from 'react-native-paper';
import MyNavegator from './navegation/MyNavegator'
import { NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
//en native no existe html ni CSS
const themePaper = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgba(0,123,255,50)',
  },
};



const App = () => {
  return (
    //dotamos una navegacion  a nuestra aplicacion , independientemente del tipo
    <NavigationContainer >
      <StatusBar />
      <PaperProvider theme={themePaper}>
        <Toast ref={(ref) => Toast.setRef(ref)} style={{zIndex:2}} />
        <MyNavegator />
      </PaperProvider>
    </NavigationContainer>
  )


}

const estilos = StyleSheet.create({
  estiloCaja: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,

  },
  
})

export default App
