import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions, TextInput, ToastAndroid } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome';
import TitleHeader from '../../Components/TitleHeader'
import { connect } from 'react-redux';
import WooCommerce from '../../Components/WooCommerce';
import UserInfo from './UserInfo';
import CustomerInfo from './CustomerInfo';
import RazorpayCheckout from 'react-native-razorpay';
import { emptyCart } from '../../Redux/Cart/Cart-Action';
import Loader from '../../Components/Loader';

const OrderSummary = ({cart, billing, route, shipping, profile, navigation, emptyCart}) => {
    console.log(route.params.index)
    const [productTotal, setProductTotal] = useState();
    const [discount, setDiscount] = useState(0);
    const [maxPrice, setMaxPrice] = useState();
    const [margin, setMargin] = useState(0);
    const [isOnline, setOnline] = useState(true)
    const [loading, setLoading] = useState(false)
    const [isGift, setGift] = useState(false)
    const [giftMessage, setGiftMessage] = useState('')
    const [coupon, setCoupon] = useState('')
    const [off, setOff] = useState(0)
    let today = new Date().toISOString().slice(0, 10).split('-')
    useEffect(()=>{

        let price = 0;
        let maxprice = 0;
        let mar = 0;
        cart.map((item)=>{
            price += item.price*item.qty;
            maxprice += item.regular_price*item.qty;
        })
        setProductTotal(price);
        setMargin(price)
        setMaxPrice(maxprice);

    },[cart, productTotal, setProductTotal]);

    const handleCoupon = () => {
        WooCommerce.get("coupons",{code : coupon})
        .then((response) => {
           response.length === 0 ?ToastAndroid.show('No such Coupon Code', ToastAndroid.SHORT): setOff(response[0].amount); ToastAndroid.show('Coupon added', ToastAndroid.SHORT)
           setDiscount((productTotal*response[0].amount)/100)
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const order = () =>{
        setLoading(true)
        let list = [];
        let fee_lines
        let shipping_lines
        cart.map((item)=>{
            list.push({product_id : item.id,quantity : item.qty});
        })
        if(isGift){
            fee_lines = [{name : 'User Earned Margin',total : `${margin-productTotal}`},{name : 'Gift Pack Charges', total : '75'}]
        }else {
            fee_lines = [{name : 'User Earned Margin',total : `${margin-productTotal}`}]
        }

        if(productTotal<=199){
            shipping_lines = [{method_id : 'flat_rate', method_title : 'Flat Rate', total : '49.00'}]
        }else {
            shipping_lines = []
        }
        const data = {
            payment_method: isOnline?'razorpar':'cod',
            payment_method_title: isOnline?'RazorPay Payment':'Cash On Delivery',
            set_paid: false,
            customer_id : profile.id,
            billing: billing,
            shipping: shipping[route.params.index],
            line_items: list,
            fee_lines : fee_lines,
            shipping_lines: shipping_lines
          };
          
          WooCommerce.post("orders", data)
            .then((response) => {
              console.log(response);
              if(isGift){
                const data = {
                note: giftMessage
                };
                WooCommerce.post(`orders/${response.id}/notes`, data)
                .then((responseNote) => {
                    console.log(responseNote);
                    navigation.navigate('MyOrders')
                    emptyCart(0)
                })
                .catch((error) => {
                    console.log(error.responseNote);
                    alert(error)
                });
              }else{
                  emptyCart(0)
                  navigation.navigate('MyOrders')
              }
            })
            .catch((error) => {
              console.log(error.response);
            });
    }

    const handleRazorPay = () => {
        var options = {
            description: 'Order Payment',
            image: 'https://dropmarts.com/wp-content/uploads/2021/05/dropmart-logo.jpeg',
            currency: 'INR',
            key: 'rzp_live_nPynaXuvHFfPoS',
            amount: `${(isGift?margin+75-discount:margin-discount)*100}`,
            name: 'DropMart',
            prefill: {
              email: `${profile.email}`,
              contact: `${billing.phone}`,
              name: `${billing.first_name + ' ' + billing.last_name}`
            },
            theme: {color: '#c60607'}
          }
          RazorpayCheckout.open(options)
          .then((data) => {
            // handle success
            alert(`Success: ${data.razorpay_payment_id}`);
            order();
          })
          .catch((error) => {
            // handle failure
            console.log(error)
            ToastAndroid.show('Payment Unsuccessfull', ToastAndroid.SHORT)
          });
    }

    const CompleteOrder = () => {
        if(margin<productTotal){
            ToastAndroid.show('Margin cannbot be below Product Total', ToastAndroid.SHORT)
        }else if(margin>maxPrice){
            ToastAndroid.show('Margin cannbot be above MRP', ToastAndroid.SHORT)
        }else{
            isOnline?handleRazorPay():order()
        }
    }

    if(loading) return <Loader/>
    return (
        <View style={styles.main}>
            <TitleHeader title='Order Summary' parent='Cart'/>
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
                        <Text  style={[styles.fontBd,{textAlign : 'center'}]}>{today[0] + '-' +today[1]+ '-'+(parseInt(today[2])+7)}</Text>
                    </View>
                    {/* apply gift wrap section */}
                    <View style={[styles.colorCont]}>
                        <Text  style={[styles.fontBd,{textAlign : 'center'}]}>Choose Gift Options</Text>
                        <View style={{flexDirection : 'row'}}>
                            <TouchableOpacity onPress={()=>setGift(!isGift)} style={{padding : 5, borderWidth : 1, borderRadius : 10, width : 15, height : 15, backgroundColor : isGift?'#c60607':'white', borderColor : '#c60607'}}></TouchableOpacity>
                            <Text>  Is this a gift Item</Text>
                        </View>
                        <TextInput
                        value={giftMessage}
                        onChangeText={setGiftMessage}
                        style={{borderWidth : 1, borderColor : 'lightgray',height : 40, marginVertical : 5, borderRadius: 5}}
                        placeholder='Gift Message' />
                        <Text>Note : Additional ₹75 will be charged for gift packaging</Text>
                    </View>
                    {/* coupon code section */}
                    <View style={[styles.colorCont]}>
                        <Text  style={[styles.fontBd,{textAlign : 'center', marginVertical : 10}]}>Have coupon code ?</Text>
                        <View style={{flexDirection : 'row',borderWidth : 1, borderColor : 'lightgray', alignItems : 'center', justifyContent : 'space-between', paddingHorizontal : 10, borderRadius: 5}}>
                            <TextInput
                                autoCapitalize={true}
                                value={coupon}
                                onChangeText={setCoupon}
                                style={{height : 40, marginVertical : 1, width : 200}}
                                placeholder='Coupon Code' />
                            <TouchableOpacity onPress={()=>handleCoupon()}>
                                <Text style={{color : '#c60607'}}>Apply</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.colorCont]}>
                        <Text  style={[styles.fontBd]}>Price Breakup</Text>
                        <View style={styles.flexBetween}>
                            <Text>Product Charges</Text>
                            <Text>{productTotal}</Text>
                        </View>
                        <View style={[styles.flexBetween]}>
                            <Text>Shipping Charges</Text>
                            <Text>{productTotal>199?0:49}</Text>
                        </View>
                        <View style={[styles.flexBetween,{borderBottomWidth : 1, paddingBottom : 10, marginBottom : 5, borderBottomColor: 'grey'}]}>
                            <Text>Coupon Discount</Text>
                            <Text>{off}%</Text>
                        </View>
                        <View style={[styles.flexBetween,{borderBottomWidth : 1, paddingBottom : 10, marginBottom : 5, borderBottomColor: 'grey'}]}>
                            <Text>Gift Pack Charges</Text>
                            <Text>{isGift?75:0}</Text>
                        </View>
                        <View style={styles.flexBetween}>
                            <Text>Order Total</Text>
                            <Text>{isGift?productTotal+75:productTotal}</Text>
                        </View>
                        <View style={styles.flexBetween}>
                            <Text>MRP Total</Text>
                            <Text>{maxPrice}</Text>
                        </View>
                        <View style={[styles.flexBetween,{borderBottomWidth : 1, paddingBottom : 10, marginBottom : 5, borderBottomColor: 'grey'}]}>
                            <Text style={{fontWeight : 'bold'}}>Final Customer Price</Text>
                            {/* <Text>{isGift?margin+75-discount:margin-discount}</Text> */}
                            <TextInput style={{borderWidth : 1, height : 40, borderRadius : 5, width : 50}} value={margin} textContentType={Number} onChangeText={setMargin}/>
                        </View>
                        <View style={styles.flexBetween}>
                            <Text style={[styles.fontBd,{color : 'green'}]}>Margin Earned</Text>
                            <Text style={[styles.fontBd,{color : 'green'}]}>{margin-productTotal}</Text>
                        </View>
                    </View>
                    <View style={[styles.colorCont]}>
                        <CustomerInfo index={route.params.index}/>
                    </View>
                    <View style={[styles.colorCont]}>
                        <Text style={[styles.fontBd]}>Select Payment Method</Text>
                        {/* online payment selection */}
                        <TouchableOpacity onPress={()=>setOnline(true)}>
                            <View style={[styles.flexBetween,{borderWidth : 1, borderColor : 'white', padding : 10, borderRadius : 5}]}>
                                <View style={[{display : 'flex', flexDirection : 'row', alignItems :'center'}]}>
                                    <Icon style={styles.icon} name='credit-card' size={20}/>
                                    <View>
                                        <Text style={{fontSize : 20}}>Online</Text>
                                        <Text>Debit Card, Credit Cart, Net Banking, UPI</Text>
                                    </View>
                                </View>
                                <Icon name='check-circle' color={isOnline?'#c60607':'grey'} size={20}/>
                            </View>
                        </TouchableOpacity>
                        {/* cash on delivery selection */}
                        <TouchableOpacity onPress={()=>setOnline(false)}>
                            <View style={[styles.flexBetween,{borderWidth : 1, borderColor : 'white', padding : 10, borderRadius : 5}]}>
                                <View style={[{display : 'flex', flexDirection : 'row', alignItems :'center'}]}>
                                    <Icon style={styles.icon} name='truck' size={20}/>
                                    <View>
                                        <Text style={{fontSize : 20}}>Cash On Delivery</Text>
                                        <Text>Pay when you receive the order</Text>
                                    </View>
                                </View>
                                <Icon name='check-circle' color={isOnline?'gray':'#c60607'} size={20}/>
                            </View>
                        </TouchableOpacity>
                        
                        {/* <View style={[styles.flexBetween,{borderWidth : 1, borderColor : 'white', padding : 10, borderRadius : 5}]}>
                            <View style={[{display : 'flex', flexDirection : 'row', alignItems :'center'}]}>
                                <Icon style={styles.icon} name='paypal' size={20}/>
                                <View>
                                    <Text style={{fontSize : 20}}>UPI</Text>
                                    <Text>PayTm, Phone pe, Google Pay</Text>
                                </View>
                            </View>
                            <Icon name='check-circle' color='grey' size={20}/>
                        </View> */}
                    </View>
                </View>
            </ScrollView>
            <View style={styles.payView}>
                <TouchableOpacity onPress={()=>CompleteOrder()} style={styles.payBtn}>
                    <Text style={{color : 'white', fontSize : 20, textAlign : 'center'}}>
                        Complete Order
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

const mapDispatchToProps = (dispatch) => {
    return {
        emptyCart : (itemID) => dispatch(emptyCart(itemID))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);