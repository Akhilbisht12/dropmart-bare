import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ImageBackground, ScrollView } from 'react-native'
import Ionicons from'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import Loader from '../../Components/Loader'
import TitleHeader from '../../Components/TitleHeader'
import WooCommerce from '../../Components/WooCommerce'
const {width, height} = Dimensions.get('window')
const Earnings = ({navigation, profile}) => {

    const [data, setData] = useState([])
    const [order, setOrder] = useState(0)
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        axios.get(`https://www.dropmarts.com/wp-json/wp/v2/users/${profile.id}`,{
            headers : {
                Authorization : `Bearer ${profile.token}`
            }
        })
        .then(response=>{
            WooCommerce.get("orders",{customer : profile.id})
            .then((wooresponse) => {
                console.log(wooresponse);
                setData(response.data)
                setOrder(wooresponse.length)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error.response);
            });

        })
    },[])

    if(loading) return <Loader/>
    else {
        return (
            <View style={styles.main}>
                <TitleHeader title='My Earnings' parent='Home'/>
                <ScrollView>
                    <View style={styles.scrollIn}>
                        <View style={styles.boxParent}>
                            <View style={styles.box}>
                                <Text style={styles.highTxt}>Total Orders</Text>
                                <Text style={[styles.highTxt,{color : '#c60607', fontSize : 35}]}>{order}</Text>
                            </View>
                            <View  style={styles.box}>
                                <Text style={styles.highTxt}>Payout</Text>
                                <Text style={[styles.highTxt,{color : '#c60607', fontSize : 35}]}>{data.pending_payment}</Text>
                            </View>
                            <View  style={styles.box}>
                                <Text style={styles.highTxt}>Total Earnings</Text>
                                <Text style={[styles.highTxt,{color : '#c60607', fontSize : 35}]}>{data.total_earnings}</Text>
                            </View>
                        </View>
                        <View style={styles.summary}>
                            <View style={styles.detailCont}>
                                <Text style={[styles.highTxt,{borderBottomWidth : 1, borderColor : 'lightgray', paddingBottom : 10, marginBottom : 10}]}>Next Payment Release Date : May 15</Text>
                                <Text>see details of your earnings in this payment cycle.</Text>
                                <Text style={[styles.highTxt,{color : '#c60607', marginVertical : 10, fontSize : 20}]}>{data.pending_payment}</Text>
                            </View>
                            <View style={styles.detailCont}>
                                <Text style={[styles.highTxt,{borderBottomWidth : 1, borderColor : 'lightgray', paddingBottom : 10, marginBottom : 10}]}>Total Money Earned Till date</Text>
                                <Text style={[styles.highTxt,{color : '#c60607', marginVertical : 10, fontSize : 20}]}>{data.total_earnings}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main : {
        flex : 1
    },
    scrollIn : {
        width :width,
        alignItems : 'center'
    },
    boxParent : {
        flexDirection : 'row',
        marginVertical : 10
    },
    box : {
        alignItems : 'center',
        paddingVertical : 5,
        width : width*0.3,
        backgroundColor : 'white',
        margin : 4,
        borderColor : 'lightgray',
        borderWidth : 1,
        borderRadius : 5,
        height : height*0.15,
        justifyContent : 'space-evenly'
    },
    highTxt : {
        fontWeight : 'bold'
    },
    summary : {
        width : width
    },
    detailCont : {
        borderWidth : 1,
        borderRadius : 5,
        padding : 10,
        margin : 8,
        borderColor : 'lightgray'
    }
    
})

const mapStateToProps = (state) => {
    return {
        profile : state.user.profile
    }
} 

export default connect(mapStateToProps)(Earnings)
