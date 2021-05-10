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