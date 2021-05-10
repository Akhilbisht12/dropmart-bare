import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screens/Home";
import SignUp from "../Screens/Auth/SignUp";
import Login from '../Screens/Auth/Login'
import MyAccount from '../Screens/Auth/MyAccount'
import Cart from '../Screens/CheckoutScreen/Cart';
import OnBoardingScreen from '../Screens/OnBoardingScreens/OnBoardingScreen';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
import CatProducts from '../Screens/CatProducts';
import SingleOrder from "../Screens/SingleOrder";
import Search from "../Screens/Search";
import MyOrders from "../Screens/MyOrders";
import BrandScreen from '../Screens/BrandScreen'
import SingleProduct from "../Screens/SingleProduct";
import OrderSummary from "../Screens/CheckoutScreen/OrderSummary";
import BottomNavigators from "./BottomNavigators";
import { connect } from "react-redux";
import Account from "../Screens/MyAccount/Account";
import Chat from "../Screens/Chat";
import Address from "../Screens/MyAccount/Address";
import Earnings from "../Screens/MyAccount/Earnings";
import Details from "../Screens/OnBoardingScreens/Details";
import Axios from 'axios'
import Wishlist from "../Screens/Wishlist";
import BankDetails from "../Screens/MyAccount/BankDetails";

const data = {
  screenOne : {
    title : 'No More Burden Of Bags',
    subTitle : 'Shop on our app and get free home delivery within 10km',
    navigate : 'ScreenTwo',
    image : require('../Screens/OnBoardingScreens/onbOne.png'),
    a : 7,
    b : 5,
    c : 5,
  },
  screenTwo : {
    title : 'Fresh Grocery',
    subTitle : 'Keep yourself and your family safe, eat healthy, stay fit.',
    navigate : 'ScreenThree',
    image : require('../Screens/OnBoardingScreens/onbTwo.png'),
    a : 5,
    b : 7,
    c : 5,
  },
  screenThree : {
    title : 'Free Doorstep Delivery',
    subTitle : 'Free Doorstep Delivery within 10km and minimal charges after that.',
    navigate : 'Home',
    image : require('../Screens/OnBoardingScreens/onbThree.png'),
    a : 5,
    b : 5,
    c : 7,
  }
}

function ScreenOne(){
  return <OnBoardingScreen data={data.screenOne}/>
}

 function ScreenTwo(){
   return <OnBoardingScreen data={data.screenTwo}/>
 }

 function ScreenThree(){
  return <OnBoardingScreen data={data.screenThree}/>
}


const StackNavigator = ({profile, shipping, wishlist}) => {

  // console.log(profile)
  // console.log(billing)
  const Stack = createStackNavigator();
  // const [initialRoute, setInitialRoute] = useState('');
  // useEffect(()=>{
  //   AsyncStorage.getItem('user')
  //   .then((data)=>{
  //     var user = JSON.parse(data)
  //     // console.log(user)
  //     if(user===null || user.length===0 || user===undefined){setInitialRoute('Login')}
  //     else{setInitialRoute('Home')}
  //     setLoading(false);
  //   })
  // },[])


// if(loading) return<ActivityIndicator/>
// else{
    return (
      <Stack.Navigator initialRouteName={profile.email?'Home':'Login'} headerMode='none'>
        <Stack.Screen name='ScreenOne' component={ScreenOne}/>
        <Stack.Screen name='ScreenTwo' component={ScreenTwo}/>
        <Stack.Screen name='ScreenThree' component={ScreenThree}/>
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Summary" component={OrderSummary} />
        <Stack.Screen name="Signup" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MyAccount" component={Account} />
        <Stack.Screen name="Home" component={BottomNavigators} />
        <Stack.Screen name="CatProducts" component={CatProducts} />
        <Stack.Screen name="SingleOrder" component={SingleOrder} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="MyOrders" component={MyOrders} />
        <Stack.Screen name="BrandScreen" component={BrandScreen} />
        <Stack.Screen name="SingleProduct" component={SingleProduct} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Address" component={Address} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Wishlist" component={Wishlist} />
        <Stack.Screen name="Earnings" component={Earnings} />
        <Stack.Screen name="BankDetails" component={BankDetails} />
      </Stack.Navigator>
    )
  }
// };

const mapStateToProps = (state) => {
  return {
    profile : state.user.profile,
    billing : state.user.billing,
    shipping : state.user.shipping,
    wishlist : state.wishlist.wishlist
  }
}

export default connect(mapStateToProps)(StackNavigator)