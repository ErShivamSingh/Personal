import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home/Home';
import Login from '../screens/Login/Login';
import QRScreen from '../screens/QR/QRScreen';
import GenrateQRCode from '../screens/GenrateQRCode/GenrateQRCode';
import PushNoti from '../screens/LocalPushNotification/PushNoti'
const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="QRScreen" component={QRScreen}/>
        <Stack.Screen name="GenrateQRCode" component={GenrateQRCode} />
        <Stack.Screen name="PushNotifications" component={PushNoti} />

      </Stack.Navigator>
  )
}

export default Navigator

const styles = StyleSheet.create({})