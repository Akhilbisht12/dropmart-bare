import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux';
import { editUser } from '../../Redux/User/User-Action';

 const UserInfo = ({billing,editUser}) => {
    let user = billing
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
                <Text style={[styles.fontBd]}>Sender Information</Text>
                <TouchableOpacity onPress={()=>setIsChange(!isChange)}>
                    <Text style={{color : 'red'}}>CHANGE</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.flexBetween}>
                <Text>{billing.first_name + ' ' + billing.last_name}</Text>
                <Text>+91 {billing.phone}</Text>
            </View>
            <View style={styles.changeView}>
                <View style={styles.flexBetween}>
                    <TextInput onChangeText={text=>user.first_name=text} placeholder="First Name" style={[styles.input, {width : '45%'}]}/>
                    <TextInput onChangeText={text=>user.last_name=text} placeholder="Last Name" style={[styles.input, {width : '45%'}]}/>
                </View>
                <TextInput onChangeText={text=>user.phone=text} placeholder="Sender's Number" style={styles.input}/>
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
        billing : state.user.billing
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        editUser : (user) => dispatch(editUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);