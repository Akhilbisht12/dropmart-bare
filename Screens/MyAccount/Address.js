import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import TitleHeader from '../../Components/TitleHeader'
import { deleteShipping } from '../../Redux/User/User-Action'
import AddAddress from './AddAddress'
const {width, height} = Dimensions.get('window')

const AddressList = ({item, deleteShipping, index, handleSelectValue, billing}) => {

    const styles = StyleSheet.create({
        addList : {
            backgroundColor : 'white',
            padding : 10,
            marginVertical : 3,
        },
        username : {
            fontSize : 20,
            fontWeight : 'bold'
        },
        subText : {
            fontSize : 16,
            color : 'grey'
        },
        btnView : {
            display : 'flex',
            flexDirection : 'row',
            alignItems : 'center',
            justifyContent : 'space-evenly',
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
        },
        select : {
            position : 'absolute',
            backgroundColor : billing===index?'#c60607':'white',
            padding : 10,
            right : 10,
            top : 20,
            borderColor : 'grey',
            borderWidth : 1,
            borderRadius : 10,
        }
    })

    return(
        <TouchableOpacity style={styles.addList} onPress={()=>handleSelectValue(index)}>
            <Text style={styles.username}>{item.first_name + ' ' + item.last_name}</Text>
            <Text style={styles.subText}>{item.address_1 + ' ' + item.address_2 + ' ' + item.city + ' ' + item.state + ' ' + item.pincode + ' ' + item.country}</Text>
            <Text style={styles.subText}>+91 {item.phone}</Text>
            <View style={[styles.btnView,{width : width*0.4}]}>
                <TouchableOpacity style={[styles.btn,{backgroundColor : '#c60607'}]}>
                    <Text style={[styles.btnText,{color : 'white'}]}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>deleteShipping(item.id)} style={[styles.btn]}>
                    <Text style={[styles.btnText,{color : '#c60607'}]}>Delete</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.select}></View>
        </TouchableOpacity>
    )
}




const Address = ({shipping, route, navigation}) => {
    const [show, setShow] = useState(false)
    const [billing, setBilling] = useState(0);
    const handleSelectValue = (value) =>{
        setBilling(value)
    }

    const styles = StyleSheet.create({
        main : {
            flex : 1,
        },
        showAddress : {
            flex : 1,
            display : show?'none':'flex'
        },
        scroll : {
            flex : 2
        },
        addAddress : {
            flex : 1,
            display : show?'flex':'none'
        },
        btnView : {
            display : 'flex',
            flexDirection : 'row',
            alignItems : 'center',
            justifyContent : 'space-evenly',
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

    if(shipping.length!==0){
        return (
            <View style={styles.main}>
                <View style={styles.showAddress}>
                    <TitleHeader title='My Addresses'/>
                    <ScrollView style={styles.scroll}>
                        {shipping.map((item,i)=>{
                            return <AddressList handleSelectValue={handleSelectValue} key={item.address_1+Math.floor(Math.random()*100)} item={item} index={i} billing={billing}/>
                        })}                        
                    </ScrollView>
                    <View style={[styles.btnView]}>
                        <TouchableOpacity
                            onPress={()=>setShow(!show)}
                        style={[styles.btn, {backgroundColor : '#c60607',width : width*0.45}]}>
                            <Text style={[styles.btnText, {color : 'white'}]}>Add New Address</Text>
                        </TouchableOpacity>
                        {route.params.parent==='cart'
                        ?<TouchableOpacity onPress={()=>navigation.navigate('Summary',{index:billing})} style={[styles.btn, {width : width*0.45}]}>
                            <Text style={[styles.btnText, {color : '#c60607'}]}>Proceed</Text>
                        </TouchableOpacity>
                        :console.log('')}
                    </View>
                </View>
                <View style={styles.addAddress}>
                    <AddAddress Parent='Home'/>
                </View>
            </View>
    )}else{
        return(
            <AddAddress Parent='Address'/>
        )
    }
}




const mapStateToProps = (state)=> {
    return {
        shipping : state.user.shipping
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteShipping : (id) => dispatch(deleteShipping(id))
    }
}
connect(mapDispatchToProps)(AddressList)
export default connect(mapStateToProps)(Address)
