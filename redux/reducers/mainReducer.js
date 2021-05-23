import authReducer from "./authReducer"
import citiesReducer from './citiesReducer'
import {combineReducers} from 'redux'
const mainReducer = combineReducers({
    citiesReducer ,
    //cityItineraryReducer,
    authReducer
})


export default mainReducer;