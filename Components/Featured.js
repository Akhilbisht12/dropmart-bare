import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import ProductComp from './ProductComp'
import WooCommerce from './WooCommerce'
import { useNavigation } from '@react-navigation/native';
import ProductLoader from '../Loaders/ProductLoader'

const Featured = () => {
    const navigation = useNavigation()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        WooCommerce.get('products', {featured : true})
        .then(response=>{
            console.log(response)
            setData(response)
            setLoading(false)
        })
    }, [])

    if(loading) return <ProductLoader/>
    return (
        <View style={{marginVertical : 10}}>
            <View style={{flexDirection : 'row', justifyContent : 'space-between', paddingHorizontal : 10, alignItems : 'center', marginVertical : 10}}>
                <Text style={{fontSize : 25, fontWeight : 'bold'}}>Top Savers Today</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('CatProducts', {item : {id : 38, name : 'Top Savers'}})}>
                    <Text style={{color : '#c60607'}}>View all</Text>
                </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {data.map((item)=> {
                    if(item){
                        return(item.images.map((image)=>{
                        return(<ProductComp key={item.id} item={item} image={image.src}/>);
                    }))}
                })}
            </ScrollView>
        </View>
    )
}
export default Featured
