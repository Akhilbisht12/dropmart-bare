import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';

const TitleHeader = ({title, wishlist, cart}) => {
    const [counter, setCounter] = useState(0)
    useEffect(() => {
        let count = 0;
        cart.map((item)=>{
            count += item.qty
        })
        setCounter(count)
    }, [cart, counter, setCounter])
    const navigation = useNavigation();
    return (
        <View style={styles.header}>
            <View style={{flexDirection : 'row', alignItems : 'center'}}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Ionicon style={styles.icon} name='chevron-back-outline'/>
                </TouchableOpacity>
                <Text style={styles.title}>{title.length>18?title.substr(0,18):title}</Text>
            </View>
            <View style={{flexDirection : 'row', alignItems : 'center'}}>
                <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
                    <Ionicon style={styles.icon} name='search-outline'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('Wishlist')}>
                <Text
                    style={{position : 'absolute', top : 0, right : 0, backgroundColor : 'white', paddingHorizontal : 5, borderRadius : 10, color : '#c60607'}}>{wishlist.length}</Text>
                    <Ionicon style={styles.icon} name='heart-outline'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('Cart')}>
                    <Text
                    style={{position : 'absolute', top : 0, right : 0, backgroundColor : 'white', paddingHorizontal : 5, borderRadius : 10, color : '#c60607'}}>{counter}</Text>
                    <Ionicon style={styles.icon} name='cart-outline'/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header : {
        height : 50,
        backgroundColor : '#c60607',
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between'
    },
    title : {
        color : 'white',
        fontSize : 20
    },
    icon : {
        fontSize : 30,
        color : 'white',
        marginHorizontal : 10
    }
})

const mapStateToProps = (state) => {
    return {
        cart : state.cart.cart,
        wishlist : state.wishlist.wishlist
    }
}

export default connect(mapStateToProps)(TitleHeader)