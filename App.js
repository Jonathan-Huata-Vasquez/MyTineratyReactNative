import 'react-native-gesture-handler';
import React from 'react'
import { StyleSheet, StatusBar } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper';
import { TextInput, DefaultTheme, } from 'react-native-paper';
import MyNavegator from './navegation/MyNavegator'
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import { createStore, applyMiddleware } from 'redux'
import { connect, Provider as ProviderStore } from 'react-redux'
import thunk from 'redux-thunk'
import mainReducer from './redux/reducers/mainReducer'

import authAction from './redux/actions/authAction'
import AsyncStorage from '@react-native-async-storage/async-storage';

const myStore = createStore(mainReducer, applyMiddleware(thunk))

//en native no existe html ni CSS
const themePaper = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgba(0,123,255,50)',
  },
};


const App = (props) => {

  /*AsyncStorage.getItem("token")
    .then(token => {
      if (!props.userLogged && token && token !== "undefined") {
        forcedLogIn(JSON.parse(token))
      }
    })
    .catch(err => console.log(err))
*/
  return (
    //dotamos una navegacion  a nuestra aplicacion , independientemente del tipo
    <ProviderStore store={myStore}>
      <NavigationContainer >

        <StatusBar />
        <PaperProvider theme={themePaper}>
          <Toast ref={(ref) => Toast.setRef(ref)} style={{ zIndex: 2 }} />
          <MyNavegator />
        </PaperProvider>
      </NavigationContainer>
    </ProviderStore>
  )

}

/*const mapStateToProps = (state) => {
  return {
    userLogged: state.authReducer.userLogged
  }
}
const mapDispatchToProps = {
  forcedLogIn: authAction.forcedLogIn
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
*/
export default App