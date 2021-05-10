import React from 'react'
import { View, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
const Rating = ({rating}) => {
    for(var i=0;i<rating;i++){
        return(
            <Ionicons name='star' color='darkyellow' size={20}/>
        )
    }
}

export default Rating
