import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, StatusBar, Dimensions, TextInput } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import Loader from '../Components/Loader';
import TitleHeader from '../Components/TitleHeader';
import WooCommerce from '../Components/WooCommerce';
import Ionicons from 'react-native-vector-icons/Ionicons'

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
                console.log(response[0])
                setOrders(response)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error.response.data);
            });
          });
        return unsubscribe
    }, [navigation])

    const identifyStatus = (status) =>{
        switch (status) {
            case 'pending':
                return {text : 'Placed', value : 1}
            case 'processing':
                return {text : 'Accepted', value : 2}
            case 'on-hold':
                return {text : 'Packed', value : 3}
            case 'failed':
                return {text : 'Shipped', value : 4}
            case 'completed':
                return {text : 'Delivered', value : 5}
            case 'refunded':
                return {text : 'Payout', value : 6}
            case 'cancelled':
                return {text : 'Cancelled', value : 7}
            default:
        }
    }

    const OrderComp = ({item}) => {
        return(
            <TouchableOpacity key={item.id} onPress={()=>navigation.navigate('SingleOrder', {item, status : identifyStatus(item.status)})}>
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
                        <Text style={{backgroundColor : '#c60607', color : 'white', paddingHorizontal : 20, paddingVertical : 5, borderRadius : 5}}>{identifyStatus(item.status).text}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    if(loading)return <Loader/>

    else if(orders.length===0 || orders=='undefined'){
        return(
            <View style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
                <Ionicons name='cube' size={80} color='#c60607' />
                <Text style={{fontSize : 30, marginVertical : 20}}>You dont have any orders</Text>
            </View>
        )
    }else{
        return (
            <View style={{backgroundColor : '#ebebeb', flex : 1}}>
                <TitleHeader title='My Orders'/>
                <ScrollView>
                {orders.map((item)=>{
                    return(
                        <OrderComp key={item.id} item={item}/>
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