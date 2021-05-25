
import React from 'react'
import { useState } from 'react';
import { connect } from 'react-redux'
import {IconButton} from 'react-native-paper'
import {View,Text} from 'react-native'
import { showToastMessage, toastMessageError500 } from '../helpers/myToasts';
import cityItineraryActions from '../redux/actions/cityItinerariesAction'
const BtnLike = ({itinerary,userLogged,likeItinerary}) => {
    const [stateLike, setStateLike] = useState({
        isLiked:itinerary.estaLikeado,
        numberOfLikes:itinerary.likes
    })
    const [loadingRequest, setLoadingRequest] = useState(false);

    const likear = async () => {
        if (!userLogged) {
            return showToastMessage("info", "You must be logged in to like it");
        }
        if (loadingRequest) return false
        setLoadingRequest(true);
        let lastState = { ...stateLike }
        console.log(stateLike)
        setStateLike({
            ...stateLike,
            numberOfLikes: stateLike.isLiked ? stateLike.numberOfLikes-1 : stateLike.numberOfLikes+1,
            isLiked: !stateLike.isLiked,
        })
         console.log(stateLike)
        let response;
        try {
            response = await likeItinerary(userLogged.token, itinerary._id);
            if (!response.success) setStateLike(lastState)
            setLoadingRequest(false)

        } catch (e) {
            console.log(e)
            toastMessageError500();
        }

    }

    return (
        <View style={{flexDirection: "row",justifyContent: 'center',}}>
            <Text style={{color: "white",fontSize: 23,}}>{stateLike.numberOfLikes} </Text>
            <IconButton
                icon={stateLike.isLiked ? "cards-heart" : "heart-outline"}
                color="#f50057"
                size={23}
                style={{ margin: 0, }}
                onPress={() => likear()}
            />
        </View>
        
    )
}



const mapStateToProps = (state) => {
    return {
        userLogged: state.authReducer.userLogged,
        itinerary: state.cityItinerariesReducer.currentItinerary,
    }
}
const mapDispatchToProps = {
    likeItinerary: cityItineraryActions.likeItinerary
}

export default connect(mapStateToProps, mapDispatchToProps)(BtnLike);