
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-web';

const ChangeAddr = ({ navigation }) => {
   const [UID, setUID] = useState();
   const [show, setShow] = useState(false)
   const [otp, setOTP] = useState();
   const initializePayment = async () => {
      if (UID.length < 12 || UID.length > 12) {
         Alert.alert("Enter Proper UID")
      }
      else {
         axios.post('http://192.168.29.241:8000/api/user/otp/', {
            UID: UID
         }).then((response) => { setB(true) })
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
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF' }}>
         <Text style={{ fontSize: 28, fontWeight: '700', top: 2 }}>Change Address</Text>
         <Text style={{ fontSize: 16, fontWeight: '500', left: 3, }}>To Change your Address details enter your Landlord’s Aadhar number/Phone no.,
            then ask him/her to verify your details and share the OTP with you</Text>
         {show === false ? (<>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Owners Phone No</Text>
            <View style={{ width: 310, top: 90 }}>
               <TextInput
                  label="UID"
                  value={UID}
                  onChangeText={UID => setUID(UID)}
                  style={{ bottom: 70 }}
               />
            </View>
            <Button style={{ top: 40, borderRadius: 10 }} mode='contained' onPress={() => { setShow(true) }}>Next</Button></>
         ) :
            (
               <View>
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Enter OTP</Text>
                  <View style={{ width: 310, top: 90 }}>
                     <TextInput
                        label="Enter OTP"
                        value={otp}
                        onChangeText={otp => setOTP(otp)}
                        style={{ bottom: 70 }}
                     />
                  </View>


                  <Button style={{ top: 40, borderRadius: 10 }} mode='contained' onPress={() => { setShow(true) }}>Verify</Button>
               </View>
            )}


      </View>
   );
}

const styles = StyleSheet.create({})

export default ChangeAddr;