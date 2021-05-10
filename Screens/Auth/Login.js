import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions, Linking } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeArea } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import WooCommerce from '../../Components/WooCommerce';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../Components/Loader'
import { connect } from 'react-redux';
import { addUser } from '../../Redux/User/User-Action';
import Axios from 'axios';

const Login = ({navigation,addUser}) => {
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
                        date_created: '',
                        date_created_gmt: '',
                        date_modified: '',
                        date_modified_gmt: '',
                        email: email,
                        first_name: '',
                        last_name: '',
                        role: '',
                        token : response.data.token,
                        username: email,
                      })
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
                    <Icon name='opencart' color={'#62BA03'} size={50}/>
                    <Text style={styles.headText}>Welcome Back</Text>
                    <Text>Sign in to continue</Text>
                </View>
                <View>
                    <TextInput value={email} onChangeText={(text)=>setEmail(text)} placeholder='Email' placeholderTextColor='grey' style={styles.input}/>
                    <TextInput value={password} onChangeText={(text)=>setPassword(text)} placeholder='Password' placeholderTextColor='grey' style={styles.input}/>
                    <TouchableOpacity onPress={()=>Linking.openURL('https://gms.upgrate.in/my-account/lost-password/')}>
                        <Text style={{textAlign : 'right', color : '#62BA03'}}>Forgot Password</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                        <Text style={{color : 'white', textAlign :'center'}}>Sign In</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection : 'row', justifyContent : 'center', marginTop : 10}}>
                        <Text>Don't have an account?</Text>
                        <TouchableOpacity onPress={()=>navigation.navigate('Signup')}>
                            <Text style={{color : '#62BA03'}}>Sign Up</Text>
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
        backgroundColor : '#62BA03',
        width : Dimensions.get('window').width - 50,
        paddingVertical : 10,
        borderRadius : 5
    }
})

const mapDispatchToProps = (dispatch) =>{
    return {
        addUser : (user)=>dispatch(addUser(user))
    }
}

export default connect(null, mapDispatchToProps)(Login);