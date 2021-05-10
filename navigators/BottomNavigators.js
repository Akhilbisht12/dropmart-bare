import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home';
import MyOrders from '../Screens/MyOrders';
import MyAccount from '../Screens/Auth/MyAccount';
import Search from '../Screens/Search';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Account from '../Screens/MyAccount/Account';
import Chat from '../Screens/Chat';
import Category from '../Screens/Category';
const Tab = createBottomTabNavigator();

export default function BottomNavigators() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused? 'home': 'home-outline';
        }else if(route.name === 'Categories'){
          iconName = focused ? 'book' : 'book-outline'
        } else if (route.name === 'Orders') {
          iconName = focused ? 'cube' : 'cube-outline';
        }else if (route.name === 'Chat'){
          iconName = focused ? 'chatbox' : 'chatbox-outline'
        }else if(route.name === 'My Account'){
            iconName = focused ? 'people-circle' : 'people-circle-outline'
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: '#c60607',
      inactiveTintColor: 'gray',
    }}
  >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Categories" component={Category} />
        <Tab.Screen name="Orders" component={MyOrders} />
        <Tab.Screen name="Chat" component={Chat} />
        <Tab.Screen name="My Account" component={Account} />
      </Tab.Navigator>
  );
}