const initialState = {
    filteredCities: [],
    cities: [],
    loading: true,
    
}

const citiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOAD_CITIES":
            return {
                ...state,
                filteredCities: action.payload,
                cities: action.payload,
                loading: false
            }

        case "GET_FILTERED_CITIES":
            let newFilteredCities ;
            let inputValue = action.payload;
            if(inputValue === ""){
                newFilteredCities = state.cities;
            }else{
                newFilteredCities = state.cities.filter(city => {
                    return city.nombreCiudad.trim().toLowerCase().startsWith(action.payload.trim().toLowerCase());
                });
            }
            return {
                ...state,
                filteredCities: newFilteredCities
            } 
        default:
            return state;
           
    }
}

export default citiesReducer;