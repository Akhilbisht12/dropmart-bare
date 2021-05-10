import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Dimensions } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import { connect } from 'react-redux';

const Header = ({cart}) => {
    const navigation = useNavigation();
    const [counter, setCounter] = useState(0)
    useEffect(() => {
        let count = 0;
        cart.map((item)=>{
            count += item.qty
        })
        setCounter(count)
    }, [cart, counter, setCounter])
    return (
        <View>
            <StatusBar backgroundColor='#c60607'/>
            <View style={styles.header}>
                <View style={{flexDirection : 'row', alignItems : 'center'}}>
                    <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                        <Ionicons name='menu' style={styles.icon} color='white' />
                    </TouchableOpacity>
                    <Text style={styles.logo}>DropMart</Text>
                </View>
                <View style={{flexDirection : 'row'}}>
                    <TouchableOpacity style={{marginHorizontal : 10}} onPress={()=>navigation.navigate('Search')}>
                        <Ionicons name='search-outline' style={styles.icon} color='white'/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginHorizontal : 10}} onPress={()=>navigation.navigate('Wishlist')}>
                        <Ionicons name='heart-outline' style={styles.icon} color='white'/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('Cart')}>
                        <Ionicons name='cart' style={styles.icon} color='white' />
                        <Text style={styles.counter}>{counter}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
            <View style={styles.parentSearch}>
                <View style={styles.searchBox}>
                    <Text style={{paddingLeft : 5, color : 'grey'}}>Explore Products</Text>
                    <View style={styles.searchIcon}>
                        <Ionicons name='search-outline' style={styles.icon} color='white' />
                    </View>
                </View>
            </View>
            </TouchableOpacity> */}
        </View>
    )
}

const styles= StyleSheet.create({
    header : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        height : 50,
        paddingHorizontal : 20,
        alignItems : 'center',
        backgroundColor : '#c60607',
    },
    icon : {
        color : 'white',
        fontSize : 30
    },
    logo : {
        color : 'white',
        fontSize : 25,
        textAlignVertical : 'center',
        paddingHorizontal : 10,
        fontWeight : 'bold'
    },
    search : {
        paddingHorizontal : 10,
    },
    searchBox : {
        borderWidth : 2,
        padding : 2,
        borderRadius : 10,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        borderColor : 'red',
    },
    parentSearch : {
        backgroundColor : 'white',
        width : Dimensions.get('window').width,
        padding : 5,
    },
    searchIcon : {
        backgroundColor : 'red',
        paddingVertical : 5,
        paddingHorizontal : 10,
        borderRadius : 10
    },
    counter : {
        color : 'red',
        fontSize : 15,
        position : 'absolute',
        top : -5,
        right : -10,
        backgroundColor : 'white',
        paddingHorizontal : 5,
        borderRadius : 10,
        borderColor : 'red',
        borderWidth : 1,
        fontWeight : 'bold'
    }
})

const mapStateToProps = (state) => {
    return {
        cart : state.cart.cart
    }
}

export default connect(mapStateToProps)(Header)