import AsyncStorage from '@react-native-async-storage/async-storage';
import { showToastMessage } from '../../helpers/myToasts';

const inicialState ={
    usuarioLogueado : null,
}

const authReducer = (state = inicialState, action) =>{
    switch(action.type){
        case "LOG_IN_USER":

            AsyncStorage.setItem("token",JSON.stringify(action.payload.token))
            .catch(error  => {console.log(error); showToastMessage("error",error)})
            return {
                ...state,
                usuarioLogueado : action.payload  
            };
        case "LOG_OUT_USER":
            localStorage.clear();
            return {
                ...state,
                usuarioLogueado:null
            }
        default: 
            return state;
    }
}
export default authReducer;