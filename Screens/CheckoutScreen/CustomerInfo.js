import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux';
import { editUser } from '../../Redux/User/User-Action';

 const CustomerInfo = ({shipping, editUser, index}) => {
    let data = shipping[index]
    console.log(index)
    const [isChange, setIsChange] = useState(false);
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
        editUser(user);
    }

    return (
        <View>
            <View style={[styles.flexBetween]}>
                <Text style={[styles.fontBd]}>Shipping Address</Text>
                {/* <TouchableOpacity onPress={()=>setIsChange(!isChange)}>
                    <Text style={{color : 'red'}}>CHANGE</Text>
                </TouchableOpacity> */}
            </View>
            <View>
                <Text>{data.first_name + ' ' + data.last_name}</Text>
                <Text>+91 {data.phone}</Text>
                <Text>{data.address_1 + ' ' + data.address_2}</Text>
                <Text>{data.city + ' ' + data.state}</Text>
                <Text>{data.pincode + ' ' + data.country}</Text>
            </View>
            {/* <View style={styles.changeView}>
                <View style={styles.flexBetween}>
                    <TextInput onChangeText={()=>{console.log('hello')}} placeholder="First Name" style={[styles.input, {width : '45%'}]}/>
                    <TextInput onChangeText={()=>{console.log('hello')}} placeholder="Last Name" style={[styles.input, {width : '45%'}]}/>
                </View>
                <View style={styles.flexBetween}>
                    <TextInput onChangeText={()=>{console.log('hello')}} placeholder="Recepient Number" style={[styles.input, {width : '45%'}]}/>
                    <TextInput onChangeText={()=>{console.log('hello')}} placeholder="House No." style={[styles.input, {width : '45%'}]}/>
                </View>
                <View style={styles.flexBetween}>
                    <TextInput onChangeText={()=>{console.log('hello')}} placeholder="Lane | Street" style={[styles.input, {width : '45%'}]}/>
                    <TextInput onChangeText={()=>{console.log('hello')}} placeholder="City" style={[styles.input, {width : '45%'}]}/>
                </View>
                <View style={styles.flexBetween}>
                    <TextInput onChangeText={()=>{console.log('hello')}} placeholder="Zip Code" style={[styles.input, {width : '45%'}]}/>
                    <TextInput onChangeText={()=>{console.log('hello')}} placeholder="State" style={[styles.input, {width : '45%'}]}/>
                </View>
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
                
            </View> */}
        </View>
    )
}

const mapStateToProps = (state) => {
    return  {
        shipping : state.user.shipping
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        editUser : (user) => dispatch(editUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerInfo);