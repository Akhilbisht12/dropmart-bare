import React, {useEffect, useState} from 'react'
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Loader from '../Components/Loader'
import TitleHeader from '../Components/TitleHeader'
import WooCommerce from '../Components/WooCommerce'

const { width} = Dimensions.get('window')

const Category = ({navigation}) => {

    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
       WooCommerce.get('products/categories',{
           parent : 0,
           per_page : 70
        })
       .then((response)=>{
           setCategories(response)
           setLoading(false);
       })
       .catch(err=>console.log(err))
    }, [])

    if(loading) return <Loader/>
    else {
        return (
            <View style={styles.main}>
                <TitleHeader title='Categories' parent='Home'/>
                <ScrollView>
                    <View style={styles.container}>
                        {categories.map((item)=>{
                            if(item.name!=='banners' && item.name!=='Uncategorized'){
                                return(
                                    <TouchableOpacity key={item.id} onPress={()=>{navigation.navigate('CatProducts', {item : item})}} style={styles.catView}>
                                        <Image source={{uri : item.image.src}} style={{height : 100, width : 100}} />
                                        <Text style={styles.catName}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        })}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main : {
        flex : 1
    },
    container : {
        flexDirection : 'row',
        flexWrap : 'wrap',
        justifyContent : 'center',
        marginVertical : 10
    },
    catView : {
        width : width*0.45,
        alignItems : 'center',
        borderWidth : 2,
        margin : 5,
        padding : 5,
        borderColor : '#c60607'
    },
    catName : {
        fontWeight : '600',
        fontSize : 16
    }
})

export default Category
