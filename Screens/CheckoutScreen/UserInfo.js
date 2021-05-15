import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux';
import { editSender, editPhone } from '../../Redux/User/User-Action';

 const UserInfo = ({billing,editSender, profile, editPhone}) => {
    let user = billing
    const [isChange, setIsChange] = useState(false);
    const [first_name, set_first_name] = useState(profile.first_name);
    const [last_name, set_last_name] = useState(profile.last_name);
    const [phone, set_phone] = useState(billing.phone);
    const styles = StyleSheet.create({
        flexBetween : {
            display : 'flex',
            justifyContent : 'space-between',
            alignItems : 'center',
            flexDirection : 'row',
            marginVertical : 5
        },
        fontBd : {
            fontWeight : 'bold'
        },
        changeView : {
            display : isChange?'flex':'none'
        },
        input : {
            borderWidth : 1,
            borderRadius : 5,
            marginVertical : 8,
            borderColor : 'grey',
            height : 40,
            paddingHorizontal :10,
        },
        UpdateBtn : {
            paddingVertical : 6,
            borderRadius : 5,
            width : '45%'
        }
    })

    const handleUserUpdate = () => {
        setIsChange(!isChange);
        editSender({first_name, last_name});
        editPhone(phone)
    }

    return (
        <View>
            <View style={[styles.flexBetween]}>
                <Text style={[styles.fontBd]}>Sender Information</Text>
                <TouchableOpacity onPress={()=>setIsChange(!isChange)}>
                    <Text style={{color : 'red'}}>CHANGE</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.flexBetween}>
                <Text>{profile.first_name + ' ' + profile.last_name}</Text>
                <Text>+91 {billing.phone}</Text>
            </View>
            <View style={styles.changeView}>
                <View style={styles.flexBetween}>
                    <TextInput value={first_name} onChangeText={set_first_name} style={[styles.input, {width : '45%'}]}/>
                    <TextInput onChangeText={set_last_name} value={last_name} style={[styles.input, {width : '45%'}]}/>
                </View>
                <TextInput onChangeText={set_phone} value={phone} style={styles.input}/>
                <View style={styles.flexBetween}>
                    <TouchableOpacity style={[styles.UpdateBtn,{backgroundColor : 'red'}]}
                        onPress={()=>handleUserUpdate()}
                    >
                        <Text style={{color : 'white', textAlign : 'center', fontSize : 20}}>Update</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.UpdateBtn,{borderWidth : 1}]}
                        onPress={()=>setIsChange(!isChange)}
                    >
                        <Text style={{color : 'black', textAlign : 'center', fontSize : 20}}>Cancel</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </View>
    )
}

const mapStateToProps = (state) => {
    return  {
        billing : state.user.billing,
        profile : state.user.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        editSender : ({first_name, last_name}) => dispatch(editSender({first_name, last_name})),
        editPhone : (phone) => dispatch(editPhone(phone))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);