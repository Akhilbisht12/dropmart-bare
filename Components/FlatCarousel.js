import React, {useState, useEffect} from 'react'
import { View, Text, Dimensions, ScrollView, Image } from 'react-native'
import {FlatListSlider} from 'react-native-flatlist-slider';
import WooCommerce from '../Components/WooCommerce';
import HeaderLoader from '../Loaders/HeaderLoader'

const {width, height} = Dimensions.get('window')

export default function FlatCarousel() {
      const [loading, setLoading] = useState(true);
      const [images, setImages] = useState([])
      useEffect(()=>{
          WooCommerce.get("products/categories",{
              parent : 36
          })
          .then((response) => {
              response.map((item,i)=>{
                const data = images
                data.push({
                  id : item.id,
                  url : item.image.src
                })
                setImages(data)
                if(i===response.length-1){
                  setTimeout(() => {
                    setLoading(false)
                  }, 1000);
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
            data={images}
            imageKey={'url'}
            timer={5000}
            height={width*0.6}
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
