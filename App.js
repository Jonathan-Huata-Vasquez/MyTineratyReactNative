import 'react-native-gesture-handler';
import React from 'react'
import { StyleSheet, StatusBar } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper';
import { TextInput, DefaultTheme, } from 'react-native-paper';
import MyNavegator from './navegation/MyNavegator'
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import { createStore, applyMiddleware } from 'redux'
import {  Provider as ProviderStore } from 'react-redux'
import thunk from 'redux-thunk'
import mainReducer from './redux/reducers/mainReducer'



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