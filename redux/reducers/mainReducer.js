import authReducer from "./authReducer"
import {combineReducers} from 'redux'
const mainReducer = combineReducers({
    //citiesReducer : citiesReducer,
    //cityItineraryReducer,
    authReducer
})


export default mainReducer;