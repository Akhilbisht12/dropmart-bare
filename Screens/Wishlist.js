import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import TitleHeader from '../Components/TitleHeader';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { addToCart } from '../Redux/Cart/Cart-Action';
import { removeFromWishlist } from '../Redux/Wishlist/Wishlist-action';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

const { width, height} = Dimensions.get('window')
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
const Wishlist = ({wishlist, addToCart, removeFromWishlist}) => {

    const WishlistComp = ({item}) => {
        return(
            <View style={styles.wishlistComp}>
                <View>
                    <Image style={styles.wishImg} source={{uri : item.image}}/>
                </View>
                <View>
                    <View style={{flexDirection : 'row', justifyContent : 'space-between', paddingHorizontal : 10, paddingVertical : 5}}>
                        <Text style={{fontSize : 16, color : 'gray'}}>{item.name}</Text>
                        <TouchableOpacity>
                            <Ionicons name='heart-outline' size={30} color='#c60607'/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection : 'row', paddingHorizontal : 10, alignItems : 'center'}}>
                        <Text style={{backgroundColor : 'green', paddingHorizontal : 5, color : 'white', fontSize : 18, borderRadius : 10}}>%</Text>
                        <Text> {Math.floor((item.regular_price-item.sale_price)*100/item.regular_price)} OFF from market price</Text>
                    </View>
                    <View style={{flexDirection : 'row', paddingHorizontal : 10}}>
                        <Text style={styles.bdPrice}>₹ {item.price}</Text>
                        <Text style={[styles.bdPrice,{color : 'gray'}]}> FREE Delivery</Text>
                    </View>
                    <View style={styles.bottomView}>
                        <TouchableOpacity style={[styles.shareBtn,{borderColor : 'green'}]} onPress={()=>share()}>
                            <Text style={{fontSize : 20, color : 'green'}}>Share</Text>
                            <Ionicons color='green' style={{marginHorizontal : 5}} size={25} name='logo-whatsapp'/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.shareBtn,{backgroundColor : '#c60607', borderColor : '#c60607'}]} onPress={()=>addToCart(item)}>
                            <Text style={{fontSize : 20, color : 'white'}}>Add To Cart</Text>
                            <Ionicons size={25} color='white' name='cart-outline'/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View>
            <TitleHeader title='Wishlist' parent='Home'/>
            <ScrollView>
                {wishlist.map((item)=>{
                    return(
                        <WishlistComp key={item.id} item={item}/>
                    )
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    main : {
        flex : 1,
    },
    wishlistComp : {
        marginVertical : 5,
        backgroundColor : 'white',
        paddingVertical : 15
    },
    wishImg : {
        width :width,
        height : height*0.3
    },
    bdTxt : {
        fontWeight : 'bold',
        fontSize : 20
    },
    bdPrice : {
        fontSize : 20,
        fontWeight : 'bold'
    },
    bottomView : {
        flexDirection : 'row',
        justifyContent : 'space-around',
        alignItems : 'center',
        marginVertical : 5
    },
    shareBtn : {
        flexDirection : 'row',
        alignItems : 'center',
        borderRadius : 5,
        paddingHorizontal : 10,
        paddingVertical : 5,
        width : width*0.45,
        justifyContent : 'center',
        borderWidth : 1
    },
    icon : {
        backgroundColor : 'red',
        borderRadius : 5,
        color : 'white',
        padding : 3
    }

})

const mapStateToProps = (state) => {
    return {
        wishlist : state.wishlist.wishlist
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart : (item)=>dispatch(addToCart(item)),
        removeFromWishlist : (id)=>dispatch(removeFromWishlist(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Wishlist)
