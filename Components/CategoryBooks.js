import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import ProductLoader from '../Loaders/ProductLoader';
import ProductComp from './ProductComp';
import WooCommerce from './WooCommerce';

const CategoryBooks = ({id,name}) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        WooCommerce.get("products", {
            category : id,
            per_page : 4
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
        <View style={{alignItems : 'center', marginVertical : 10}}>
            <Text style={{fontSize : 30}}>{name}</Text>
            <View style={{flexWrap : 'wrap', flexDirection : 'row', justifyContent : 'center'}}>
                {books.map((item)=>{
                    if(item){
                        return(item.images.map((image)=>{
                        return(<ProductComp key={item.id} item={item} image={image.src}/>);
                    }))}
                })}
            </View>
        </View>

        
    )
}

export default CategoryBooks
