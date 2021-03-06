import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, Linking, ToastAndroid, Alert } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeArea } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import WooCommerce from '../../Components/WooCommerce';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../Components/Loader'
import { connect } from 'react-redux';
import { addBilling, addUser } from '../../Redux/User/User-Action';
import Axios from 'axios';

const Login = ({navigation,addUser, addBilling, route}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] =useState(false)

   useEffect(() => {
       if(route.params?route.params.parent==='logout':false){
            navigation.addListener('beforeRemove', (e)=>{
                e.preventDefault();
            })
        }
   }, [navigation])

    const handleLogin = () => {
        setLoading(true)
        WooCommerce.get("customers",{email})
        .then((wooresponse) => {
            if(wooresponse.length!==0){
                Axios.post('https://dropmarts.com/wp-json/jwt-auth/v1/token', {
                    username : email,
                    password : password
                    })
                .then(response=>{
                    addUser({
                        id: wooresponse[0].id,
                        email: email,
                        first_name: wooresponse[0].first_name,
                        last_name: wooresponse[0].last_name,
                        token : response.data.token,
                        username: email,
                        })
                        console.log(wooresponse[0].billing)
                    addBilling(wooresponse[0].billing)
                    setLoading(false);
                    navigation.navigate('Home')
                })
                .catch(err=>{
                    ToastAndroid.show('You have entered the wrong password', ToastAndroid.SHORT)
                    setLoading(false)
                })
            }else{
                ToastAndroid.show('No Such Registered Email Found', ToastAndroid.SHORT)
                setLoading(false)
            }
        })
        .catch((error) => {
            ToastAndroid.show(error, ToastAndroid.SHORT)
        });
        
    }

    if(loading){
        return <Loader/>
    }else{
        return (
            <View style={styles.main}>
                <View style={{alignItems :'center'}}>
                    <Ionicons name='book' color={'#c60607'} size={50}/>
                    <Text style={styles.headText}>Welcome Back</Text>
                    <Text>Sign in to continue</Text>
                </View>
                <View>
                    <TextInput value={email} onChangeText={(text)=>setEmail(text)} placeholder='Email' placeholderTextColor='grey' style={styles.input}/>
                    <TextInput value={password} onChangeText={(text)=>setPassword(text)} placeholder='Password' placeholderTextColor='grey' style={styles.input}/>
                    <TouchableOpacity onPress={()=>navigation.navigate('ForgotPassword')}>
                        <Text style={{textAlign : 'right', color : '#c60607'}}>Forgot Password</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <View>
                        <TouchableOpacity style={[styles.btn,{backgroundColor : '#c60607'}]} onPress={handleLogin}>
                            <Text style={{color : 'white', textAlign :'center'}}>Sign In</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn,{borderWidth : 1, borderColor : '#c60607'}]} onPress={()=>navigation.navigate('PhoneAuth')}>
                            <Text style={{color : '#c60607', textAlign :'center'}}>Login With Phone Number</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection : 'row', justifyContent : 'center', marginTop : 10}}>
                        <Text>Don't have an account?</Text>
                        <TouchableOpacity onPress={()=>navigation.navigate('Signup')}>
                            <Text style={{color : '#c60607'}}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main : {
        flex : 1,
        justifyContent : 'space-evenly',
        alignItems : 'center'
    },
    headText : {
        fontSize : 35,
        fontWeight : 'bold'
    },
    input : {
        borderWidth : 1,
        borderColor : 'lightgrey',
        width : Dimensions.get('window').width - 50,
        marginVertical : 10,
        paddingHorizontal : 20,
        paddingVertical : 5,
        borderRadius : 5
    },
    btn : {
        width : Dimensions.get('window').width - 50,
        paddingVertical : 10,
        borderRadius : 5,
        marginVertical : 5
    }
})

const mapDispatchToProps = (dispatch) =>{
    return {
        addUser : (user)=>dispatch(addUser(user)),
        addBilling : (user) => dispatch(addBilling(user))
    }
}

export default connect(null, mapDispatchToProps)(Login);