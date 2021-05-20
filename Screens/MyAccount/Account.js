import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, Linking } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'
import TitleHeader from '../../Components/TitleHeader'
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { deleteUser } from '../../Redux/User/User-Action'
import auth from '@react-native-firebase/auth';


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



const Account = ({profile,deleteUser}) => {
    
    const navigation = useNavigation()
    const handleLogout = () => {
        console.log('hit')
        AsyncStorage.clear();
        navigation.navigate('Login', {parent : 'logout'})
        deleteUser()
        auth().signOut()
    }

    return (
        <View style={styles.main}>
            <TitleHeader title='My account'/>
            <ScrollView>
                <View>
                    <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
                        <View style={styles.flexBetween}>
                            <View style={styles.flexBetween}>
                                <Image style={styles.userImage} source={{uri : 'https://secure.gravatar.com/avatar/922cd3807dcf9d327d6d602434b6ddf0?s=96&d=mm&r=g'}}/>
                                <Text style={styles.username}>{profile.email}</Text>
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
                    <TouchableOpacity onPress={()=>Linking.openURL('https://dropmarts.com/help-faq/')}>
                        <View style={styles.listMain}>
                            <Icon name='information-circle' color='grey' size={30}/>
                            <Text style={styles.listTitle}>Help & FAQ</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handleLogout()}>
                        <View style={styles.listMain}>
                            <Icon name='log-out' color='grey' size={30}/>
                            <Text style={styles.listTitle}>Logout</Text>
                        </View>
                    </TouchableOpacity>          
                    {/* <List name='settings' title='Settings' navigate='Cart'/> */}
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
        height : 50,
        borderRadius : 25
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

const mapStateToProps = (state) => {
    return {
        profile : state.user.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteUser : ()=>dispatch(deleteUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)