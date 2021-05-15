import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions, Linking } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeArea } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import WooCommerce from '../../Components/WooCommerce';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../Components/Loader'
import { connect } from 'react-redux';
import { addBilling, addUser } from '../../Redux/User/User-Action';
import Axios from 'axios';

const Login = ({navigation,addUser, addBilling}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] =useState(false)

    // const handleLogin = () => {
    //     setLoading(true)
    //     WooCommerce.get("customers", {
    //         email : email
    //     })
    //     .then((response) => {
    //     console.log(response);
    //     if(response.length === 0){
    //         alert('No User Found')
    //         setLoading(false)
    //     }else if(response.data){
    //         if(response.data.status === 400){
    //             alert('Invalid Email')
    //             setLoading(false)
    //         }
    //     }else if(response[0].billing.company){
    //         if(response[0].billing.company === password){
    //             addUser(response[0]);
    //             AsyncStorage.setItem('user', JSON.stringify(response[0]))
    //             .then((res)=>{
    //                 navigation.navigate('Home');
    //             })
    //             setLoading(false)
    //         }else{
    //             alert('Invalid Password')
    //             setLoading(false)
    //         }
    //     }
    //     })
    //     .catch((error) => {
    //     console.log(error);
    //     });
    // }

    const handleLogin = () => {
        setLoading(true)
        Axios.post('https://dropmarts.com/wp-json/jwt-auth/v1/token', {
            username : email,
            password : password
        })
        .then(response=>{
              WooCommerce.get("customers",{email})
                .then((wooresponse) => {
                    console.log(wooresponse)
                    addUser({
                        id: wooresponse[0].id,
                        email: email,
                        first_name: wooresponse[0].first_name,
                        last_name: wooresponse[0].last_name,
                        token : response.data.token,
                        username: email,
                      })
                    addBilling(wooresponse[0].billing)
                })
                .catch((error) => {
                    console.log(error.response);
            });
        })
        .catch(err=>{
            alert(err.message)
        })
        .then(()=>{
            setLoading(false)
            navigation.navigate('Home')
        })
        
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