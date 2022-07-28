import {StyleSheet, Text, View, Linking, TouchableOpacity, TextInput} from 'react-native';
import React, { useState } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const QRScreen = () => {
    const [torch,setTorch]=useState(false);
  const onSuccess = (e) => {
    console.log('done',e);
    if(e.data && e.type==='QR_CODE')
    {
        Linking.openURL(e.data).catch(err=>console.log('error : ',err)
        )    
    }
    
  };
  return (
    <View style={styles.container}>
      <Text style={{color: '#000'}}>QRScreen</Text>
     
      <QRCodeScanner
        onRead={(e) => {
          onSuccess(e);
        }}

        flashMode={torch?'torch':'off'}
        topContent={
          <Text style={styles.centerText}>
            scan the QR code
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable} onPress={()=>{setTorch(!torch)}}>
            <Icon color={torch?'red':'#000'} size={40} name='flashlight'/>
            
          </TouchableOpacity>
        }
      />
    </View>
  );
};

export default QRScreen;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    // padding: 16,
  },
});
