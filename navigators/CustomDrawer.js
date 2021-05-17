import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, Dimensions, StatusBar, TouchableOpacity, Linking } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../Components/Loader';
import { connect } from 'react-redux';
import { deleteUser } from '../Redux/User/User-Action';

const CustomDrawer = (props,deleteUser) => {

    const handleLogout = () => {
        AsyncStorage.clear()
        props.navigation.navigate('Login')
    }

    return (
        <View style={{flex : 1}}>
            <DrawerContentScrollView>
                <View style={{justifyContent :'space-between', height : Dimensions.get('window').height-StatusBar.currentHeight*2}}>
                    <View>
                        <View style={styles.userPanel}>
                            <View style={styles.avatarView}>
                                <Image style={styles.avatar} source={require('../assets/icon.png')}/>
                            </View>
                            <Text style={styles.username}>DropMart</Text>
                            <View style={{flexDirection : 'row', marginVertical : 5}}>
                                <TouchableOpacity style={{marginHorizontal : 10}} onPress={()=>Linking.openURL('https://www.instagram.com/upgrate.in/')}>
                                    <Icon name='instagram' color='white' size={20}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={{marginHorizontal : 10}} onPress={()=>Linking.openURL('https://www.facebook.com/upgrate.in')}>
                                    <Icon name='facebook-square' color='white' size={20}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={{marginHorizontal : 10}} onPress={()=>Linking.openURL('https://wa.me/+918979877325')}>
                                    <Icon name='whatsapp' color='white' size={20}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={{marginHorizontal : 10}} onPress={()=>Linking.openURL(`tel:${8979877325}`)}>
                                    <Icon name='phone' color='white' size={20}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <DrawerItem
                            icon={()=>(
                                <Icon name='home' color='#c60607' size={20}/>
                            )}
                            label='Home'
                            onPress={()=>{props.navigation.navigate('Home')}}
                            />
                            <DrawerItem
                            icon={()=>(
                                <Icon name='shopping-cart' color='#c60607' size={20}/>
                            )}
                            label='Cart'
                            onPress={()=>{props.navigation.navigate('Cart')}}
                            />
                            <DrawerItem
                            icon={()=>(
                                <Icon name='box' color='#c60607' size={20}/>
                            )}
                            label='My Orders'
                            onPress={()=>{props.navigation.navigate('MyOrders')}}
                            />
                            <DrawerItem
                            icon={()=>(
                                <Icon name='user-edit' color='#c60607' size={20}/>
                            )}
                            label='My Account'
                            onPress={()=>{props.navigation.navigate('Profile')}}
                            />
                            <DrawerItem
                            icon={()=>(
                                <Icon name='user-slash' color='#c60607' size={20}/>
                            )}
                            label='Logout'
                            onPress={()=>handleLogout()}
                            />
                        </View>
                    </View>
                    <View style={{alignItems : 'center', backgroundColor : '#c60607', paddingVertical : 5}}>
                        <TouchableOpacity style={{flexDirection : 'row'}} onPress={()=>Linking.openURL('https://www.upgrate.in/')}>
                            <Text style={{color : 'white'}}>Developed By</Text>
                            <Text style={{color : 'white', fontWeight : 'bold'}}> Upgrate.in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </DrawerContentScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    avatar : {
        height : 60,
        width : 60,
        borderRadius : 50
    },
    avatarView : {
       
    },
    userPanel : {
        alignItems : 'center',
        paddingVertical : 20,
        backgroundColor : '#c60607',
        marginBottom : 20,
        marginTop : 0
    },
    username : {
        fontSize : 20,
        fontWeight : 'bold',
        color : 'white'
    }
})

const mapDispatchToProps = (dispatch) =>{
    return {
        deleteUser : ()=>dispatch(deleteUser())
    }
}

export default connect(null, mapDispatchToProps)(CustomDrawer)