import { endpointUserLogIn, endpointUserSignUp, endpointUserLogInToken } from '../../helpers/endpoints'
import axios from 'axios';
import {toastMessageError500,showToastMessage} from '../../helpers/myToasts'
import AsyncStorage from '@react-native-async-storage/async-storage';

const authActions = {
    signUpUser: (inputsValues) => {
        return async (dispatch, getState) => {
            try {
                const { data } = await axios.post(endpointUserSignUp, inputsValues)
                if (!data.success) {
                    return data.errores;
                }
                showToastMessage("success", `Welcome ${data.respuesta.nombreCompleto}`);
                dispatch({ type: "LOG_IN_USER", payload: data.respuesta })
            }
            catch (err) {//error en la comunicacion con el backend
                console.log(err);
                toastMessageError500();
            }

        }
    },
    logInUser: (user) => {
        return async (dispatch, getState) => {
            try {
                const { data } = await axios.post(endpointUserLogIn, user)
                if (!data.success) {
                    return data.error;
                }

                showToastMessage("success", `Welcome ${data.respuesta.nombreCompleto}`);
                dispatch({ type: "LOG_IN_USER", payload: data.respuesta })

            } catch (err) {
                console.log(err)
                toastMessageError500();
            }

        }
    },

    forcedLogIn: (token) => {
        return async (dispatch, getState) => {
            try {
                const { data } = await axios.get(endpointUserLogInToken, {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                dispatch({
                    type: "LOG_IN_USER", payload: {
                        ...data.respuesta,
                        token
                    }
                });
            }
            catch (err) {
                toastMessageError500();
                console.log(err)
                if (err.response && err.response.status === 401) {
                    showToastMessage("error","try harder next time")
                }
                AsyncStorage.clear().catch(error => console.log(error))
                
            }
        }
    },
    
    signOutUser: () => {
        return (dispatch, getState) => {
            showToastMessage("info", "Come back later ");
            dispatch({ type: "LOG_OUT_USER" })
        }
    }
}

export default authActions;
