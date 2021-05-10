import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, StatusBar, Dimensions, TextInput } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import Loader from '../Components/Loader';
import TitleHeader from '../Components/TitleHeader';
import WooCommerce from '../Components/WooCommerce'

const MyOrders = ({navigation, profile}) => {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            WooCommerce.get("orders",{
                customer : profile.id,
                per_page : 10
            })
            .then((response) => {
                console.log(response)
                setOrders(response)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error.response.data);
            });
          });
        return unsubscribe
    }, [navigation])

    const identifyStatus = ({item}) =>{
        if(item.status === 'pending' || item.status==='on-hold') return <Text style={[styles.btn, {backgroundColor : 'orange'}]}>{item.status}</Text>
        else if(item.status === 'processing' || item.status==='refunded') return <Text style={[styles.btn, {backgroundColor : '#3399ff'}]}>{item.status}</Text>
        else if(item.status === 'completed') return <Text style={[styles.btn, {backgroundColor : '#62BA03'}]}>{item.status}</Text>
        else if(item.status === 'failed' || item.status === 'cancelled') return <Text style={[styles.btn, {backgroundColor : '#ff3300'}]}>{item.status}</Text>
    }
    if(loading){
        return <Loader/>
    }else if(orders.length===0 || orders=='undefined'){
        return(
            <View>
                <Text>You dont have any orders</Text>
            </View>
        )
    }else{
        return (
            <View style={{backgroundColor : '#ebebeb', flex : 1}}>
                <TitleHeader title='My Orders'/>
                <ScrollView>
                {orders.map((item)=>{
                    return(
                        <TouchableOpacity key={item.id} onPress={()=>navigation.navigate('SingleOrder', {item})}>
                            <View style={styles.order}>
                                <View style={styles.in}>
                                    <Text style={styles.txt}>Order ID</Text>
                                    <Text style={styles.green}>#{item.id}</Text>
                                </View>
                                <View style={styles.in}>
                                    <Text style={styles.txt}>Order Count</Text>
                                    <Text style={{fontSize : 18, fontWeight : 'bold'}}>{item.line_items.length}</Text>
                                </View>
                                <View style={styles.in}>
                                    <Text style={styles.txt}>Total</Text>
                                    <Text style={styles.green}>{item.total}</Text>
                                </View>
                                <View style={styles.in}>
                                    <Text style={styles.txt}>Status</Text>
                                    {identifyStatus({item})}
                                </View>
                            </View>
                        </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
 order : {
     borderWidth : 1,
     margin : 10,
     borderRadius : 5,
     borderColor : 'lightgrey',
     backgroundColor : 'white'
 },
 in : {
     flexDirection : 'row',
     justifyContent : 'space-between',
     borderBottomWidth : 1,
     paddingHorizontal : 10,
     paddingVertical : 8,
     borderColor : 'lightgrey'
 },
 green : {
     color : 'red',
     fontSize : 18
 },
 btn : {
     paddingVertical : 5,
     paddingHorizontal : 15,
     color : 'white',
     fontWeight : 'bold',
     borderRadius : 5,
     fontSize : 16
 },
 txt : {
     fontSize : 16,
     color : 'grey'
 },
 gbtn : {
     textAlign : 'center',
     fontSize : 20,
     backgroundColor : 'red',
     width : Dimensions.get('window').width - 20,
     paddingVertical : 5,
     borderRadius : 5,
     color : 'white'
 }
})

const mapStateToProps = (state) => {
    return {
        profile : state.user.profile
    }
}

export default connect(mapStateToProps)(MyOrders)