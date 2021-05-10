import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Ionicon from 'react-native-vector-icons/Ionicons'
export default function TitleHeader({title, parent, navigation}) {
    return (
        <View style={styles.header}>
            <View style={{flexDirection : 'row', alignItems : 'center'}}>
                <TouchableOpacity>
                    <Ionicon style={styles.icon} name='chevron-back-outline'/>
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={{flexDirection : 'row', alignItems : 'center'}}>
                <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
                    <Ionicon style={styles.icon} name='search-outline'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
                    <Ionicon style={styles.icon} name='heart-outline'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('Cart')}>
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
