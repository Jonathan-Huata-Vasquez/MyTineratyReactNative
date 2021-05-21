import AsyncStorage from '@react-native-async-storage/async-storage';
import { showToastMessage } from '../../helpers/myToasts';

const inicialState ={
    userLogged : null,
}

const authReducer = (state = inicialState, action) =>{
    switch(action.type){
        case "LOG_IN_USER":
            AsyncStorage.setItem("token",JSON.stringify(action.payload.token))
            .catch(error  => {console.log(error); showToastMessage("error",error)});
            return {
                ...state,
                userLogged : action.payload  
            };
            

       /* case "LOG_OUT_USER":
            AsyncStorage.clear().catch(error  => {console.log(error); showToastMessage("error",error)});
            return {
                ...state,
                userLogged:null
            }*/
        default: 
            return state;
    }
}
export default authReducer;