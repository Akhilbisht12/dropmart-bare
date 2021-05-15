import React, { useState } from 'react'
import { View, TextInput ,Button, Image, ScrollView, Text, TouchableOpacity, Dimensions} from 'react-native'
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import Loader from '../../Components/Loader';

const {width, height } = Dimensions.get('window')
const PhoneAuth = ({navigation}) => {
    // If null, no SMS has been sent
    const [confirm, setConfirm] = useState(null);
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
  
    // Handle the button press
    async function signInWithPhoneNumber(phoneNumber) {
      setLoading(true)
      console.log(phoneNumber)
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
      setLoading(false)
    }
  
    async function confirmCode() {
        console.log(code)
      try {
        await confirm.confirm(code);
        navigation.navigate('PhoneToWoo', {phone : phone})
      } catch (error) {
        console.log(error)
        alert('Invalid code.');
      }
    }
  
    if(loading) return <Loader/>
    if (!confirm) {
      return (
          <ScrollView style={{flex : 1, backgroundColor : 'white'}}>
              <View style={{ alignItems : 'center', height : height, justifyContent : 'space-evenly'}}>
                  <Ionicons size={80} color='#c60607' name='chatbox'/>
                  <View style={{alignItems : 'center'}}>
                    <Text style={{fontSize : 30, fontWeight : 'bold'}}>Mobile Verification</Text>
                    <Text style={{fontSize : 20}}>Please Enter Your Mobile Number</Text>
                    <View style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'center'}}>
                        <Text style={{fontSize : 25}}>+91</Text>
                        <TextInput
                        onChangeText={setPhone}
                        placeholder='XXXXXXXXXX'
                        maxLength={10}
                        style={{borderBottomWidth : 1, borderRadius : 5, marginVertical : 20, width : width*0.6, height : 50, fontSize : 25}}/>
                    </View>
                  </View>
                
                <TouchableOpacity style={{backgroundColor : '#c60607', borderRadius : 25, padding : 5}} onPress={()=>signInWithPhoneNumber(`+91 ${phone}`)}>
                    <Ionicons size={35} color='white' name='chevron-forward'/>
                </TouchableOpacity>
              </View>
          </ScrollView>
        
      );
    }
  
    return (
      <View style={{flex : 1, backgroundColor : 'white'}}>
          <View style={{flex : 2}}>
            <TouchableOpacity onPress={()=>setConfirm(null)}>
                <Ionicons name='chevron-back' size={30} />
            </TouchableOpacity>
              <View style={{flex : 2,alignItems : 'center', justifyContent : 'space-evenly'}}>
                <Ionicons name='chatbox' size={80} color="#c60607" />
                <View style={{alignItems : 'center'}}>
                    <Text style={{fontSize : 30, fontWeight : 'bold', marginVertical : 20}}>Enter Otp</Text>
                    <Text style={{textAlign : 'center', fontSize : 18}}>We have sent you access code via SMS for Mobile Number Verification</Text>
                </View>
                <TextInput
                style={{borderBottomWidth : 1, fontSize : 25, width : width*0.5, textAlign : 'center'}}
                value={code} 
                onChangeText={setCode} />
                <TouchableOpacity
                style={{backgroundColor : '#c60607', padding : 5, borderRadius : 25}}
                onPress={()=>confirmCode()}>
                    <Icon name='chevron-forward' size={35} color='white'/>
                </TouchableOpacity>
              </View>
          </View>
      </View>
    );
  }

export default PhoneAuth
