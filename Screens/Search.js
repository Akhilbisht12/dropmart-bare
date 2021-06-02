import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, StatusBar, Dimensions, Image } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import  Icon  from 'react-native-vector-icons/FontAwesome';
import Loader from '../Components/Loader';
import ProductComp from '../Components/ProductComp'
import TitleHeader from '../Components/TitleHeader';
import WooCommerce from '../Components/WooCommerce';
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function Search({navigation}) {
    const [search, setSearch] =  useState()
    const [products, setProducts] = useState();
    const [loading, setLoading] = useState(1);

    const handleSearch = () =>{
        setLoading(2)
        WooCommerce.get("products",{
            search : search,
            per_page : 100
        })
        .then((response) => {
            console.log(response)
            setProducts(response);
            setLoading(3);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    if(loading === 2){
        return <Loader/>
    }else if(loading ===1){
        return(
            <View style={{flex : 1}}>
                <View style={styles.search}>
                    <TextInput style={{height : 40,width : Dimensions.get('window').width-100}} value={search} onChangeText={(text)=>setSearch(text)}/>
                    <TouchableOpacity onPress={handleSearch}>
                        <Icon style={styles.icon} name='search' color='white' size={20}/>
                    </TouchableOpacity>
                </View>
                <View style={{flex : 1,justifyContent : 'center', alignItems : 'center'}}>
                    <Ionicons name='book' size={100} color='#c60607'/>
                    <Text style={{fontSize : 30, color : "#c60607"}}>Find Books Of Your Choice</Text>
                </View>
            </View>
        )
    }
    else if(loading === 3 && products.length!==0) {
        return (
            <View style={{flex : 1}}>
                {/* <View style={{flexDirection : 'row', justifyContent : 'space-evenly', alignItems : 'center'}}>
                    <View style={styles.search}>
                        <TextInput style={{height : 40,width : Dimensions.get('window').width-150}} onChangeText={(text)=>setSearch(text)}/>
                        <TouchableOpacity onPress={handleSearch}>
                            <Icon style={styles.icon} name='search' color='white' size={20}/>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={()=>navigation.navigate('Cart')}>
                            <Icon name='opencart' color='#62BA03' size={30}/>
                        </TouchableOpacity>
                    </View>
                </View> */}
                <TitleHeader title='Search Product' parent='Home'/>
                <View style={styles.search}>
                    <TextInput style={{height : 40,width : Dimensions.get('window').width-100}} value={search} onChangeText={(text)=>setSearch(text)}/>
                    <TouchableOpacity onPress={handleSearch}>
                        <Icon style={styles.icon} name='search' color='white' size={20}/>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={{flexWrap : 'wrap', justifyContent : 'center', flexDirection : 'row'}}>
                        {products.map((item)=>{
                            return item.images.map((image,i)=>{
                                if(i==0){
                                    return(<ProductComp key={item.id} item={item} image={image.src}/>)
                                }
                            })
                        })}
                    </View>
                </ScrollView>
            </View>
        )
    }else if(loading === 3 && products.length===0){
        return(
            <View style={{flex : 1}}>
                <View style={styles.search}>
                    <TextInput style={{height : 40,width : Dimensions.get('window').width-100}} value={search} onChangeText={(text)=>setSearch(text)}/>
                    <TouchableOpacity onPress={handleSearch}>
                        <Icon style={styles.icon} name='search' color='white' size={20}/>
                    </TouchableOpacity>
                </View>
                <View style={{flex : 1,justifyContent : 'center', alignItems : 'center'}}>
                    <Ionicons name='book' size={100} color='#c60607'/>
                    <Text style={{fontSize : 30, color : "red"}}>No Products Found</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    search : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        borderWidth : 1,
        margin : 10,
        borderRadius : 5,
        borderColor : '#c60607',
        paddingHorizontal : 5
    },
    icon : {
        backgroundColor : '#c60607',
        paddingHorizontal : 10,
        paddingVertical : 5,
        borderRadius : 5
    }
})