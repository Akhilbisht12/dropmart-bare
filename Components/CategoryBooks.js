import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import ProductLoader from '../Loaders/ProductLoader';
import ProductComp from './ProductComp';
import WooCommerce from './WooCommerce';
import { useNavigation } from '@react-navigation/native';

const CategoryBooks = ({id,name}) => {
    const navigation = useNavigation()
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        WooCommerce.get("products", {
            category : id,
            per_page : 10
        })
        .then((response) => {
            // console.log(response);
            setBooks(response)
            setLoading(false)
        })
        .catch((error) => {
            console.log(error.response);
        });

    },[])
    if(loading) return <ProductLoader/>
    return (
        <View style={{marginVertical : 10}}>
            <View style={{flexDirection : 'row', justifyContent : 'space-between', paddingHorizontal : 15, alignItems : 'center'}}>
                <Text style={{fontSize : 25, fontWeight : 'bold'}}>{name}</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('CatProducts', {item : {id : id, name : name}})}>
                    <Text style={{color : '#c60607'}}>View All</Text>
                </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {books.map((item)=>{
                        return(item.images.map((image)=>{
                        return(<ProductComp key={item.id} item={item} image={image.src}/>);
                    }))
                })}
            </ScrollView>
        </View>

        
    )
}

export default CategoryBooks
