import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'
import TitleHeader from '../../Components/TitleHeader'
import { useNavigation } from '@react-navigation/native';

const List = ({name, title, navigate}) => {
    const navigation = useNavigation()
    return(
        <TouchableOpacity onPress={()=>navigation.navigate(`${navigate}`)}>
            <View style={styles.listMain}>
                <Icon name={name} color='grey' size={30}/>
                <Text style={styles.listTitle}>{title}</Text>
            </View>
        </TouchableOpacity>
        
    )
}

export default function Account() {
    const navigation = useNavigation()
    return (
        <View style={styles.main}>
            <TitleHeader title='My account'/>
            <ScrollView>
                <View>
                    <TouchableOpacity>
                        <View style={styles.flexBetween}>
                            <View style={styles.flexBetween}>
                                <Image style={styles.userImage} source={{uri : 'https://www.tidio.com/wp-content/themes/tidio-wptheme/assets/product-pages/lp-chatbots/jano@2x.png'}}/>
                                <Text style={styles.username}>Username</Text>
                            </View>
                            <View>
                                <Icon name='chevron-forward' size={30}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <List name='cube' title='My Orders' navigate='MyOrders'/>
                    <List name='card' title='My Earning' navigate='Earnings'/>
                    <List name='heart' title='My Wishlist' navigate='Wishlist'/>
                    <TouchableOpacity onPress={()=>navigation.navigate('Address',{parent : 'Home'})}>
                        <View style={styles.listMain}>
                            <Icon name='locate' color='grey' size={30}/>
                            <Text style={styles.listTitle}>Address</Text>
                        </View>
                    </TouchableOpacity>
                    <List name='cash' title='Bank Details' navigate='BankDetails'/>
                    <List name='information-circle' title='Help & FAQ' navigate='Cart'/>
                    <List name='settings' title='Settings' navigate='Cart'/>
                </View>
                <View style={styles.version}>
                    <Image style={styles.userImage} source={require('../../assets/icon.png')}/>
                    <Text style={{color : 'grey'}}>v 1.0.0</Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    main : {
        flex : 1,
        backgroundColor : '#e4e4e4'
    },
    flexBetween : {
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        backgroundColor : 'white',
        marginVertical : 5,
        padding : 10
    },
    userImage : {
        width : 50,
        height : 50
    },
    username : {
        fontSize : 20,
        marginHorizontal : 10
    },
    listMain : {
        display : 'flex',
        flexDirection : 'row',
        backgroundColor : 'white',
        padding : 10,
        alignItems : 'center',
        borderBottomWidth : 1,
        borderBottomColor : 'lightgrey'
    },
    listTitle : {
        fontSize : 20,
        margin : 10
    },
    version : {
        display : 'flex',
        alignItems : 'center',
        marginVertical : 10
    }
})