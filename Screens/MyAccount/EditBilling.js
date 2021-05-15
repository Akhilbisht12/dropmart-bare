import React, {useState} from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput,Dimensions } from 'react-native'
import { connect } from 'react-redux';
import TitleHeader from '../../Components/TitleHeader';
import { updateShipping } from '../../Redux/User/User-Action';
import { useNavigation } from '@react-navigation/native';

const {width, height} = Dimensions.get('window')
const EditBilling = ({route, shipping, updateShipping}) => {
    const navigation = useNavigation()
    const index = route.params.index
    console.log(index)
    console.log(shipping[index].first_name)
    const [first_name, set_first_name] = useState(shipping[index].first_name);
    const [last_name, set_last_name] = useState(shipping[index].last_name);
    const [phone, set_phone] = useState(shipping[index].phone);
    const [address_1, set_address_1] = useState(shipping[index].address_1);
    const [address_2, set_address_2] = useState(shipping[index].address_2);
    const [city, set_city] = useState(shipping[index].city);
    const [pincode, set_pincode] = useState(shipping[index].pincode);
    const [state, set_state] = useState(shipping[index].state);
    const [country, set_country] = useState(shipping[index].country);

    const handleUpdate = () => {
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
        updateShipping(temp, index)
        navigation.navigate('Address')
    }

    const styles = StyleSheet.create({
        input : {
            borderWidth : 1,
            borderRadius : 5,
            height : 40,
            borderColor : '#c60607',
            paddingHorizontal : 10,
            marginVertical : 2
        },
        btn : {
            borderWidth : 1,
            paddingVertical : 8,
            marginVertical : 5,
            borderRadius : 5,
            paddingHorizontal : 20,
            borderColor : '#c60607'
        }
    })

    return (
        <ScrollView>
            <TitleHeader title='Edit Address'/>
            <View style={{flex : 1, padding : 10, height : height}}>
                <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>
                    <TextInput placeholder={'First Name'} value={first_name} onChangeText={set_first_name} style={[styles.input,{width : width*0.45}]} />
                    <TextInput placeholder={'Last Name'} value={last_name} onChangeText={set_last_name} style={[styles.input,{width : width*0.45}]} />
                </View>
                <TextInput placeholder={'Phone'} value={phone} onChangeText={set_phone} style={[styles.input]} />
                <TextInput placeholder={'Locality'} value={address_1} onChangeText={set_address_1} style={[styles.input]} />
                <TextInput placeholder={'Street'} value={address_2} onChangeText={set_address_2} style={[styles.input]} />
                <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>
                    <TextInput placeholder={'City'} value={city} onChangeText={set_city} style={[styles.input,{width : width*0.45}]} />
                    <TextInput placeholder={'State'} value={state} onChangeText={set_state} style={[styles.input,{width : width*0.45}]} />
                </View>
                <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>
                    <TextInput placeholder={'Pincode'} value={pincode} onChangeText={set_pincode} style={[styles.input,{width : width*0.45}]} />
                    <TextInput placeholder={'Country'} value={country} onChangeText={set_country} style={[styles.input,{width : width*0.45}]} />
                </View>
                <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>
                    <TouchableOpacity
                    onPress={()=>handleUpdate()}
                    style={[styles.btn,{backgroundColor : '#c60607', marginHorizontal : 5, width : width*0.45}]}>
                        <Text style={{color : 'white', textAlign : 'center', fontSize : 18}}>Update</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={()=>navigation.navigation('MyAddress')}
                    style={[styles.btn,{borderWidth : 1, borderColor : '#c60607', borderRadius : 5, marginHorizontal : 5, width : width*0.45}]}>
                        <Text style={{color : '#c60607', textAlign : 'center', fontSize : 18}}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const mapStateToProps = (state) => {
    return {
        shipping : state.user.shipping
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateShipping : (temp, index) => dispatch(updateShipping(temp, index))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBilling)
