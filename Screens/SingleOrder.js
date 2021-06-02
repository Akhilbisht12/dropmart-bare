import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, Alert, Clipboard, Linking, Share } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import WooCommerce from '../Components/WooCommerce'
import Loader from '../Components/Loader'
import TitleHeader from '../Components/TitleHeader';

export default function SingleOrder({route}) {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const item = route.params.item;
    const value = route.params.status.value;
    let date = item.date_created.split('T')[0].split('-')
    let tempdate = new Date(item.date_created)
    let Accepted = new Date(tempdate.getTime() + 86400000).toISOString().slice(0,10)
    let Packed = new Date(tempdate.getTime() + 2*86400000).toISOString().slice(0,10)
    let Shipped = new Date(tempdate.getTime() + 3*86400000).toISOString().slice(0,10)
    let Delivered = new Date(tempdate.getTime() + 7*86400000).toISOString().slice(0,10)
    console.log(Accepted)
    let total = 0
    let provider = ''
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
    let tracking_number;
    item.meta_data.map((item)=>{
        if(item.key === '_wc_shipment_tracking_items'){
            tracking_number = item.value[0].tracking_number
            if(item.value[0].tracking_provider==='dpd-at'){
                provider = 'https://shiprocket.co/tracking/'
            }else{
                provider = 'https://www.xpressbees.com/track?isawb=Yes&trackid='
            }
        }
    })


    const share = async()=> {
        try {
            const sharedes = await Share.share({
            message: tracking_number,
            });
        }catch(err){
            console.log('Error =>', err);
        }
    }

    const cancelOrderbtn = () => {
        if(item.status==='pending' || item.status=== 'on-hold' || item.status === 'processing'){
            return(
                <TouchableOpacity onPress={()=>handleCancelOrder()}>
                    <Text style={[styles.btn, {backgroundColor : '#c60607'}]}>Cancel Order</Text>
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
                        <Text style={{fontWeight : 'bold', fontSize : 16}}>{route.params.status.text}</Text>
                    </View>
                    <TouchableOpacity onPress={()=>share()} style={{display : tracking_number?'flex':'none'}}>
                        <View style={{flexDirection : 'row', alignItems : 'center'}}>
                            <Ionicons color='black' size={20} name='copy-outline'/>
                            <Text style={{marginHorizontal : 5}}>{tracking_number?tracking_number:''}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{paddingHorizontal : 20, paddingVertical : 10, backgroundColor : 'white', marginVertical : 5}}>
                    <Text>Order Tracking</Text>
                    <View style={{flexDirection : 'row', alignItems : 'flex-end', marginVertical : 2}}>
                        <View style={{padding : 2, backgroundColor : value>=1?'green':'grey', height : 80, marginRight: 10}}></View>
                        <View>
                            <Text style={{fontWeight : 'bold', fontSize : 18}}>Placed</Text>
                            <Text style={{fontSize : 18}}>{value<=1?item.date_created.split('T')[0]:'Order Placed'}</Text>
                        </View>
                        {item.status==='pending'?<View style={{position : 'absolute', bottom : -5, left : -6, borderWidth : 2, borderRadius : 12, padding : 1, borderColor : 'green', backgroundColor : 'white'}}>
                            <View style={{padding : 5, backgroundColor : 'green', borderRadius : 10}}></View>
                        </View>:console.log('')}
                    </View>
                    <View style={{flexDirection : 'row', alignItems : 'flex-end', marginVertical : 2}}>
                        <View style={{padding : 2, backgroundColor : value>=2?'green':'grey', height : 80, marginRight: 10}}></View>
                        <View>
                            <Text style={{fontWeight : 'bold', fontSize : 18}}>Accepted</Text>
                            <Text style={{fontSize : 18}}>{value<=2?Accepted:'Order Accepted'}</Text>
                        </View>
                        {item.status==='processing'?<View style={{position : 'absolute', bottom : -5, left : -6, borderWidth : 2, borderRadius : 12, padding : 1, borderColor : 'green', backgroundColor : 'white'}}>
                            <View style={{padding : 5, backgroundColor : 'green', borderRadius : 10}}></View>
                        </View>:console.log('')}
                    </View>
                    <View style={{flexDirection : 'row', alignItems : 'flex-end', marginVertical : 2}}>
                        <View style={{padding : 2, backgroundColor : value>=3?'green':'grey', height : 80, marginRight: 10}}></View>
                        <View>
                            <Text style={{fontWeight : 'bold', fontSize : 18}}>Packed</Text>
                            <Text style={{fontSize : 18}}>
                                {value<=3?Packed:'Order Packed'}
                                </Text>
                        </View>
                        {item.status==='on-hold'?<View style={{position : 'absolute', bottom : -5, left : -6, borderWidth : 2, borderRadius : 12, padding : 1, borderColor : 'green', backgroundColor : 'white'}}>
                            <View style={{padding : 5, backgroundColor : 'green', borderRadius : 10}}></View>
                        </View>:console.log('')}
                    </View>
                    <View style={{flexDirection : 'row', alignItems : 'flex-end', marginVertical : 2}}>
                        <View style={{padding : 2, backgroundColor : value>=4?'green':'grey', height : 80, marginRight: 10}}></View>
                        <View>
                            <Text style={{fontWeight : 'bold', fontSize : 18}}>Shipped</Text>
                            <Text style={{fontSize : 18}}>{value<=4?Shipped:'Order Shipped'}</Text>
                            {item.status==='failed'?
                            <View>
                                <Text>Your order Shipped Successfully !</Text>
                                <TouchableOpacity onPress={()=>Linking.openURL(tracking_number?provider+tracking_number:provider)}>
                                    <Text style={{color : 'blue'}}>{tracking_number?provider+tracking_number:provider}</Text>
                                </TouchableOpacity>
                            </View>:console.log('')}
                            
                        </View>
                        {item.status==='failed'?<View style={{position : 'absolute', bottom : -5, left : -6, borderWidth : 2, borderRadius : 12, padding : 1, borderColor : 'green', backgroundColor : 'white'}}>
                            <View style={{padding : 5, backgroundColor : 'green', borderRadius : 10}}></View>
                        </View>:console.log('')}
                    </View>
                    <View style={{flexDirection : 'row', alignItems : 'flex-end', marginVertical : 2}}>
                        <View style={{padding : 2, backgroundColor : value>=5?'green':'grey', height : 80, marginRight: 10}}></View>
                        <View>
                            <Text style={{fontWeight : 'bold', fontSize : 18}}>Delivered</Text>
                            <Text style={{fontSize : 18}}>{value<=5?Delivered:'Order Delivered'}</Text>
                        </View>
                        {item.status==='completed'?<View style={{position : 'absolute', bottom : -5, left : -6, borderWidth : 2, borderRadius : 12, padding : 1, borderColor : 'green', backgroundColor : 'white'}}>
                            <View style={{padding : 5, backgroundColor : 'green', borderRadius : 10}}></View>
                        </View>:console.log('')}
                    </View>
                    <View style={{flexDirection : 'row', alignItems : 'flex-end', marginVertical : 2}}>
                        <View style={{padding : 2, backgroundColor : value>=6?'green':'grey', height : 80, marginRight: 10}}></View>
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
                    <Text style={{ fontSize : 20}}>{item.shipping.address_1 + ' ' + item.shipping.address_2 + ' ' + item.shipping.city + ' ' + item.shipping.state + ' ' + item.shipping.postcode + ' ' + item.shipping.country}</Text>
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
                    <Text>Customer final prices are inculsive of gift pack charges and shipping charges</Text>
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
                        <Text>{item.total}</Text>
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