import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome';
import TitleHeader from '../../Components/TitleHeader'
import { connect } from 'react-redux';
import WooCommerce from '../../Components/WooCommerce';
import UserInfo from './UserInfo';
import CustomerInfo from './CustomerInfo';

const OrderSummary = ({cart, billing, route, shipping, profile}) => {
    console.log(route.params.index)
    const [productTotal, setProductTotal] = useState();
    const [customerPrice, setCustomerPrice] = useState();
    useEffect(()=>{

        let price = 0;
        let cusPrice = 0;
        let mar = 0;
        cart.map((item)=>{
            price += item.price*item.qty;
            cusPrice += item.final_price*item.qty;
        })
        setProductTotal(price);
        setCustomerPrice(cusPrice);

    },[cart, productTotal, setProductTotal, customerPrice, setCustomerPrice,]);

    const order = () =>{
        let list = []
        cart.map((item)=>{
            list.push({product_id : item.id,quantity : item.qty});
        })
        const data = {
            payment_method: "cod",
            payment_method_title: "Cash On Delivery",
            set_paid: false,
            customer_id : profile.id,
            billing: billing,
            shipping: shipping[route.params.index],
            line_items: list,
            fee_lines : [
               {
                    name : 'User Earned Margin',
                    total : `${customerPrice-productTotal}`
                }
            ]
          };
          
          WooCommerce.post("orders", data)
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error.response);
            });
    }

    return (
        <View style={styles.main}>
            <TitleHeader title='Order Summary'/>
            <ScrollView>
                <View style={styles.summaryView}>
                    <View style={[styles.colorCont]}>
                        <UserInfo/>
                    </View>
                    <View style={[styles.colorCont]}>
                        <Text style={{textAlign : 'center'}}>
                            This information will be displayed in the package sent to customer. No mention of DropMart will be there.
                        </Text>
                    </View>
                    <View style={[styles.colorCont]}>
                        <Text style={{textAlign : 'center'}}>Estimated Delivery by</Text>
                        <Text  style={[styles.fontBd,{textAlign : 'center'}]}>Tuesday, 11th May</Text>
                    </View>
                    <View style={[styles.colorCont]}>
                        <Text  style={[styles.fontBd,{textAlign : 'center'}]}>Choose Gift Options</Text>
                        <View style={{flexDirection : 'row'}}>
                            <TouchableOpacity style={{padding : 5, borderWidth : 1, borderRadius : 10, width : 15, height : 15}}></TouchableOpacity>
                            <Text>  Is this a gift Item</Text>
                        </View>
                        <TextInput style={{borderWidth : 1, borderColor : 'lightgray',height : 40, marginVertical : 5, borderRadius: 5}} placeholder='Gift Message' />
                        <Text>Note : Additional ₹75 will be charged for gift packaging</Text>
                    </View>
                    <View style={[styles.colorCont]}>
                        <Text  style={[styles.fontBd]}>Price Breakup</Text>
                        <View style={styles.flexBetween}>
                            <Text>Product Charges</Text>
                            <Text>{productTotal}</Text>
                        </View>
                        <View style={[styles.flexBetween,{borderBottomWidth : 1, paddingBottom : 10, marginBottom : 5, borderBottomColor: 'grey'}]}>
                            <Text>Shipping Charges</Text>
                            <Text>0</Text>
                        </View>
                        <View style={[styles.flexBetween,{borderBottomWidth : 1, paddingBottom : 10, marginBottom : 5, borderBottomColor: 'grey'}]}>
                            <Text>Gift Pack Charges</Text>
                            <Text>0</Text>
                        </View>
                        <View style={styles.flexBetween}>
                            <Text>Order Total</Text>
                            <Text>{productTotal}</Text>
                        </View>
                        <View style={[styles.flexBetween,{borderBottomWidth : 1, paddingBottom : 10, marginBottom : 5, borderBottomColor: 'grey'}]}>
                            <Text>Final Customer Price</Text>
                            <Text>{customerPrice}</Text>
                        </View>
                        <View style={styles.flexBetween}>
                            <Text style={[styles.fontBd,{color : 'green'}]}>Margin Earned</Text>
                            <Text style={[styles.fontBd,{color : 'green'}]}>{customerPrice-productTotal}</Text>
                        </View>
                    </View>
                    <View style={[styles.colorCont]}>
                        <CustomerInfo index={route.params.index}/>
                    </View>
                    <View style={[styles.colorCont]}>
                        <Text style={[styles.fontBd]}>Select Payment Method</Text>
                        <View style={[styles.flexBetween,{borderWidth : 1, borderColor : 'white', padding : 10, borderRadius : 5}]}>
                            <View style={[{display : 'flex', flexDirection : 'row', alignItems :'center'}]}>
                                <Icon style={styles.icon} name='credit-card' size={20}/>
                                <View>
                                    <Text style={{fontSize : 20}}>Online</Text>
                                    <Text>Debit Card, Credit Cart, Net Banking, UPI</Text>
                                </View>
                            </View>
                            <Icon name='check-circle' color='grey' size={20}/>
                        </View>
                        <View style={[styles.flexBetween,{borderWidth : 1, borderColor : 'white', padding : 10, borderRadius : 5}]}>
                            <View style={[{display : 'flex', flexDirection : 'row', alignItems :'center'}]}>
                                <Icon style={styles.icon} name='truck' size={20}/>
                                <View>
                                    <Text style={{fontSize : 20}}>Cash On Delivery</Text>
                                    <Text>Pay when you receive the order</Text>
                                </View>
                            </View>
                            <Icon name='check-circle' color='grey' size={20}/>
                        </View>
                        <View style={[styles.flexBetween,{borderWidth : 1, borderColor : 'white', padding : 10, borderRadius : 5}]}>
                            <View style={[{display : 'flex', flexDirection : 'row', alignItems :'center'}]}>
                                <Icon style={styles.icon} name='paypal' size={20}/>
                                <View>
                                    <Text style={{fontSize : 20}}>UPI</Text>
                                    <Text>PayTm, Phone pe, Google Pay</Text>
                                </View>
                            </View>
                            <Icon name='check-circle' color='grey' size={20}/>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.payView}>
                <TouchableOpacity onPress={()=>order()} style={styles.payBtn}>
                    <Text style={{color : 'white', fontSize : 20, textAlign : 'center'}}>
                        Proceed To Pay
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main : {
        flex : 1
    },
    summaryView : {
        padding : 10,
        flex : 1
    },
    colorCont : {
        padding : 10,
        backgroundColor : 'white',
        borderRadius : 5,
        marginVertical : 5
    },
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
    payView : {
        width : Dimensions.get('window').width,
        alignItems :'center',
        backgroundColor :'white',
        padding : 10,
        borderTopColor : 'grey',
        borderTopWidth : 1
    },
    payBtn : {
        width : Dimensions.get('window').width - 30,
        backgroundColor : '#c60607',
        paddingVertical : 5,
        borderRadius : 5
    },
    icon : {
        marginHorizontal : 10
    }
})

const mapStateToProps = (state) => {
    // former cart is cart Reducer and latter is cart array
    return  {
        cart : state.cart.cart,
        shipping : state.user.shipping,
        billing : state.user.billing,
        profile : state.user.profile
    }
}

export default connect(mapStateToProps)(OrderSummary);