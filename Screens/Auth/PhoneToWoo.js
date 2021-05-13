import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import Loader from '../../Components/Loader'
import TitleHeader from '../../Components/TitleHeader'
import WooCommerce from '../../Components/WooCommerce'
import Axios from 'axios'
import { addBilling, addUser, editUser } from '../../Redux/User/User-Action'
const {width, height} = Dimensions.get('window')


const PhoneToWoo = ({addBilling,addUser, navigation,profile, route}) => {
    const [step, setStep] = useState(0);

    const FindUser = () => {
        WooCommerce.get('Customers',{email})
        .then(response=>{
            console.log(response)
            if(response.length!==0){
                handleSavedUser(response[0])
            }else{
                setStep(1)
            }
        })
        .catch(err=>console.log(err))
    }

    const [loading, setLoading] = useState(false);
    const [first_name, set_first_name] = useState('');
    const [last_name, set_last_name] = useState('');
    const [email, set_Email] = useState('');
    const [phone, set_phone] = useState('');
    const [address_1, set_address_1] = useState('');
    const [address_2, set_address_2] = useState('');
    const [city, set_city] = useState('');
    const [pincode, set_pincode] = useState('');
    const [state, set_state] = useState('');
    const [country, set_country] = useState('');

    const handleUserSave = () => {
        setLoading(true)
        let temp = {
            first_name,
            last_name,
            phone,
            email,
            address_1,
            address_2,
            city,
            postcode : pincode,
            state,
            country
        }
        addBilling(temp)
        const data = {
            first_name,
            last_name,
            email,
            username : email,
            billing: temp
          };
        Axios.post('https://dropmarts.com/wp-json/wp/v2/users/register', {
        username : email,
        email,
        password : 'PhoneAuthUser'
        })
        .then(responseUP=>{
            console.log(responseUP)
            WooCommerce.get("customers",{email})
            .then((wooresponse) => {
                Axios.post('https://dropmarts.com/wp-json/jwt-auth/v1/token', {
                    username : email,
                    password : 'PhoneAuthUser'
                })
                .then(responseIN=>{
                    console.log(responseIN)
                    WooCommerce.put(`customers/${wooresponse[0].id}`, data)
                    .then(wooresponseEdit=>{
                        console.log(wooresponseEdit)
                        addUser({
                            id: wooresponse[0].id,
                            email: email,
                            first_name,
                            last_name,
                            token : responseIN.data.token,
                            username: email,
                          })
                          alert('You are logged in successfully')
                          navigation.navigate('Home')
                          setLoading(false)
                    })
                    
                })
                
            })
        })
        .catch(err=>{
            alert(err)
        })
    }


    const handleSavedUser = (item) => {
        Axios.post('https://dropmarts.com/wp-json/jwt-auth/v1/token', {
            username : email,
            password : 'PhoneAuthUser'
        })
        .then(responseIN=>{
            console.log(responseIN)
            console.log(item)
            addUser({
                id: item.id,
                email: item.email,
                first_name : item.first_name,
                last_name : item.last_name,
                token : responseIN.data.token,
                username: item.username,
                })
            addBilling(item.billing)
            alert(`Welcome back ${item.first_name} ${item.last_name} !`)
            navigation.navigate('Home')
            setLoading(false)
            })
    }

    if(loading) return <Loader/>
    if(step===0){
        return(
            <View style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
                <TextInput value={email} onChangeText={set_Email} placeholder='Email Address' style={[styles.input]}/>
                <TouchableOpacity onPress={()=>{FindUser()}} style={[styles.btn, {backgroundColor : 'red',width : width*0.9}]}>
                    <Text style={[styles.btnText, {color : 'white'}]}>Continue</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={styles.main}>
            <TitleHeader title='Personal Details'/>
            <ScrollView style={styles.scroll}>
                <View style={styles.scrollView}>
                    <TextInput value={first_name} onChangeText={set_first_name} placeholder='First Name' style={[styles.input]}/>
                    <TextInput value={last_name} onChangeText={set_last_name} placeholder='Last Name' style={[styles.input]}/>
                    <TextInput value={phone} onChangeText={set_phone} placeholder='Mobile Number' style={[styles.input]}/>
                    <TextInput value={address_1} onChangeText={set_address_1} placeholder='House No' style={[styles.input]}/>
                    <TextInput value={address_2} onChangeText={set_address_2} placeholder='Street / Lane / Locality' style={[styles.input]}/>
                    <TextInput value={city} onChangeText={set_city} placeholder='City' style={[styles.input]}/>
                    <TextInput value={pincode} onChangeText={set_pincode} placeholder='Pincode' style={[styles.input]}/>
                    <TextInput value={state} onChangeText={set_state} placeholder='State' style={[styles.input]}/>
                    <TextInput value={country} onChangeText={set_country} placeholder='Country' style={[styles.input]}/>
                </View>
            </ScrollView>
            <View style={styles.btnView}>
                <TouchableOpacity onPress={()=>{handleUserSave()}} style={[styles.btn, {backgroundColor : 'red',width : width*0.9}]}>
                    <Text style={[styles.btnText, {color : 'white'}]}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main : {
        flex : 1,
        backgroundColor : 'white'
    },
    scroll : {
        flex : 1
    },
    scrollView : {
        alignItems : 'center'
    },
    input : {
        borderWidth : 1,
        width : width*0.9,
        borderRadius : 5,
        marginVertical : 8,
        borderColor : 'grey',
        paddingVertical : 5,
        paddingHorizontal : 5
    },
    btnView : {
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-evenly',
        borderTopWidth : 1,
        paddingVertical : 5,
        borderTopColor : 'grey'
    },
    btn : {
        borderWidth : 1,
        paddingVertical : 8,
        marginVertical : 5,
        borderRadius : 5,
        paddingHorizontal : 20,
        borderColor : 'red'
    },
    btnText : {
        textAlign : 'center'
    }
})

const mapDispatchToProps = (dispatch) => {
    return {
        addUser : (user)=>dispatch(addUser(user)),
        addBilling : (billing)=>dispatch(addBilling(billing))
    }
}

const mapStateToProps = (state)=> {
    return {
        profile : state.user.profile
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneToWoo)
