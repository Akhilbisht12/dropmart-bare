import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity ,StyleSheet, Dimensions, ScrollView } from 'react-native'
import WooCommerce from '../Components/WooCommerce'
import Category from '../Components/Category'
import { useNavigation } from '@react-navigation/native';
import CategoryLoader from '../Loaders/CategoryLoader'
import  Icon  from 'react-native-vector-icons/FontAwesome';

export default function AuthorCircle() {
    const navigation = useNavigation();

    const [category, setCategory] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        WooCommerce.get("products/categories", {
            per_page : 20,
            parent : 262
        })
        .then((response) => {
            console.log(response)
            setCategory(response);
            setLoading(false)
        })
        .catch((error) => {
        console.log(error.response.data);
        });

    },[])
    if(loading) return <CategoryLoader/>
    else{
        return (
            <View>
                <Text style={{marginHorizontal : 15, fontSize : 25, fontWeight : 'bold'}}>Top Authors</Text>
                <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal
                style={{flexWrap : 'wrap', padding : 5}}>
                    {category.map((item)=>{
                    if(item.image){
                        var image = item.image.src;
                    }else{
                        var image = 'https://dropmarts.com/wp-content/uploads/woocommerce-placeholder.png'
                    }
                    if(item.name!=='banners' && item.name!=='Uncategorized'){
                        return(
                            <TouchableOpacity key={item.id} onPress={()=>navigation.navigate('CatProducts', {item})}>
                                <Category url={image} title={item.name}/>
                            </TouchableOpacity>
                            )
                    }
                    
                    })}
                </ScrollView>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    
})
