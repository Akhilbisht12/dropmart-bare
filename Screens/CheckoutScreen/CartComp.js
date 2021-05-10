import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, Dimensions} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { removeFromCart, adjustItemQty, adjustItemMargin } from '../../Redux/Cart/Cart-Action';

const {width,height} = Dimensions.get('window');

const CartComp = ({item, removeFromCart, adjustItemQty, adjustItemMargin}) => {

    const [qty, setQty] = useState(1);

    const handleQuantityChange = (state)=>{
        state?adjustItemQty(item.id, item.qty+1):adjustItemQty(item.id, item.qty-1)
    }

    const handleMargin = (e) => {
        console.log(e)
    }

    return (
        <View style={styles.CartItemContainer}>
            <View style={styles.cartItem}>
                <View>
                    <Image style={styles.image} source={{uri : item.image}}/>
                </View>
                <View style={styles.nameView}>
                    <Text style={styles.textBd}>{item.name.substring(0, 30)}..</Text>
                    <View style={styles.priceView}>
                        <Text>Price : ₹ {parseFloat(item.price*item.qty).toFixed(2)}</Text>
                        <View style={{display : 'flex',flexDirection : 'row', alignItems :'center'}}>
                            <TouchableOpacity onPress={()=>handleQuantityChange(true)}>
                                <Icon color='black' name='plus' style={styles.icon}/>
                            </TouchableOpacity>
                            <Text style={{marginHorizontal : 15}}>{item.qty}</Text>
                            <TouchableOpacity onPress={()=>handleQuantityChange(false)}>
                                <Icon color='black' name='minus' style={styles.icon}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.trash} onPress={()=>removeFromCart(item.id)}>
                                <Icon color='white' name='trash'/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={{textDecorationLine : 'line-through'}}>MRP : ₹ {item.regular_price}</Text>
                </View>
            </View>
            
            <View style={styles.marginView}>
                <Text style={styles.textBd}>Final Customer Price : </Text>
                <View style={styles.marginView}>
                    <Text style={styles.textBd}>₹</Text>
                    <TextInput value={item.final_price} keyboardType='number-pad' onChangeText={e=>adjustItemMargin(item.id, e)} style={styles.marginInput}/>
                </View>
            </View>
            <View style={styles.marginView}>
                <Text style={styles.marginTxt}>Your Margin : </Text>
                <Text style={[styles.marginTxt,{marginRight : 15}]}>₹ {item.final_price-item.price}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    CartItemContainer : {
        flex : 1,
        padding : 10,
        backgroundColor : 'white',
        width : width-20,
        borderRadius : 10,
        borderWidth : 1,
        borderColor : '#bcbcbc',
        marginVertical : 5
    },
    cartItem : {
        flexDirection : 'row',
        marginVertical : 5,
    },
    image : {
        width : width*0.16,
        height : 0.12*height,
        borderRadius : 5,
        resizeMode : 'contain'
    },
    priceView : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    icon : {
        padding : 8,
        borderRadius : 5,
        borderWidth : 1,
        borderColor : 'lightgrey'
    },
    nameView : {
        width : width*0.7,
        display : 'flex',
        justifyContent : 'center',
        marginLeft : 5
    },
    textBd : {
        fontSize : 18,
        fontWeight : '700'
    },
    btn : {
        backgroundColor : '#62BA03',
        paddingVertical : 10,
        paddingHorizontal : 20,
        borderRadius : 0,
        flexDirection : 'row',
        width : width,
        justifyContent : "center",
        alignItems : 'center'
    },
    trash : {
        padding : 10,
        backgroundColor : '#c60607',
        borderRadius : 10,
        marginLeft : 10
    },
    marginView : {
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    marginInput : {
        borderBottomWidth : 2,
        marginRight : 15,
        width : 30
    },
    marginTxt : {
        color : 'green',
        fontSize : 18
    }
})

const mapDispatchToProps = (dispatch) => {
    return{
        removeFromCart : (id)=> dispatch(removeFromCart(id)),
        adjustItemQty : (id,value)=>dispatch(adjustItemQty(id,value)),
        adjustItemMargin : (id,finalPrice) => dispatch(adjustItemMargin(id,finalPrice))
    }
}

export default connect(null, mapDispatchToProps)(CartComp);