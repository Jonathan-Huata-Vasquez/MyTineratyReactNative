import 'react-native-gesture-handler';
import React from 'react'
import {  StyleSheet, StatusBar } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper';
import { TextInput, DefaultTheme  } from 'react-native-paper';
import MyNavegator from './navegation/MyNavegator'
import { NavigationContainer} from '@react-navigation/native';

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
        <MyNavegator />
        
      </PaperProvider>
    </NavigationContainer>
  )


}
/*
<PaperProvider theme = {theme}>
      <View style={estilos.estiloCaja}> 
        <Text>holo v3 </Text> 
      </View>
      <TextInput
      label="Password"
      mode = "outlined"
      secureTextEntry
      right={<TextInput.Icon name="eye" />}
      />
    </PaperProvider>
*/
const estilos = StyleSheet.create({
  estiloCaja: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,

  },
  
})

export default App
