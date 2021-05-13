import React, {useState, useEffect} from 'react'
import { View, Text, Dimensions, ScrollView, Image } from 'react-native'
import {FlatListSlider} from 'react-native-flatlist-slider';
import WooCommerce from '../Components/WooCommerce';
import HeaderLoader from '../Loaders/HeaderLoader'

const {width} = Dimensions.get('window')

export default function FlatCarousel({height, start}) {
      const end = start+2
      const [loading, setLoading] = useState(true);
      const [images, setImages] = useState([])
      useEffect(()=>{
          WooCommerce.get("products/categories",{
              parent : 36
          })
          .then((response) => {
              const data = []
              response.map((item,i)=>{
                data.push({
                  id : item.id,
                  url : item.image.src
                })
                if(i===response.length-1){
                    setImages(data)
                    setLoading(false)
                }
              })
          })
          .catch((error) => {
              console.log(error.response);
          });
      },[])

      if(loading) return <HeaderLoader/>
      else{
        return (
          <FlatListSlider
            data={images.slice(start, end)}
            imageKey={'url'}
            timer={5000}
            height={height}
            onPress={()=>{}}
            indicatorActiveWidth={20}
          />
          // <ScrollView horizontal pagingEnabled  style={{borderRadius : 5}}>
          //   {images.map((item)=>{
          //     return(
          //       <Image key={item.id} style={{width : width-10, height : height*0.15, resizeMode : 'contain', margin : 5, borderRadius : 20}} source={{uri : item.url}}/>
          //     )
          //   })}
          // </ScrollView>
        )
      }
}
