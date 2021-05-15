import * as actionTypes from './User-Types';

export const addUser = (user) =>{
    return {
        type : actionTypes.ADD_USER,
        payload : {
            user
        }
    }
} 

export const addBilling = (billing) =>{
    return {
        type : actionTypes.ADD_BILLING,
        payload : {
            billing
        }
    }
} 

export const addShipping = (shipping) =>{
    return {
        type : actionTypes.ADD_SHIPPING,
        payload : {
            shipping
        }
    }
} 

export const updateShipping = (temp,index) =>{
    console.log(index)
    return {
        type : actionTypes.UPDATE_SHIPPING,
        payload : {
            updateShip : temp,
            key : index
        }
    }
} 

export const deleteShipping = (id) =>{
    return {
        type : actionTypes.DELETE_SHIPPING,
        payload : {
            id
        }
    }
} 

export const deleteUser = () =>{
    return {
        type : actionTypes.DELETE_USER,
        payload : {
            
        }
    }
}

export const editUser = (user) => {
    return {
        type : actionTypes.EDIT_USER,
        payload : {
            user
        }
    }
}

export const editSender = ({first_name, last_name}) => {
    return {
        type : actionTypes.EDIT_SENDER,
        payload : {
            first_name,
            last_name
        }
    }
}

export const editPhone = (phone) => {
    return {
        type : actionTypes.EDIT_PHONE,
        payload : {
            phone
        }
    }
}

export const editBilling = (billing) => {
    return {
        type : actionTypes.EDIT_BILLING,
        payload : {
            billing
        }
    }
}