import React, { useEffect, useState } from 'react'
import { View, Text,Image, StyleSheet, Dimensions, ToastAndroid } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';
import {connect} from 'react-redux';
import {addToCart} from '../Redux/Cart/Cart-Action';
import Ionicon from 'react-native-vector-icons/Ionicons'
import { addToWishlist, removeFromWishlist } from '../Redux/Wishlist/Wishlist-action';

const {height, width} = Dimensions.get('window')

const ProductComp  = ({item, image, addToCart, addToWishlist, wishlist, removeFromWishlist}) => {
    var i = image.split('.')
    const[inWish, setInWish] = useState(false)
    const[disabled, setDisabled] = useState(false)
    const name = item.name.substr(0,40);
    const navigation = useNavigation();

    const CartItem = {
        name : item.name,
        image : image,
        price : item.price,
        id : item.id,
        regular_price : item.regular_price,
        sale_price : item.sale_price
    }

    useEffect(()=>{
        setInWish(false)
        wishlist.map((wish)=>{
            if(wish.id===item.id){
                setInWish(true)
            }
        })
    },[inWish, setInWish, wishlist])

    const calculateDiscount = () => {
        if(item.sale_price){
            return((Math.round(((item.regular_price-item.sale_price)/item.regular_price)*100) + '% OFF')
            )
        }else{
            return 'On Sale'
        }
    }

    const displayRegularPrice = () => {
        if(item.sale_price){
            return <Text style={{textDecorationLine : 'line-through'}}>₹ {item.regular_price}</Text>
        }
    }

    const share = async()=> {
        const url = await FileSystem.downloadAsync(image , FileSystem.documentDirectory + "tmp.png");
        console.log(url.uri)
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

    const handleWishlist = () =>{
        if(disabled){
            removeFromWishlist(item.id)
            ToastAndroid.show('Removed from wishlist', ToastAndroid.SHORT)
            setDisabled(false)
        }else{
            addToWishlist(CartItem)
            ToastAndroid.show('Added to wishlist', ToastAndroid.SHORT)
            setDisabled(true)
        }
    }

    const styles = StyleSheet.create({
        main : {
         width : width*0.45,
         height : height*0.45,
         margin : 5,
         backgroundColor : 'white',
         padding : 6,
         borderRadius : 5,
         justifyContent : 'space-between',
         borderColor : 'lightgrey',
         borderWidth : 1,
        },
        offer : {
         backgroundColor : 'green',
         width : 60,
         paddingVertical : 2,
         paddingHorizontal : 5,
         borderTopRightRadius : 10,
         borderBottomRightRadius : 10,
         color : 'white',
         position : 'absolute',
         top : 10,
        },
        imageCont : {
            alignItems : 'center'
        },
        image : {
            height : height*0.22,
            width : width*0.3,
            resizeMode : 'contain'
        },
        name : {
            fontSize : 16,
            fontWeight : 'bold',
        },
        purchase : {
            flexDirection :'row',
            alignItems : 'center',
            justifyContent : 'space-between'
        },
        price : {
            fontSize : 20,
            color : 'red',
            fontWeight : 'bold',
            marginRight : 10
        },
        icon : {
            backgroundColor : '#c60607',
            borderRadius : 5,
            color : 'white',
            padding : 10
        },
        cat : {
            fontSize : 15,
            color : 'grey'
        },
        shareBtn : {
            display : 'flex',
            flexDirection : 'row',
            alignItems : 'center',
            borderWidth : 1,
            borderColor : 'green',
            borderRadius : 5,
            paddingHorizontal : 20,
            paddingVertical : 5,
            backgroundColor : 'green'
        },
        wishlist : {
            
        }
     })


    return (
        <SafeAreaView>
            <View style={styles.main}>
                <View>
                    <TouchableOpacity onPress={()=>navigation.navigate('SingleProduct', {item, image, CartItem})}>
                        <View style={styles.imageCont}>
                            <Image style={styles.image} source={{uri : image}}/>
                        </View>
                        <Text style={styles.offer}>{calculateDiscount()}</Text>
                        <Text style={styles.name}>{name}..</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <View>
                        <View style={{flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center'}}>
                            {item.categories?<Text style={styles.cat}>{item.categories[0].name}</Text>:console.log('no category')}
                            <TouchableOpacity onPress={()=>handleWishlist()} style={styles.wishlist}>
                                <Ionicon name={inWish?'heart':'heart-outline'} color='#C60607' size={30}/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <View style={{display : 'flex', flexDirection : 'row', alignItems : 'center', justifyContent : 'flex-start'}}>
                                <Text style={styles.price}>
                                    ₹ {item.price}
                                </Text>
                                {displayRegularPrice()}
                            </View>
                        </View>
                        </View>
                    <View style={styles.purchase}>
                        <TouchableOpacity style={styles.shareBtn} onPress={()=>share()}>
                            <Text style={{fontSize : 20, color : 'white'}}>Share</Text>
                            <Icon color='white' style={{marginHorizontal : 5}} size={20} name='whatsapp'/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            addToCart(CartItem)
                            ToastAndroid.show('Added to cart', ToastAndroid.SHORT)
                        }}>
                            <Ionicon style={styles.icon} size={15} name='cart'/>
                        </TouchableOpacity>
                    </View>
                </View>
                
            </View>
        </SafeAreaView>
        
    )
}

const mapDispatchToProps = (dispatch) =>{
    return {
        addToCart : (id) =>dispatch(addToCart(id)),
        addToWishlist : (item) => dispatch(addToWishlist(item)),
        removeFromWishlist : (id) => dispatch(removeFromWishlist(id))
    }
}

const mapStateToProps = (state) => {
    return {
        wishlist : state.wishlist.wishlist
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductComp);