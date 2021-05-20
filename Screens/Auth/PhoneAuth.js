import React, { useState, useEffect } from 'react'
import { View, TextInput ,Button, Image, ScrollView, Text, TouchableOpacity, Dimensions, ToastAndroid} from 'react-native'
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
  
    useEffect( () => {
      auth().onAuthStateChanged( (user) => {
          if (user) {
              // Obviously,
              console.log(user)
              //  you can add more statements here, 
              //       e.g. call an action creator if you use Redux. 
  
              // navigate the user away from the login screens: 
              navigation.navigate("PhoneToWoo", {phone : user.phoneNumber});
          }
      });
  }, [confirm]);  

    // Handle the button press
    async function signInWithPhoneNumber(phoneNumber) {
      if(phone && phone.length===10){
        setLoading(true)
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
        setLoading(false)
      }else{
        ToastAndroid.show('Invalid Number', ToastAndroid.SHORT)
      }
    }
  
    async function confirmCode() {
      if(code && code.length ===6){
        try {
          // const credential = auth.PhoneAuthProvider.credential(confirm.verificationId, code);
          await confirm.confirm(code)
          // console.log(credential)
          navigation.navigate('PhoneToWoo', {phone})
        } catch (error) {
          console.log(error)
          ToastAndroid.show('Invalid OTP', ToastAndroid.SHORT)
        }
      }
    }
  
    if(loading) return <Loader/>
    if (!confirm) {
      return (
          <ScrollView style={{flex : 1, backgroundColor : 'white'}}>
              <View style={{ alignItems : 'center', height : height-50, justifyContent : 'space-evenly'}}>
                  <Ionicons size={80} color='#c60607' name='chatbox'/>
                  <View style={{alignItems : 'center', height : height*0.3, justifyContent : 'space-evenly'}}>
                    <Text style={{fontSize : 30, fontWeight : 'bold'}}>Mobile Verification</Text>
                    <Text style={{fontSize : 20}}>Please Enter Your Mobile Number</Text>
                    <View style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'stretch', borderColor : 'grey', borderWidth : 1, borderRadius : 5, marginVertical : 20}}>
                        <Text style={{fontSize : 20, borderRightWidth : 1, borderRadius : 5, paddingVertical : 2, paddingHorizontal : 5, borderColor : 'grey', color : 'black', textAlignVertical : 'center'}}>+91</Text>
                        <TextInput
                        onChangeText={setPhone}
                        placeholder='Enter 10 Digit Mobile Number'
                        placeholderTextColor='black'
                        maxLength={10}
                        style={{ width : width*0.7, height : 50, fontSize : 20, color : 'black'}}/>
                    </View>
                  </View>
                
                <TouchableOpacity style={{backgroundColor : '#c60607', borderRadius : 5, paddingHorizontal : 8, paddingVertical : 6, width : width*0.8}} onPress={()=>signInWithPhoneNumber(`+91 ${phone}`)}>
                  <View style={{flexDirection : 'row', alignItems : 'center', justifyContent : 'center'}}>
                    <Ionicons size={35} color='white' name='log-in-outline'/>
                    <Text style={{color : 'white', fontSize : 20}}>Verify using OTP</Text>
                  </View>
                </TouchableOpacity>
              </View>
          </ScrollView>
        
      );
    }
  
    return (
      <View style={{flex : 1, backgroundColor : 'white'}}>
          <View style={{flex : 2}}>
            <TouchableOpacity style={{marginVertical : 10, marginHorizontal : 5}} onPress={()=>setConfirm(null)}>
                <Ionicons name='chevron-back' color='black' size={30} />
            </TouchableOpacity>
              <View style={{flex : 2,alignItems : 'center', justifyContent : 'center'}}>
                <Ionicons name='chatbox' size={80} color="#c60607" style={{marginVertical : 10}}/>
                <View style={{alignItems : 'center', marginVertical : 15,}}>
                    <Text style={{fontSize : 30, fontWeight : 'bold', marginVertical : 20}}>Enter OTP</Text>
                    <Text style={{textAlign : 'center', fontSize : 18}}>We have sent you access code via SMS for Mobile Number Verification</Text>
                </View>
                <TextInput
                style={{borderWidth : 1, marginVertical : 15, fontSize : 25, width : width*0.5, textAlign : 'center', borderColor : 'grey', letterSpacing : 5, borderRadius : 5, color : 'black'}}
                value={code}
                placeholder='Enter Code'
                placeholderTextColor='black'
                onChangeText={setCode} />
                <TouchableOpacity
                  style={{backgroundColor : '#c60607', marginVertical : 15, paddingVertical : 6, paddingHorizontal : 8, borderRadius : 5, width : width*0.7, flexDirection : 'row', justifyContent : 'center', alignItems : 'center'}}
                  onPress={()=>confirmCode()}>
                    <Icon name='log-in-outline' size={35} color='white'/>
                    <Text style={{color : 'white', fontSize : 20}}>Verify</Text>
                </TouchableOpacity>
              </View>
          </View>
      </View>
    );
  }

export default PhoneAuth
