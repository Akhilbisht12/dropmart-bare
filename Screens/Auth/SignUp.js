import React, { useState } from 'react';
import { Dimensions, ScrollView, StatusBar, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WooCommerce from '../../Components/WooCommerce';
import Loader from '../../Components/Loader';
import Axios from 'axios';
import { connect } from 'react-redux';
import { addBilling, addUser } from '../../Redux/User/User-Action';

const {width, height} = Dimensions.get('window')

 const SignUp = ({navigation, addUser, addBilling}) => {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [first_name, set_first_name] = useState('');
     const [last_name, set_last_name] = useState('');
     const [confirm_password, set_confirm_password] = useState('');
     const [landmark, setLandmark] = useState('');
     const [mobile, setMobile] = useState('');
     const [next, setNext] = useState(true);
     const [loading, setLoading] = useState(false);

    const handleSignUp = () => {
        if(password!==confirm_password){
            ToastAndroid.show('Passwords dont match', ToastAndroid.SHORT)
        }else if(email && password && confirm_password && first_name && last_name){
            setLoading(true)
            Axios.post('https://dropmarts.com/wp-json/wp/v2/users/register', {
                username : email,
                email,
                password
            })
            .then(response=>{
                WooCommerce.get("customers", {email})
                .then((wooget) => {
                    WooCommerce.put(`customers/${wooget[0].id}`, {first_name, last_name, billing : {first_name, last_name}})
                        .then(responsePut=>{
                            console.log(responsePut.billing)
                            Axios.post('https://dropmarts.com/wp-json/jwt-auth/v1/token', {
                                username : email,
                                password : password
                            })
                            .then(response=>{
                                addUser({
                                    id: wooget[0].id,
                                    email: email,
                                    first_name: first_name,
                                    last_name: last_name,
                                    token : response.data.token,
                                    username: email,
                                })
                                addBilling(responsePut.billing)
                                setLoading(false);
                                navigation.navigate('Home')
                            })
                        })
                    })
            })
            .catch(err=>{
                ToastAndroid.show('User already registered with this email')
                setLoading(false)
            })
        }else{
            ToastAndroid.show('Fill Out Details', ToastAndroid.SHORT)
        }
    }

    if(loading){
        return <Loader/>
    }else{
        return(
            <ScrollView style={{flex : 1}}>
                <View style={styles.main}>
                    <View style={{alignItems : 'center'}}>
                        <Ionicons name='book' color={'#c60607'} size={50}/>
                        <Text style={{fontSize : 40}}>Welcome</Text>
                        <Text>Sign Up to continue</Text>
                    </View>
                    <View>
                        <View style={{flexDirection : 'row', justifyContent : 'space-evenly'}}>
                            <TextInput style={[styles.input,{width : width*0.4}]} placeholder='First Name' placeholderTextColor={'grey'} value={first_name} 
                            onChangeText={set_first_name}/>
                            <TextInput style={[styles.input,{width : width*0.44}]} placeholder='Last Name' placeholderTextColor={'grey'} value={last_name} 
                            onChangeText={set_last_name}/>
                        </View>
                        <TextInput textContentType='emailAddress' style={[styles.input,{width : width-50}]} placeholder='Enter Email' placeholderTextColor={'grey'} value={email} 
                        onChangeText={(text)=>setEmail(text)}/>

                        <TextInput placeholderTextColor={'grey'} style={[styles.input,{width : width-50}]} placeholder='Enter Password'
                        value={password} onChangeText={(text)=>setPassword(text)}/>
                        <TextInput placeholderTextColor={'grey'} style={[styles.input,{width : width-50}]} placeholder='Confirm Password'
                        value={confirm_password} onChangeText={set_confirm_password}/>
                    </View>
                    <View>
                        <TouchableOpacity style={[styles.btn,{backgroundColor : '#c60607'}]} onPress={()=>{handleSignUp()}}>
                            <Text style={{color : 'white'}}>Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn,{borderWidth : 1, borderColor : '#c60607'}]} onPress={()=>navigation.navigate('PhoneAuth')}>
                            <Text style={{color : '#c60607'}}>Login in with Phone Number</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{flexDirection : 'row'}} onPress={()=>navigation.navigate('Login')}>
                        <Text>Already have a account?</Text>
                        <Text style={{color : '#c60607', fontWeight : 'bold'}}> Sign In</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    } 
        // else {
        //     return(
        //         <View style={styles.main}>
        //             <View style={styles.pad}>
        //                 <Text style={{fontSize : 30 }}>Fill Details For Your Orders</Text>
        //                 <TextInput placeholderTextColor={'grey'} style={styles.input} placeholder='Full Name' value={name} 
        //                     onChangeText={(text)=>setName(text)}/>
        //                 <TextInput placeholderTextColor={'grey'} style={styles.input} placeholder='Flat, House no' value={flat} 
        //                     onChangeText={(text)=>setFlat(text)}/>
        //                 <TextInput placeholderTextColor={'grey'} style={styles.input} placeholder='Area, Colony, Street Name' value={street} 
        //                     onChangeText={(text)=>setStreet(text)}/>
        //                 <TextInput placeholderTextColor={'grey'} style={styles.input} placeholder='Landmark' value={landmark} 
        //                     onChangeText={(text)=>setLandmark(text)}/>
        //                 <TextInput placeholderTextColor={'grey'} style={styles.input} placeholder='Mobile Number' value={mobile} 
        //                     onChangeText={(text)=>setMobile(text)}/>
        //                 <TouchableOpacity style={styles.btn} onPress={handleSignUp}>
        //                     <Text style={{color : 'white', textAlign : 'center' }}>Sign Up</Text>
        //                 </TouchableOpacity>
        //             </View>
        //         </View>
        //     )
        // }
 }

 const styles = StyleSheet.create({
     main : {
         flex : 2,
         justifyContent : 'space-evenly',
         alignItems : 'center',
         marginTop : StatusBar.currentHeight,
         marginBottom : StatusBar.currentHeight,
         height : height-100
     },
     input : {
         borderWidth : 1,
         borderColor : 'lightgrey',
         marginVertical : 5,
         paddingHorizontal : 10,
         paddingVertical : 5,
         borderRadius : 5
     },
     btn : {
         paddingHorizontal : 50,
         paddingVertical : 10,
         borderRadius : 10,
         width : Dimensions.get('window').width -50,
         alignItems :'center',
         marginVertical : 5
     },
     pad : {
         margin : 5,
         paddingVertical : 40,
         paddingHorizontal : 20,
         borderRadius : 20

     }
 })

 const mapDispatchToProps = (dispatch) => {
     return {
         addUser : (user) => dispatch(addUser(user)),
         addBilling : (billing) => dispatch(addBilling(billing))
     }
 }

 export default connect(null, mapDispatchToProps)(SignUp)