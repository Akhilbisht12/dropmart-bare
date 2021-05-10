import React from 'react'
import { View, Text, Image, Dimensions,StyleSheet } from 'react-native'


const { height, width}= Dimensions.get('window')


export default function Category({url,title}) {
    return (
        <View style={styles.main}>
            <Image style={styles.img}
                    source={{uri : url}}/>
            <Text style={{textAlign : 'center', fontWeight : '600', width : 70}}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    main : {
        alignItems : 'center',
        // width : width*0.3,
        borderRadius : 50,
        margin : 2,
        // height : Dimensions.get('window').height*0.145 +30,
        padding : 5,
        justifyContent : 'center'
    },
    img : {
        height : 60,
        width : 60,
        borderRadius : 50,
        marginBottom : 4,
        borderColor : 'red',
        borderWidth : 1
    }
})