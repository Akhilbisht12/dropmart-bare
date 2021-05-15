import React from 'react'
import { View, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
const Rating = ({rating}) => {
    
        return(
            <View style={{flexDirection : 'row'}}>
                <Ionicons name='star' color={rating>=1?'#ffd700':'grey'} size={20}/>
                <Ionicons name='star' color={rating>=2?'#ffd700':'grey'} size={20}/>
                <Ionicons name='star' color={rating>=3?'#ffd700':'grey'} size={20}/>
                <Ionicons name='star' color={rating>=4?'#ffd700':'grey'} size={20}/>
                <Ionicons name='star' color={rating>=5?'#ffd700':'grey'} size={20}/>
            </View>
            
        )
}

export default Rating
