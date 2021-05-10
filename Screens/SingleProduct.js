import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Share } from 'react-native'
import TitleHeader from '../Components/TitleHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import Ionicons from 'react-native-vector-icons/Ionicons'
import WooCommerce from '../Components/WooCommerce';
import Loader from '../Components/Loader';
import Rating from '../Components/Rating';
const {height, width} = Dimensions.get('window')

export default function SingleProduct({route}) {
    const item = route.params.item;
    const image = route.params.image;
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState([])
    const regex = /(<([^>]+)>)/ig;
    const result = item.description.replace(regex, '');

    useEffect(()=>{
        WooCommerce.get('products/reviews',{product : item.id})
        .then(response=>{
            setReviews(response)
            setLoading(false);
        })
    },[])

    const share = async()=> {
        try {
            const sharedes = await Share.share({
              message: result,
            });
        }catch(err){
              console.log('Error =>', err);
          }
      }

    const shareImg = async()=> {
        const url = await FileSystem.downloadAsync(image , FileSystem.documentDirectory + "tmp.png");
        var messageText = 'Text that you want to share goes here';
        const options = {
           mimeType: 'image/jpeg',
           dialogTitle: messageText,
        };
          try{
              const shareResponse = await Sharing.shareAsync(url.uri, options);
          }catch(err){
              console.log('Error =>', err);
          }
      }

      if(loading) return <Loader/>
      else {
        return (
            <View style={styles.main}>
                <TitleHeader title={item.name.substring(0,20)}/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.productContainer}>
                        <Image style={styles.image} source={{uri : image}}/>
                        <View style={{width : width, backgroundColor : 'white', padding : 10}}>
                            <Text style={{fontSize : 18, marginHorizontal : 10}}>{item.name}</Text>
                            <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>
                                <Text style={{fontSize : 22, fontWeight : 'bold', marginHorizontal : 10}}>₹ {item.regular_price}</Text>
                                <TouchableOpacity><Ionicons name='heart-outline' size={30} style={{color : '#c60607'}}/></TouchableOpacity>
                            </View>
                            <View style={{flexDirection : 'row', paddingHorizontal : 10}}>
                                <Text style={{backgroundColor : 'green', color : 'white', paddingHorizontal : 5, borderRadius : 10}}>%</Text>
                                <Text> {Math.floor((item.regular_price-item.sale_price)*100/item.regular_price)} OFF from market price</Text>
                            </View>
                            <Text style={{fontSize : 15, fontWeight : 'bold', color : 'gray', marginHorizontal : 10, marginVertical : 5}}>Price inculsive of GST</Text>
                            <View style={styles.flexStart}>
                                <Ionicons style={styles.icon} name='pricetag' size={20}/>
                                <Text> Free Shipping</Text>
                            </View>
                            <View style={styles.flexStart}>
                                <Ionicons style={styles.icon} name='cube' size={20}/>
                                <Text> Dispatch in 2-3 days</Text>
                            </View>
                        </View>
                        <View style={styles.productDetails}>
                            <Text style={styles.detailTitle}>Product Details</Text>
                            <Text>{result}</Text>
                            <TouchableOpacity style={styles.copyBtn} onPress={()=>share()}>
                                <Text style={{color : 'red', fontSize : 18}}>Copy</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.ease}>
                            <View style={styles.easeView}>
                                <Ionicons name='wallet' style={{backgroundColor : 'white', padding : 5, borderRadius : 20}} color='#c60607' size={30}/>
                                <Text style={styles.easeText}>Free Cash On Delivery</Text>
                            </View>
                            <View style={styles.easeView}>
                                <Ionicons name='wallet' style={{backgroundColor : 'white', padding : 5, borderRadius : 20}} color='#c60607' size={30}/>
                                <Text style={styles.easeText}>7 Days Easy Returns</Text>
                            </View>
                            <View style={styles.easeView}>
                                <Ionicons name='wallet' style={{backgroundColor : 'white', padding : 5, borderRadius : 20}} color='#c60607' size={30}/>
                                <Text style={styles.easeText}>Lowest Price Guaranteed</Text>
                            </View>
                        </View>
                        <View>
                            {reviews.length!==0?reviews.map((reviewItem)=>{
                                return(
                                    <View key={reviewItem.id} style={{width : width, padding : 20, borderTopColor : 'lightgrey', borderTopWidth : 1, marginVertical : 5}}>
                                        <View style={{flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center'}}>
                                            <View style={{flexDirection : 'row', alignItems : 'center'}}>
                                                <Image style={{height : 30, width : 30, borderRadius : 20}} source={{uri : 'https://secure.gravatar.com/avatar/922cd3807dcf9d327d6d602434b6ddf0?s=24&d=mm&r=g'}}/>
                                                <Text style={{marginHorizontal : 10, fontSize : 20, fontWeight : 'bold'}}>{reviewItem.reviewer}</Text>
                                            </View>
                                            <View style={{flexDirection : 'row'}}>
                                                <Rating rating={reviewItem.rating}/>
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={{margin : 10}}>{reviewItem.review.replace(regex, '')}</Text>
                                        </View>
                                    </View>
                                )
                            }):console.log('')}
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.bottomNav}>
                    <TouchableOpacity onPress={()=>shareImg()} style={[styles.btn,{backgroundColor : 'green', borderColor : 'green'}]}>
                        <Text style={[styles.btnText,{color : 'white'}]}>Share</Text>
                        <Icon color='white' style={{marginHorizontal : 5}} size={20} name='whatsapp'/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn,{borderColor : 'red'}]}>
                        <Text style={[styles.btnText,{color :'red'}]}>Add To Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
      }
}

const styles = StyleSheet.create({
    main : {
        flex : 1
    },
    productContainer : {
        display : 'flex',
        alignItems : 'center'
    },
    image : {
        height : height*0.7,
        width : width-20,
        resizeMode : 'cover'
    },
    productDetails : {
        width : width,
        padding : 20,
        backgroundColor : 'white',
        marginVertical : 10
    },
    detailTitle : {
        fontSize : 25
    },
    flexStart : {
        flexDirection : 'row',
        paddingHorizontal : 10,
        alignItems : 'center',
        marginVertical : 3
    },
    icon : {
        color : '#463838'
    },
    ease : {
        flexDirection : 'row',
        alignItems : 'stretch'
    },
    easeView : {
        width : width*0.32,
        alignItems : 'center',
        paddingVertical : 20,
        margin : 1,
        backgroundColor : '#E7EEFF'
    },
    easeText : {
        width : width*0.25,
        fontSize : 15,
        textAlign : 'center',
        fontWeight : '700'
    },
    copyBtn : {
        position : 'absolute',
        top : 5,
        right : 10,
        paddingHorizontal : 10,
        paddingVertical : 5
    },
    bottomNav : {
        width,
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-around',
        paddingVertical : 10,
        borderTopColor : 'lightgrey',
        borderTopWidth : 1
    },
    btn : {
        borderWidth : 1,
        paddingVertical : 8,
        paddingHorizontal : 45,
        borderRadius : 5,
        display : 'flex',
        flexDirection : 'row'
    },
    btnText : {
        fontSize : 18
    }
})