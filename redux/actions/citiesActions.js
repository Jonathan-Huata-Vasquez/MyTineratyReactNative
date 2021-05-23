import axios from "axios";
import {endpointCities} from '../../helpers/endpoints'
import {showToastMessage,toastMessageError500} from '../../helpers/myToasts'

const citiesAction = {
    getAllCities: () => {
        return async (dispatch,getState) =>{
            try {
                const {data} = await axios.get(endpointCities)
                dispatch({type: "LOAD_CITIES",payload: data.respuesta})    
            } catch (err) {
                console.log(err)
                toastMessageError500();
            }
            
        }  
    },
    getFilteredCities: (inputValue) => {
        return (dispatch,getState) => {
            dispatch({type:"GET_FILTERED_CITIES",payload:inputValue});
        }
    },
    
}

export default citiesAction;