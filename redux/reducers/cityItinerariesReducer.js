const initialState = {
    itinerariesOfCity: [],
    loading: true,
}

const cityItineraryReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case "LOAD_ITINERARIES_WITH_ACTIVITIES":
            return {
                ...state,
                itinerariesOfCity: action.payload,
                loading: false
            }
       /* case "ERROR_CARGAR_ITINERARIOS":
            return {
                ...state,
                loading: false,
            }*/
        /*case "ACTUALIZAR_ITINERARIO":
            let itinerariosActualizados = state.itinerariesOfCity.map(itinerario =>{
                if(itinerario._id === action.payload._id)
                    return action.payload;
                return itinerario;
            })
            return {
                ...state,
                itinerariesOfCity: itinerariosActualizados
            } 
        case "RESTAURAR_ITINERARIOS":
            return initialState;*/
        default:
            return state;
    }
}

export default cityItineraryReducer;