import axios from "axios";
import {endpointCities,endpointActivitiesItinerary,
    endpointItinerariesLike,endpointItinerariesWithActivities,endpointItinerariesWithActivitiesLogged,
    endpointItinerariesModificarComentario} from "../../helpers/endpoints"
import {showToastMessage,toastMessageError500} from '../../helpers/myToasts'

const cityItinerariesActions = {
    getItinerariesWithActivities : (idCity)=>{
        return async (dispatch,getState)  => {
            let userLogged = getState().authReducer.userLogged;
            try{
                const endpoint = userLogged ? endpointItinerariesWithActivitiesLogged :endpointItinerariesWithActivities;
                let header = userLogged && {headers:{'Authorization': 'Bearer ' + userLogged.token}}
                
                const {data} = await axios.get(`${endpoint}/${idCity}`,header)
                
                dispatch({type : "LOAD_ITINERARIES_WITH_ACTIVITIES",payload: data.respuesta})
            }
            catch(err){
                console.log(err)
                toastMessageError500();
                //dispatch({type : "ERROR_CARGAR_CIUDAD", payload:null})
            }
        }
    },
    loadCity : (idCity)=>{
        return  async () => {
            try{
                let {data} = await axios.get(`${endpointCities}/${idCity}`)
                if(data.success){
                    return data.respuesta;}
                else{
                    showToastMessage("error",data.error);
                }
            }catch(e){
                toastMessageError500()
            }
            
        }
    },
    clearItineraries: ()=>{
        return (dispatch,getState) =>{
            dispatch({type:"CLEAR_ITINERARY_OF_CITY",payload:null});
        }
    },
    /*
    likearItinerario : (token,idItinerario) => {
        return async (dispatch,getState) => {
            try{
                const {data} = await axios.get(`${endpointItinerariesLike}/${idItinerario}`,{
                    headers:{'Authorization': 'Bearer ' + token}
                })
                dispatch({type:"ACTUALIZAR_ITINERARIO",payload:data.respuesta})
                return {success :true}
            }catch(e){
                console.log(e);
                toastMessageError500();
                return {success :false}    
            }
        }
    },
    modificarComentario : (idItinerario,token,body) => {
        const {idComentario,comentario,accion} = body;

        return async (dispatch) =>{
            try{
                let {data} = await axios.put(`${endpointItinerariesModificarComentario  }/${idItinerario}`,{idComentario,comentario,accion},{
                    headers:{
                        'Authorization': 'Bearer ' + token,    
                    }
                });
                
                data.success
                ? dispatch({type:"ACTUALIZAR_ITINERARIO",payload:data.respuesta}) 
                : showToastMessage("error",data.error);
                return data.success;
                
            }catch(e){
                console.log(e);
                toastMessageError500();
            }   
        }
    },*/
    

}
export default cityItinerariesActions;