const initialState = {
    itinerariesOfCity: [],
    currentItinerary:null,
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
        case "UPDATE_ITINERARY":
            
            let itinerariesUpdated = state.itinerariesOfCity.map(itinerary =>{
                if(itinerary._id === action.payload._id){
                    const activities  = itinerary.activities;
                    console.log("asi se ve espredeado",{...action.payload,})
                    return {
                        ...action.payload,
                        activities
                    }
                }
                return itinerary;
            })

            let updatedCurrentItinerary = state.currentItinerary;
            if(state.currentItinerary._id === action.payload._id)
                updatedCurrentItinerary = {...state.currentItinerary,...action.payload}
            return {
                ...state,
                itinerariesOfCity: itinerariesUpdated,
                currentItinerary: updatedCurrentItinerary
            } 
        case "SET_CURRENT_ITINERARY":
            let newCurrentItinerary = state.itinerariesOfCity.find(itinerary => itinerary._id === action.payload)
            
            return {
                ...state,
                currentItinerary:{...state.currentItinerary,...newCurrentItinerary}
            }

        case "CLEAR_ITINERARY_OF_CITY":
            return initialState;
        default:
            return state;
    }
}

export default cityItineraryReducer;