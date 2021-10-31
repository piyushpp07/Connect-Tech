import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Avatar, Button } from 'react-native-paper';

const Home = ({ navigation, route }) => {
   const [addr, setAddr] = useState()
   const { response } = route.params;
   useEffect(() => {


   }, [])
   return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: "#FFFFFF", padding: 30 }}>
         <Text style={styles.hea}>Aadhar Details</Text>
         <View style={{ top: 20, alignItems: 'center', justifyContent: 'space-between' }}>
            <Avatar.Image size={160} source={require('../assets/icon.png')} style={styles.img} />
            <Text style={styles.t1}>Name:{response.data.data.data.info.name}</Text>
            <Text style={styles.t2}>Gender: {response.data.data.data.info.gender}</Text>

            <Text style={styles.t2}>Address: {response.data.data.data.address.house}</Text>
            {/* <Text style={styles.t2}>{response.data.data.data.address.street}</Text>
            <Text style={styles.t2}>{response.data.data.data.address.ln}</Text> */}
            <Text style={styles.t2}>{response.data.data.data.address.loc}</Text>
            {/* <Text style={styles.t2}>{response.data.data.data.address.btc}</Text>
            <Text style={styles.t2}>{response.data.data.data.address.subdist}</Text> */}
            <Text style={styles.t2}>{response.data.data.data.address.dist}</Text>
            <Text style={styles.t2}>{response.data.data.data.address.state}</Text>
            <Text style={styles.t2}>{response.data.data.data.address.country}</Text>

         </View>
         <Button style={{ top: 80 }} onPress={() => {
            navigation.navigate("ChangeAddress")
         }} mode="contained">
            Change Address</Button>
      </View>

   );
}

const styles = StyleSheet.create({
   hea: {

      fontWeight: 'bold',
      fontSize: 25
   },
   t1: {
      fontWeight: 'bold',
      fontSize: 20
   },
   t2: {
      fontWeight: 'bold',
      fontSize: 18,
   },
   img: {
      top: 10,
      bottom: 30
   }
})

export default Home;
