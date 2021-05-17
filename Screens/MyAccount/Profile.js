import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Dimensions, Text } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import Loader from '../../Components/Loader';
import TitleHeader from '../../Components/TitleHeader';
import WooCommerce from '../../Components/WooCommerce'
import { addUser, editBilling, editUser } from '../../Redux/User/User-Action';

const {width, height} = Dimensions.get('window');

const Profile = ({profile, billing, editBilling}) => {

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState(billing.email);
    const [first_name, set_first_name] = useState(billing.first_name);
    const [last_name, set_last_name] = useState(billing.last_name);
    const [phone, set_phone] = useState(billing.phone);
    const [address_1, set_address_1] = useState(billing.address_1);
    const [address_2, set_address_2] = useState(billing.address_2)
    const [city, set_city] = useState(billing.city)
    const handleUpdate = () => {
        setLoading(true)
        const data = {
            first_name,
            last_name,
            email,
            billing: {
                email,
                first_name,
                last_name,
                phone,
                address_1,
                address_2,
                city
            }
          };
          
          WooCommerce.put(`customers/${profile.id}`, data)
            .then((response) => {
              console.log(response);
              editBilling({
                  email : email,
                  first_name : first_name,
                  last_name : last_name,
                  phone : phone,
                  address_1 : address_1,
                  address_2 : address_2,
                  city :  city
              })
              setLoading(false)
            })
            .catch((error) => {
              console.log(error);
            });
    }

    if(loading) return <View style={{flex : 1}}><Loader/></View>
    else{
    return (
        <View style={{flex : 1}}>
            <TitleHeader title='Account Information'/>
            <ScrollView style={{flex : 1}}>
                <View style={{alignItems : 'center'}}>
                    <View style={styles.textBox}>
                        <Text style={{color : 'grey', fontWeight : 'bold'}}>Email</Text>
                        <TextInput value={email} onChangeText={setEmail}/>
                    </View>
                    <View style={styles.textBox}>
                        <Text style={{color : 'grey', fontWeight : 'bold'}}>First Name</Text>
                        <TextInput value={first_name} onChangeText={set_first_name}/>
                    </View>
                    <View style={styles.textBox}>
                        <Text style={{color : 'grey', fontWeight : 'bold'}}>Last Name</Text>
                        <TextInput value={last_name} onChangeText={set_last_name}/>
                    </View>
                    <View style={styles.textBox}>
                        <Text style={{color : 'grey', fontWeight : 'bold'}}>Phone Number</Text>
                        <TextInput value={phone} onChangeText={set_phone}/>
                    </View>
                    <View style={styles.textBox}>
                        <Text style={{color : 'grey', fontWeight : 'bold'}}>Flat / House No.</Text>
                        <TextInput value={address_1} onChangeText={set_address_1}/>
                    </View>
                    <View style={styles.textBox}>
                        <Text style={{color : 'grey', fontWeight : 'bold'}}>Area / Locality</Text>
                        <TextInput value={address_2} onChangeText={set_address_2}/>
                    </View>
                    <View style={styles.textBox}>
                        <Text style={{color : 'grey', fontWeight : 'bold'}}>Landmark</Text>
                        <TextInput value={city} onChangeText={set_city}/>
                    </View>
                </View>
            </ScrollView>
            <View style={{alignItems : 'center', backgroundColor : 'white', justifyContent : 'center'}}>
                <TouchableOpacity onPress={()=>handleUpdate()} style={{backgroundColor : '#c60607', width : width-100, paddingVertical : 5, borderRadius : 5, marginVertical : 10}}>
                    <Text style={{color : 'white', fontSize : 20, textAlign : 'center'}}>Update</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    )
                }
}

const styles = StyleSheet.create({
    textBox : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : "space-between",
        backgroundColor : 'white',
        width : width-25,
        borderRadius : 5,
        paddingHorizontal : 15,
        marginVertical : 10,
        borderWidth : 1,
        borderColor : 'lightgrey'
    }
})

const mapStateToProps = (state) => {
    return {
        profile : state.user.profile,
        billing : state.user.billing,
        shipping : state.user.shipping
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editUser : (user) => dispatch(editUser(user)),
        editBilling : (billing) => dispatch(editBilling(billing))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)