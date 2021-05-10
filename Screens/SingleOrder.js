import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, Alert, Clipboard, Linking } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native';
import WooCommerce from '../Components/WooCommerce'
import Loader from '../Components/Loader'
import TitleHeader from '../Components/TitleHeader';

export default function SingleOrder({route}) {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const item = route.params.item;
    const statusBtn = () => {
        if(item.status === 'pending' || item.status==='on-hold') return <Text style={[styles.btn, {backgroundColor : 'orange'}]}>{item.status}</Text>
        else if(item.status === 'processing' || item.status==='refunded') return <Text style={[styles.btn, {backgroundColor : '#3399ff'}]}>{item.status}</Text>
        else if(item.status === 'completed') return <Text style={[styles.btn, {backgroundColor : '#62BA03'}]}>{item.status}</Text>
        else if(item.status === 'failed' || item.status === 'cancelled') return <Text style={[styles.btn, {backgroundColor : '#ff3300'}]}>{item.status}</Text>
    }
    let date = item.date_created.split('T')[0].split('-')
    let total = 0
    const handleCancelOrder = () => {
        setLoading(true)
        const data = {
            status: "cancelled"
          };
          
          WooCommerce.put(`orders/${item.id}`, data)
            .then((response) => {
                Alert.alert('Order Update', 'Your Order has been cancelled');
                navigation.navigate('MyOrders')
                setLoading(false)
            })
            .catch((error) => {
              console.log(error.response);
              setLoading(false)
            });
          
    }

    const cancelOrderbtn = () => {
        if(item.status==='pending' || item.status=== 'on-hold' || item.status === 'processing'){
            return(
                <TouchableOpacity onPress={()=>handleCancelOrder()}>
                    <Text style={[styles.btn, {backgroundColor : '#ff3300'}]}>Cancel Order</Text>
                </TouchableOpacity>
            )
        }
    }

    if(loading) return <Loader/>
    else{
    return (
        <View style={{flex : 1}}>
            <TitleHeader title={`Order Id #${item.id}`} Parent='MyOrders'/>
            <ScrollView>
                <View style={{flexDirection : 'row', justifyContent : 'space-between',alignItems : 'center', paddingHorizontal : 20, paddingVertical : 10, backgroundColor : '#e0f2ff'}}>
                    <View>
                        <Text>current status : </Text>
                        <Text style={{fontWeight : 'bold', fontSize : 16}}>{item.status}</Text>
                    </View>
                    <View>
                        <Text>{item.meta_data[0].value[0].tracking_number}</Text>
                    </View>
                </View>
                <View style={{paddingHorizontal : 20, paddingVertical : 10, backgroundColor : 'white', marginVertical : 5}}>
                    <Text>Order Tracking</Text>
                    <View style={{flexDirection : 'row', alignItems : 'flex-start', marginVertical : 2}}>
                        <View style={{padding : 2, backgroundColor : 'green', height : 80, marginRight: 10}}></View>
                        <View>
                            <Text style={{fontWeight : 'bold', fontSize : 18}}>Placed</Text>
                            <Text style={{fontSize : 18}}>{item.date_created.split('T')[0]}</Text>
                        </View>
                        {item.status==='pending'?<View style={{position : 'absolute', bottom : -5, left : -6, borderWidth : 2, borderRadius : 12, padding : 1, borderColor : 'green', backgroundColor : 'white'}}>
                            <View style={{padding : 5, backgroundColor : 'green', borderRadius : 10}}></View>
                        </View>:console.log('')}
                    </View>
                    <View style={{flexDirection : 'row', alignItems : 'flex-start', marginVertical : 2}}>
                        <View style={{padding : 2, backgroundColor : 'green', height : 80, marginRight: 10}}></View>
                        <View>
                            <Text style={{fontWeight : 'bold', fontSize : 18}}>Accepted</Text>
                            <Text style={{fontSize : 18}}>{date[0] + '-' + date[1] + '-' + (parseInt(date[2])+1)}</Text>
                        </View>
                        {item.status==='processing'?<View style={{position : 'absolute', bottom : -5, left : -6, borderWidth : 2, borderRadius : 12, padding : 1, borderColor : 'green', backgroundColor : 'white'}}>
                            <View style={{padding : 5, backgroundColor : 'green', borderRadius : 10}}></View>
                        </View>:console.log('')}
                    </View>
                    <View style={{flexDirection : 'row', alignItems : 'flex-start', marginVertical : 2}}>
                        <View style={{padding : 2, backgroundColor : 'green', height : 80, marginRight: 10}}></View>
                        <View>
                            <Text style={{fontWeight : 'bold', fontSize : 18}}>Packed</Text>
                            <Text style={{fontSize : 18}}>
                                {date[0] + '-' + date[1] + '-' + (parseInt(date[2])+2)}
                                </Text>
                        </View>
                        {item.status==='onhold'?<View style={{position : 'absolute', bottom : -5, left : -6, borderWidth : 2, borderRadius : 12, padding : 1, borderColor : 'green', backgroundColor : 'white'}}>
                            <View style={{padding : 5, backgroundColor : 'green', borderRadius : 10}}></View>
                        </View>:console.log('')}
                    </View>
                    <View style={{flexDirection : 'row', alignItems : 'flex-start', marginVertical : 2}}>
                        <View style={{padding : 2, backgroundColor : 'green', height : 80, marginRight: 10}}></View>
                        <View>
                            <Text style={{fontWeight : 'bold', fontSize : 18}}>Shipped</Text>
                            <Text style={{fontSize : 18}}>{date[0] + '-' + date[1] + '-' + (parseInt(date[2])+3)}</Text>
                            {item.status==='completed'?
                            <View>
                                <Text>Your order Shipped Successfully !</Text>
                                <TouchableOpacity onPress={()=>Linking.openURL(`https://shiprocket.co/tracking/${item.meta_data[0].value[0].tracking_number}`)}>
                                    <Text style={{color : 'blue'}}>{`https://shiprocket.co/tracking/${item.meta_data[0].value[0].tracking_number}`}</Text>
                                </TouchableOpacity>
                            </View>:console.log('')}
                            
                        </View>
                        {item.status==='completed'?<View style={{position : 'absolute', bottom : -5, left : -6, borderWidth : 2, borderRadius : 12, padding : 1, borderColor : 'green', backgroundColor : 'white'}}>
                            <View style={{padding : 5, backgroundColor : 'green', borderRadius : 10}}></View>
                        </View>:console.log('')}
                    </View>
                    <View style={{flexDirection : 'row', alignItems : 'flex-start', marginVertical : 2}}>
                        <View style={{padding : 2, backgroundColor : 'green', height : 80, marginRight: 10}}></View>
                        <View>
                            <Text style={{fontWeight : 'bold', fontSize : 18}}>Delivered</Text>
                            <Text style={{fontSize : 18}}>{date[0] + '-' + date[1] + '-' + (parseInt(date[2])+7)}</Text>
                        </View>
                        {item.status==='cancelled'?<View style={{position : 'absolute', bottom : -5, left : -6, borderWidth : 2, borderRadius : 12, padding : 1, borderColor : 'green', backgroundColor : 'white'}}>
                            <View style={{padding : 5, backgroundColor : 'green', borderRadius : 10}}></View>
                        </View>:console.log('')}
                    </View>
                    <View style={{flexDirection : 'row', alignItems : 'flex-start', marginVertical : 2}}>
                        <View style={{padding : 2, backgroundColor : 'green', height : 80, marginRight: 10}}></View>
                        <View>
                            <Text style={{fontWeight : 'bold', fontSize : 18}}>Margin Payout</Text>
                            <Text style={{fontSize : 18}}>On weekly cycle</Text>
                        </View>
                        {item.status==='refunded'?<View style={{position : 'absolute', bottom : -5, left : -6, borderWidth : 2, borderRadius : 12, padding : 1, borderColor : 'green', backgroundColor : 'white'}}>
                            <View style={{padding : 5, backgroundColor : 'green', borderRadius : 10}}></View>
                        </View>:console.log('')}
                    </View>
                </View>
                <View style={{backgroundColor : 'white', paddingHorizontal : 20,paddingVertical : 10, marginVertical : 2}}>
                    <Text style={{fontWeight : 'bold', fontSize : 25, paddingBottom : 4, borderBottomWidth : 1, borderBottomColor : 'gray'}}>Customer details</Text>
                    <Text style={{ fontSize : 22}}>{item.shipping.first_name + ' ' + item.shipping.last_name}</Text>
                    <Text style={{ fontSize : 20}}>{item.shipping.address_1 + ' ' + item.shipping.address_2}</Text>
                </View>
                <View style={{backgroundColor : 'white', paddingHorizontal : 20,paddingVertical : 10, marginVertical : 4}}>
                    <Text style={{fontWeight : 'bold', fontSize : 20}}>{item.payment_method==='cod'?'Cash On Delivery' : 'UPI'}</Text>
                </View>
                <View style={{paddingHorizontal : 20, paddingVertical : 10, backgroundColor : 'white', marginVertical : 4}}>
                    <Text style={{fontWeight : 'bold', fontSize : 25, paddingBottom : 4, borderBottomWidth : 1, borderBottomColor : 'gray'}}>Product details</Text>
                    {item.line_items.map((item)=>{
                        total+=parseInt(item.total)
                        return(
                            <View key={item.id} style={{marginVertical : 10}}>
                                <Text style={{fontSize : 20, fontWeight : 'bold'}}>{item.name}</Text>
                                <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>
                                    <Text>{item.quantity}qty * {item.price}price</Text>
                                    <Text style={{fontWeight : 'bold', color:'#62BA03'}}>Total : {item.total}</Text>
                                </View>
                            </View>
                        )
                    })}
                </View>
                <View style={{paddingHorizontal : 20, paddingVertical : 10, backgroundColor : 'white', marginVertical : 4}}>
                    <Text style={{fontWeight : 'bold', fontSize : 25, paddingBottom : 4, borderBottomWidth : 1, borderBottomColor : 'gray'}}>Order Summary</Text>
                    <View style={{flexDirection : 'row', justifyContent : 'space-between', marginVertical : 5}}>
                        <Text>Product Amount</Text>
                        <Text>{total}</Text>
                    </View>
                    <View style={{flexDirection : 'row', justifyContent : 'space-between', marginVertical : 5}}>
                        <Text>Shipping Charges</Text>
                        <Text>{item.shipping_total}</Text>
                    </View>
                    <View style={{flexDirection : 'row', justifyContent : 'space-between', marginVertical : 5}}>
                        <Text>Margin Earned</Text>
                        <Text>{item.fee_lines[0].total}</Text>
                    </View>
                    <View style={{flexDirection : 'row', justifyContent : 'space-between', marginVertical : 5}}>
                        <Text style={{fontWeight : 'bold'}}>Customer Final Price</Text>
                        <Text>{parseInt(item.fee_lines[0].total) + total}</Text>
                    </View>
                </View>
            </ScrollView>
            <View>
                {cancelOrderbtn()}
            </View>
        </View>
    )}
}

const styles = StyleSheet.create({
    btn : {
        textAlign : 'center',
        marginVertical : 5,
        paddingVertical : 10,
        color : 'white',
        borderRadius : 5,
        marginHorizontal : 20
    }
})