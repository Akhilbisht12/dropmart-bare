import React from 'react'
import { View, Text, StyleSheet, ScrollView,Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import CartComp from './CartComp';
import TitleHeader from '../../Components/TitleHeader';
import { useNavigation } from '@react-navigation/native';

const {width,height} = Dimensions.get('window')

const Cart = ({cart}) => {
    const navigation = useNavigation()

    return (
        <View style={styles.main}>
            <TitleHeader title='Cart'/>
            <View style={styles.info}>
                <Text>As per the govt guidlines we recommend you to not sell products higher than MRP</Text>
            </View>
            <ScrollView>
                <View style={styles.cartItems}>
                    {cart.map((item)=>{
                        return(
                            <CartComp key={item.id} item={item} />
                        )
                    })}
                </View>
            </ScrollView>
            <View style={styles.payView}>
                <TouchableOpacity style={styles.payBtn} onPress={()=>navigation.navigate('Address', {parent : 'cart'})}>
                    <Text style={{color : 'white', fontSize : 20, textAlign : 'center'}}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main : {
        flex : 1,
    },
    info : {
        padding : 10,
        backgroundColor : 'white',
        marginHorizontal : 10,
        marginVertical : 5,
        borderRadius : 5,
        borderWidth : 1,
        borderColor : 'lightgrey'
    },
    cartItems : {
        flex : 1,
        alignItems : 'center'
    },payView : {
        width : Dimensions.get('window').width,
        alignItems :'center',
        backgroundColor :'white',
        padding : 10,
        borderTopColor : 'lightgrey',
        borderTopWidth : 1
    },
    payBtn : {
        width : Dimensions.get('window').width - 30,
        backgroundColor : '#c60607',
        paddingVertical : 5,
        borderRadius : 5
    },
})

const mapStateToProps = (state) => {
    // former cart is cart Reducer and latter is cart array
    return  {
        cart : state.cart.cart
    }
}

export default connect(mapStateToProps)(Cart);