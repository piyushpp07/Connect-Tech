import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-web';
import axios from 'axios'
const ChangeAddr = ({ navigation }) => {
   const [UID, setUID] = useState();
   const [show, setShow] = useState(false)
   const [otp, setOTP] = useState();
   const [response, setData] = useState()
   const [house, setHouse] = useState()
   const [open, setOpen] = useState(false)
   const initializePayment = async () => {
      console.log("Pressed")
      if (UID.length < 12 || UID.length > 12) {
         Alert.alert("Enter Proper UID")
      }
      else {
         axios.post('http://192.168.29.241:8000/api/user/otp/', {
            UID: UID
         }).then((response) => { setShow(true); })
      }
   }
   const OtpCheck = () => {
      axios.post('http://192.168.29.241:8000/api/user/ekyc/', {
         otp: otp,
         name: "landlord",
         UID: UID
      }).then((response) => {
         console.log(response);
         setData(response)
         setOpen(true)

      })
   }
   const Update = () => {
      axios.post('http://192.168.29.241:8000/api/user/update/', {
         house: house,
         UID: UID
      }).then((response) => {
         console.log(response);
         Alert.alert("Updated Address", `updated House ${house}`);
      })
   }
   return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF' }}>
         <Text style={{ fontSize: 28, fontWeight: '700', top: 2 }}>Change Address</Text>
         <Text style={{ fontSize: 16, fontWeight: '500', left: 3, }}>To Change your Address details enter your Landlord’s Aadhar number/Phone no.,
            then ask him/her to verify your details and share the OTP with you</Text>
         {show === false ? (<>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Owners Aadhar No</Text>
            <View style={{ width: 310, top: 90 }}>
               <TextInput
                  label="UID"
                  value={UID}
                  onChangeText={UID => setUID(UID)}
                  style={{ bottom: 70 }}
               />
            </View>
            <Button style={{ top: 40, borderRadius: 10 }} mode='contained' onPress={initializePayment} > Next</Button></>
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
                  <Button style={{ top: 40, borderRadius: 10 }} mode='contained' onPress={OtpCheck}>Verify</Button>
               </View>
            )
         }

         {
            open === true ? (<View style={{ flex: 1, top: 50, width: '100%', alignItems: 'center' }}>
               <TextInput
                  label="house Detail"
                  value={house}
                  onChangeText={house => setHouse(house)}
                  style={{ bottom: 2, width: 310 }}
               />
               <Text style={{ fontWeight: 'bold' }}>Landlord Address</Text>
               <Text>{response.data.data.address.street}</Text>
               <Text>{response.data.data.address.ln}</Text>
               <Text>LOC : {response.data.data.address.loc}</Text>
               <Button
                  title="Click ME"
                  color="blue"
               />
               <Button onPress={Update} mode='contained'>Change Address</Button>
            </View>
            ) : (<></>)
         }



      </View >
   );
}

const styles = StyleSheet.create({})

export default ChangeAddr;