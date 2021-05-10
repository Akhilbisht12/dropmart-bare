import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actionTypes from './User-Types';

const INITIAL_STATE = {
    profile : {
        
      },
    billing: {
        
      },
    shipping : [

    ]
    
}

const UserReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case actionTypes.ADD_USER : 
        return {
            ...state,
            profile: action.payload.user,
        }
        case actionTypes.ADD_BILLING : 
        return {
            ...state,
            billing: action.payload.billing,
        }
        case actionTypes.ADD_SHIPPING : 
        return {
            ...state,
            shipping : [...state.shipping, action.payload.shipping]
        }
        case actionTypes.DELETE_SHIPPING : 
        return {
            ...state,
            shipping : state.shipping.filter((item)=> item.id != action.payload.id)
        }

        case actionTypes.DELETE_USER : 
        console.log('user deleted')
        console.log(AsyncStorage.getItem('persist'))
        AsyncStorage.removeItem('persist:root')
        return INITIAL_STATE

        case actionTypes.EDIT_USER : 
        return { 
        ...state,
        billing : action.payload.user
        }
        default :
        return state
    }
}

export default UserReducer;