import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Alert } from 'react-native';
import AadharColor from '../assets/AadharColor.svg'
import axios from 'axios'
import { Button, TextInput } from 'react-native-paper';
import { KeyboardAvoidingView } from 'react-native';
function Login({ navigation }) {
   const [a, setA] = useState(true)
   const [b, setB] = useState(false)
   const [UID, setUid] = useState()
   const [otp, setOtp] = useState()

   const initializePayment = async () => {
      if (UID.length < 12 || UID.length > 12) {
         Alert.alert("Enter Proper UID")
      }
      else {
         axios.post('http://192.168.29.241:8000/api/user/otp/', {
            UID: UID
         }).then((response) => {
            setB(true);
            console.log(response)
         })
      }
   }
   const OtpCheck = () => {
      axios.post('http://192.168.29.241:8000/api/user/ekyc/', {
         otp: otp,
         name: "renter",
         UID: UID
      }).then((response) => {
         console.log(response)
         navigation.navigate('Home', { response })
      })
   }

   return (

      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bottom: 50 }}>
         <Image source={require('../assets/Aadhar-Color.png')} style={styles.logo} />
         {
            a === true ?
               (<TouchableOpacity style={styles.btn1} onPress={() => { setA(false) }}>
                  <Text style={{ color: 'white' }}>Get Started  </Text>
               </TouchableOpacity>) :
               (<View style={{ width: 290 }}>
                  <KeyboardAvoidingView>
                     <Text style={{ alignItems: 'center', color: 'black', fontWeight: 'bold', fontSize: 20, width: 400, height: 120 }}>
                        Enter your Aadhar no :
                     </Text>
                     <TextInput
                        label="Aadhar No"
                        value={UID}
                        onChangeText={UID => setUid(UID)}
                        style={{ bottom: 70 }}
                     />
                     <Button mode='contained' onPress={initializePayment} style={styles.btn2}> Send OTP </Button >
                     {b === true ? <>
                        <TextInput label="Enter 6 digit OTP"
                           value={otp}
                           onChangeText={otp => setOtp(otp)} style={{ bottom: 25 }} />
                        <TouchableOpacity style={{ bottom: 15 }}>
                           <Text style={{ fontWeight: '800' }}>Resend OTP</Text>
                        </TouchableOpacity>
                        <Button mode='contained'
                           onPress={() => { OtpCheck(); }} style={{ backgroundColor: 'red' }} >
                           Next</Button>
                     </> : <></>}
                  </KeyboardAvoidingView>
               </View >
               )
         }
      </View >


   );
}

const styles = StyleSheet.create({
   logo: {
      width: 158,
      height: 108,
      bottom: 60
   },
   btn1: {
      width: 320,
      height: 40,
      top: 19,
      backgroundColor: '#005A9C',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 7,

   },
   btn2: {
      bottom: 50
   }
})

export default Login;
