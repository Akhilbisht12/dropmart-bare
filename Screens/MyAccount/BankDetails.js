import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import Loader from '../../Components/Loader'
import TitleHeader from '../../Components/TitleHeader'

const BankDetails = ({profile, navigation}) => {
    const [edit, setEdit] = useState(true);
    const [loading, setLoading] = useState(true);
    const [account, setAccount] = useState('');
    const [confirm, setConfirm] = useState('');
    const [ifsc, setIfsc] = useState('');
    const [name, setName] = useState('');
    const [data, setData] = useState();
    useEffect(()=>{
        axios.get(`https://www.dropmarts.com/wp-json/wp/v2/users/${profile.id}`,{
            headers : {
                Authorization : `Bearer ${profile.token}`
            }
        })
        .then(response=>{
            if(response.data.ifsc===''){
                setEdit(true);
            }else{
                setEdit(false)
                setData(response.data)
                setLoading(false)
            }
        })
    },[setEdit])

    const handleSubmit = () => {
        if(account===confirm && account!=='' && confirm!=='' && ifsc!=='' && name!==''){
            console.log('good till here')
            axios.put(`https://www.dropmarts.com/wp-json/wp/v2/users/${profile.id}`, {
                ifsc : ifsc,
                account_number : account,
                beneficiary_name : name
            },
            {
                headers : {
                    Authorization : `Bearer ${profile.token}`
                }
            })
            .then((response)=>{
                console.log(response.data)
                navigation.navigate('Home')
                alert('Details Saved Successfully')
            })
        }else{
            alert('Fill Out Details Correctly')
        }
    }
    const styles = StyleSheet.create({
        main : {
            flex : 1
        },
        flexBetween : {
            flexDirection : 'row',
            justifyContent : 'space-between',
            alignItems : 'center',
            padding : 12,
            backgroundColor : 'white',
            marginVertical : 2
        },
        lowTxt : {
            fontSize : 16,
            color : 'gray'
        },
        HighTxt : {
            fontSize : 16,
            fontWeight : 'bold'
        },
        showDetails : {
            display : edit?'none':'flex'
        },
        editDetails : {
            display : edit?'flex':'none'
        },
        input : {
            borderWidth : 1,
            borderRadius : 5,
            height : 40,
            borderColor : 'gray',
            margin : 10,
            paddingHorizontal : 10
        },
        info : {
            backgroundColor : 'lightgrey',
            paddingHorizontal : 10,
            paddingVertical : 10
        },
        submitView : {
            padding : 10,
            borderTopWidth : 1,
            borderColor : 'lightgray'
        },
        submitBtn : {
            backgroundColor : '#c60607',
            paddingVertical : 8,
            borderRadius : 5
        },
        submitText : {
            textAlign : 'center',
            color : 'white',
            fontSize : 20
        }
    })
    
    if(loading) return <Loader/>
    else{
        return (
            <View style={styles.main}>
                <TitleHeader title='Bank Details' parent='Home'/>
                <ScrollView>
                    <View style={styles.showDetails}>
                        <View style={styles.flexBetween}>
                            <Text style={styles.lowTxt}>Account Holder's Name</Text>
                            <Text style={styles.HighTxt}>{data.beneficiary_name}</Text>
                        </View>
                        <View style={styles.flexBetween}>
                            <Text style={styles.lowTxt}>Account Number</Text>
                            <Text style={styles.HighTxt}>{data.account_number}</Text>
                        </View>
                        <View style={styles.flexBetween}>
                            <Text style={styles.lowTxt}>Account IFSC</Text>
                            <Text style={styles.HighTxt}>{data.ifsc}</Text>
                        </View>
                        <View style={styles.flexBetween}>
                            <Text style={styles.lowTxt}>Benefeciary name</Text>
                            <Text style={styles.HighTxt}>{data.beneficiary_name}</Text>
                        </View>
                        <TouchableOpacity style={{marginVertical : 20}} onPress={()=>setEdit(!edit)}>
                            <Text style={{textAlign : 'center', color : '#c60607'}}>Click Here To Edit Details</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.editDetails}>
                        <TextInput value={account} onChangeText={setAccount} placeholder='Account Number' style={styles.input}/>
                        <TextInput value={confirm} onChangeText={setConfirm} placeholder='Confirm Account Number' style={styles.input}/>
                        <TextInput value={ifsc} onChangeText={setIfsc} placeholder='IFSC code' style={styles.input}/>
                        <TextInput value={name} onChangeText={setName} placeholder='Beneficiary Name' style={styles.input}/>
                        <Text style={styles.info}>Please enter your correct bank details carefully. They will be used for all refunds, margins and bonus payments.</Text>
                    </View>
                </ScrollView>
                <View style={styles.submitView}>
                    <TouchableOpacity onPress={()=>handleSubmit()} style={styles.submitBtn}>
                        <Text style={styles.submitText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    
}

const mapStateToProps = (state) => {
    return {
        profile : state.user.profile
    }
}

export default connect(mapStateToProps)(BankDetails)
