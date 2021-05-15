import React, {useEffect, useState} from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import Loader from './Loader';
import WooCommerce from './WooCommerce';
import { useNavigation } from '@react-navigation/native';

const {width, height} = Dimensions.get('window')
const CategoryComp = () => {
    const navigation = useNavigation()
    const [cat, setCat] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        WooCommerce.get('products/categories',{parent : 0})
        .then(response=>{
            setCat(response);
            setLoading(false)
        })
    },[])

    if(loading) return <Loader/>

    return (
        <View style={{marginVertical : 10}}>
            <View style={{flexDirection : 'row', justifyContent : 'space-between', paddingHorizontal : 15, marginVertical : 10, alignItems : 'center'}}>
                <Text style={{fontSize : 25, fontWeight : 'bold'}}>Shop By Categories</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('Categories')}>
                    <Text style={{color : '#c60607'}}>View All</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection : 'row', flexWrap : 'wrap', justifyContent : 'space-evenly'}}>
                {cat.map((item, i)=>{
                    if(item.name!=='banners' &&item.name!=='Business Books' && item.name!=='Uncategorized' && i<6)
                    return(
                        <TouchableOpacity key={item.id} onPress={()=>navigation.navigate('CatProducts',{item : {id : item.id, name : item.name}})}>
                            <View key={item.id} style={{margin : 4, alignItems : 'center', width : width*0.45}}>
                                <Image style={{width : width*0.45, height : width*0.45, borderRadius : 5}} source={{uri : item.image.src}}/>
                                <Text style={{textAlign : 'center', fontSize : 18, marginVertical : 5}}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    )
}

export default CategoryComp
