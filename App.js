import React from 'react'
import { View, ScrollView, Text, StyleSheet, StatusBar } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper';
import { TextInput, DefaultTheme } from 'react-native-paper';
import Header from './components/navbar/Header'
import Login from './pages/Login'
import SignUp from './pages/SingUp'
//en native no existe html ni CSS

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgba(0,123,255,50)',
  },
};

const App = () => {
  return (
    <>
      <StatusBar />
      <PaperProvider theme={theme}>
        <Header />
        <View style={estilos.body}>
          {/*<Login />*/}
          <SignUp />
        </View>
      </PaperProvider>

    </>
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
  body: {
    backgroundColor: "#343a40",
    flex:1,
  }
})

export default App