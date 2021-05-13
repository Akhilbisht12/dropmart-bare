import React, { useState } from 'react'
import { View, Text, TextInput, Dimensions, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Axios from 'axios'
import Loader from '../../Components/Loader'
const {width, heigth} = Dimensions.get('window')

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setloading] = useState(false);

    const handleForgotPassword = () => {
        setloading(true)
        Axios.post('https://www.dropmarts.com//wp-json/wp/v2/users/lost-password',{
            user_login : email
        })
        .then(response=>{
            setloading(false)
            alert(response.data.messsage)
            console.log(response.data.message)
        })
    }

    if(loading) return <Loader/>
    return (
        <View style={{flex : 1, justifyContent : 'space-evenly', alignItems : 'center'}}>
            <Ionicons name='lock-open' size={100} color='#c60607'/>
            <View style={{display : 'flex',alignItems : 'center'}}>
                <Text style={{fontSize : 30, fontWeight : 'bold', marginVertical : 10}}>Forgot Password</Text>
                <Text style={{fontSize : 20, textAlign : 'center', marginVertical : 10, width : width-40}}>Enter your registered email address, you will soon receive an password reset link</Text>
                <TextInput
                value={email}
                onChangeText={setEmail}
                style={{width : width - 40, borderWidth : 1, height : 40, borderRadius : 5, borderColor : '#c60607', marginVertical : 10}}
                />
            </View>
            <TouchableOpacity onPress={()=>handleForgotPassword()} style={{backgroundColor : '#c60607', width : width-60, paddingVertical : 7, borderRadius : 5}}>
                <Text style={{fontSize : 20, textAlign : 'center', color : 'white'}}>Send Link</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ForgotPassword
