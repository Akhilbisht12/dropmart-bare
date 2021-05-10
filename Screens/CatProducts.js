import React, { useEffect, useState } from 'react'
import { ScrollView, FlatList, TouchableOpacity, Text, View, Alert } from 'react-native';
import WooCommerce from '../Components/WooCommerce';
import ProductComp from '../Components/ProductComp'
import ProductLoader from '../Loaders/ProductLoader';
import  Icon  from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import TitleHeader from '../Components/TitleHeader';

export default function CatProducts({route}) {
    const navigation = useNavigation();
    const item = route.params.item;
    var temp =[]
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    useEffect(()=>{
        WooCommerce.get('products', {
            category : item.id,
            per_page : 20,
            page : page
        })
        .then(res=>{
            if(res.length!==0){
                setProducts(res);
            }else Alert.alert('Product Message', 'You have browsed all products')
            setLoading(false)
        })
    },[page])

    const handlePageChange = () =>{
        setLoading(true);
        setPage(page+1)
    }

    const renderItem = (item,i) => {
        if(i%2==0){
            temp=[];
            item.images.map((image)=>{
                temp.push(<ProductComp key={item.id} item={item} image={image.src}/>);
                })
        }else if(i === products.length-1){
            return(
                <View>
                    <TouchableOpacity onPress={handlePageChange} style={{alignItems : 'center', paddingVertical : 10, backgroundColor : 'red', marginBottom : 5}}>
                        <Text style={{color : 'white'}}>Load More</Text>
                    </TouchableOpacity>
                </View>
                
            )
        }else{
            return(
                <View style={{flexDirection : 'row', flexWrap : 'wrap', justifyContent : 'center'}}>
                    {temp[0]}
                    {item.images.map((image)=>{
                        return (<ProductComp key={item.id} item={item} image={image.src}/>);
                        })}
                </View>
            )
        }
    }

    if(loading) return(
        <View>
            <ScrollView>
                <ProductLoader/>
                <ProductLoader/>
            </ScrollView>
        </View>
        
    )
    else{
        return (
            <View style={{flex : 1}}>
                <TitleHeader title={item.name} parent='Home'/>
                <FlatList
                data={products}
                renderItem={({item,index})=>renderItem(item,index)}
                keyExtractor={item=>(item.id).toString()}
                />
            </View>
        )
}
}
