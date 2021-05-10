import React, {useState} from 'react'
import { View, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import TitleHeader from '../../Components/TitleHeader'
import WooCommerce from '../../Components/WooCommerce'
import { addBilling, addUser, editUser } from '../../Redux/User/User-Action'
const {width, height} = Dimensions.get('window')

const Details = ({addBilling, navigation,profile}) => {
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
            country
        }
        addBilling(temp)
        const data = {
            billing: temp
          };
          WooCommerce.put(`customers/${profile.id}`, data)
            .then((response) => {
              console.log(response);
              navigation.navigate('Home');
                alert('Details Saved Successfully')
            })
            .catch((error) => {
              console.log(error.response);
            });
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
        editUser : (user)=>dispatch(editUser(user)),
        addBilling : (billing)=>dispatch(addBilling(billing))
    }
}

const mapStateToProps = (state)=> {
    return {
        profile : state.user.profile
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)
