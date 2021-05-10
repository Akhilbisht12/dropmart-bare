import React, { useState } from 'react';
import { Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WooCommerce from '../../Components/WooCommerce';
import Loader from '../../Components/Loader';
import Axios from 'axios';
import { connect } from 'react-redux';
import { addUser } from '../../Redux/User/User-Action';

 const SignUp = ({navigation, addUser}) => {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [name, setName] = useState('');
     const [street, setStreet] = useState('');
     const [flat, setFlat] = useState('');
     const [landmark, setLandmark] = useState('');
     const [mobile, setMobile] = useState('');
     const [next, setNext] = useState(true);
     const [loading, setLoading] = useState(false);

    //  const handleSignUp = ()=>{
    //      setLoading(true);
    //      if(name!='' && street!='' && flat!='' && landmark!='' &&mobile!=''){
    //     const data = {
    //         email: email,
    //         first_name: name.split(' ')[0],
    //         last_name: name.split(' ')[1],
    //         username: name.split(' ')[0]+name.split(' ')[1] + Math.round(Math.random()*10000),
    //         password : password,
    //         billing: {
    //           first_name: name.split(' ')[0],
    //           last_name: name.split(' ')[1],
    //           company: password,
    //           address_1: flat,
    //           address_2: street,
    //           city: landmark,
    //           state: "Uttrakhand",
    //           postcode: "",
    //           country: "India",
    //           email: email,
    //           phone: mobile
    //         },
    //         shipping: {
    //           first_name: name.split(' ')[0],
    //           last_name: name.split(' ')[1],
    //           company: "",
    //           address_1: flat,
    //           address_2: street,
    //           city: landmark,
    //           state: "Uttrakhand",
    //           postcode: "",
    //           country: "India"
    //         }
    //       };
          
    //       WooCommerce.post("customers", data)
    //         .then((response) => {
    //             console.log(data)
    //             console.log(response, response.data)
    //           AsyncStorage.setItem('user', JSON.stringify(response));
    //           AsyncStorage.setItem('cart', JSON.stringify([]));
    //           navigation.navigate('ScreenOne');
    //           setLoading(false);
    //         })
    //         .catch((error) => {
    //           setLoading(false);
    //           alert('Something Went Wrong')
    //         });
    //     }
    //  }

    const handleSignUp = () => {
        if(email && password){
            setLoading(true)
            Axios.post('https://dropmarts.com/wp-json/wp/v2/users/register', {
                username : email,
                email,
                password
            })
            .then(response=>{
                WooCommerce.get("customers",{email})
                .then((wooresponse) => {
                    addUser({
                        id: wooresponse[0].id,
                        date_created: '',
                        date_created_gmt: '',
                        date_modified: '',
                        date_modified_gmt: '',
                        email: email,
                        first_name: '',
                        last_name: '',
                        role: '',
                        token : '',
                        username: email,
                      })
                })
                .catch((error) => {
                    console.log(error.response);
                });
            })
            .catch(err=>{
                alert(err)
            })
            .then(()=>{
                setLoading(false)
                navigation.navigate('Details')
            })
        }else{
            alert('Fill Out Details')
        }
    }

    if(loading){
        return <Loader/>
    }else{
        return(
            <View style={styles.main}>
                <View style={{alignItems : 'center'}}>
                    <Icon name='opencart' color={'#62BA03'} size={50}/>
                    <Text style={{fontSize : 40}}>Welcome</Text>
                    <Text>Sign Up to continue</Text>
                </View>
                <View>
                    <TextInput style={styles.input} placeholder='Your Email' placeholderTextColor={'grey'} value={email} 
                    onChangeText={(text)=>setEmail(text)}/>

                    <TextInput placeholderTextColor={'grey'} style={styles.input} placeholder='Enter Password'
                    value={password} onChangeText={(text)=>setPassword(text)}/>
                </View>
                <TouchableOpacity style={styles.btn} onPress={()=>{handleSignUp()}}>
                    <Text style={{color : 'white'}}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection : 'row'}} onPress={()=>navigation.navigate('Login')}>
                    <Text>Already have a account?</Text>
                    <Text style={{color : '#62BA03', fontWeight : 'bold'}}> Sign In</Text>
                </TouchableOpacity>
            </View>
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
         flex : 1,
         justifyContent : 'space-evenly',
         alignItems : 'center',
         marginTop : StatusBar.currentHeight,
         marginBottom : StatusBar.currentHeight
     },
     input : {
         borderWidth : 1,
         borderColor : 'lightgrey',
         width : Dimensions.get('window').width - 50,
         marginVertical : 5,
         paddingHorizontal : 10,
         paddingVertical : 5,
         borderRadius : 5
     },
     btn : {
         backgroundColor : '#62BA03',
         paddingHorizontal : 50,
         paddingVertical : 10,
         borderRadius : 10,
         borderBottomWidth : 2,
         borderTopWidth : 0.5,
         borderLeftWidth : 1,
         borderRightWidth : 1,
         borderColor : '#428000',
         width : Dimensions.get('window').width -50,
         alignItems :'center'
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
         addUser : (user) => dispatch(addUser(user))
     }
 }

 export default connect(null, mapDispatchToProps)(SignUp)