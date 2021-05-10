import React, {useState} from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import TitleHeader from '../../Components/TitleHeader'
import { addShipping } from '../../Redux/User/User-Action'
import { useNavigation } from '@react-navigation/native';

const {width} = Dimensions.get('window')

const AddAddress = ({Parent, addShipping}) => {

    const navigation = useNavigation();

    const [first_name, set_first_name] = useState('');
    const [last_name, set_last_name] = useState('');
    const [phone, set_phone] = useState('');
    const [address_1, set_address_1] = useState('');
    const [address_2, set_address_2] = useState('');
    const [city, set_city] = useState('');
    const [pincode, set_pincode] = useState('');
    const [state, set_state] = useState('');
    const [country, set_country] = useState('');

    const handleUserSave = () => {
        let temp = {
            first_name,
            last_name,
            phone,
            address_1,
            address_2,
            city,
            pincode,
            state,
            country,
            id : Math.floor(Math.random() * 1001 + address_1)
        }
        addShipping(temp)
        navigation.navigate(Parent)
        alert('Address Saved Successfully')
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
            borderColor : '#c60607'
        },
        btnText : {
            textAlign : 'center'
        }
    })
    return (
        <View style={styles.main}>
            <TitleHeader title='Add a shipping Address'/>
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
                <TouchableOpacity onPress={()=>{handleUserSave()}} style={[styles.btn, {backgroundColor : '#c60607',width : width*0.9}]}>
                    <Text style={[styles.btnText, {color : 'white'}]}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        addShipping : (shipping)=>dispatch(addShipping(shipping))
    }
}


export default connect(null, mapDispatchToProps)(AddAddress)