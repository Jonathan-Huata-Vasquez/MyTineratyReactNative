import authReducer from "./authReducer"
import citiesReducer from './citiesReducer'
import cityItinerariesReducer from './cityItinerariesReducer'
import {combineReducers} from 'redux'
const mainReducer = combineReducers({
    citiesReducer ,
    cityItinerariesReducer,
    authReducer
})


export default mainReducer;