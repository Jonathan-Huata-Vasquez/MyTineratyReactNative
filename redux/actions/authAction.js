import { endpointUserLogIn, endpointUserSignUp, endpointUserLogInToken } from '../../helpers/endpoints'
import axios from 'axios';
import {toastMessageError500,showToastMessage} from '../../helpers/myToasts'

const authActions = {
    crearUsuario: (valoresInputs) => {
        return async (dispatch, getState) => {
            try {
                const { data } = await axios.post(endpointUserSignUp, valoresInputs)
                if (!data.success) {
                    return data.errores;
                }
                showToastMessage("success", `Welcome ${data.respuesta.nombreCompleto}`);
                dispatch({ type: "LOGUEAR_USER", payload: data.respuesta })
            }
            catch (err) {//error en la comunicacion con el backend
                console.log(err);
                toastMessageError500();
            }

        }
    },
    loguearUsuario: (usuario, history) => {
        return async (dispatch, getState) => {
            try {
                const { data } = await axios.post(endpointUserLogIn, usuario)
                if (!data.success) {
                    return data.error;
                }
                showToastMessage("success", `Welcome ${data.respuesta.nombreCompleto}`);
                dispatch({ type: "LOGUEAR_USER", payload: data.respuesta })

            } catch (err) {
                toastMessageError500();
            }

        }
    },

    logueoForzadoPorLS: (token, history) => {
        return async (dispatch, getState) => {
            try {
                const { data } = await axios.get(endpointUserLogInToken, {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                dispatch({
                    type: "LOGUEAR_USER", payload: {
                        ...data.respuesta,
                        token
                    }
                });
            }
            catch (err) {
                alert("Error 500 , please come back later")
                console.log(err)
                if (err.response && err.response.status === 401) {
                    alert("try harder next time")
                    localStorage.clear();
                    window.location.reload(true);
                    //history.push("/");
                }
                toastMessageError500();
                localStorage.clear();
            }
        }
    },
    desloguearUsuario: () => {
        return (dispatch, getState) => {
            showToastMessage("info", "Come back later ");
            dispatch({ type: "DESLOGUEAR_USER" })
        }
    }
}

export default authActions;
