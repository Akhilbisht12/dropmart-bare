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

        case actionTypes.UPDATE_SHIPPING : 
        let newShip = [...state.shipping]
        newShip[action.payload.key] = action.payload.updateShip
        console.log(state.shipping[action.payload.key]);
        return {
            ...state,
            shipping : newShip
        }
        
        case actionTypes.DELETE_SHIPPING : 
        return {
            ...state,
            shipping : state.shipping.filter((item)=> item.id!= action.payload.id)
        }

        case actionTypes.DELETE_USER : 
        console.log('user deleted')
        return INITIAL_STATE

        case actionTypes.EDIT_USER : 
        return { 
        ...state,
        billing : action.payload.user
        }
        case actionTypes.EDIT_BILLING : 
        const temp = action.payload.billing
        console.log(temp)
        const newBill = {...state.billing}
        newBill.first_name = temp.first_name
        newBill.last_name = temp.last_name
        newBill.email = temp.email
        newBill.phone = temp.phone
        newBill.address_2 = temp.address_2
        newBill.address_1 = temp.address_1
        newBill.city = temp.city

        return { 
        ...state,
        billing : newBill
        }
        case actionTypes.EDIT_SENDER :
            const newprofile = {...state.profile};
            newprofile.first_name = action.payload.first_name;
            newprofile.last_name = action.payload.last_name; 
        return { 
        ...state,
        profile : newprofile
        }

        case actionTypes.EDIT_PHONE :
            const newbilling = {...state.billing};
            newbilling.phone = action.payload.phone;
        return { 
        ...state,
        billing : newbilling
        }

        default :
        return state
    }
}

export default UserReducer;