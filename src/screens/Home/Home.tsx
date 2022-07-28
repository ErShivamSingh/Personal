import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {Axios} from 'axios';
import { getBiometrics } from '../../Utils/Biometrics/Fingerprint';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
const navigation=useNavigation();

  useEffect(() => {
    FingerprintDetails();
  }, []);
  const FingerprintDetails = async () => {
    // const { biometryType } = await rnBiometrics.isSensorAvailable();
   getBiometrics()
  };
  return (
    <View style={styles.container}>
      <Text style={{color: '#000', fontSize: 42}}>Home</Text>
      <TouchableOpacity
        style={{
          backgroundColor: '#c0c0c0',
          borderWidth: 0.5,
          padding: 5,
          borderRadius: 10,
        }}
        onPress={() => getBiometrics('delete')}>
        <Text style={{fontSize: 20, color: '#000', fontWeight: 'bold'}}>
          Remove keys
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: '#c0c0c0',
          borderWidth: 0.5,
          padding: 5,
          borderRadius: 10,marginTop:40
        }}
        onPress={() => {navigation.navigate('QRScreen')}}>
        <Text style={{fontSize: 20, color: '#000', fontWeight: 'bold'}}>
          QR code
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: '#c0c0c0',
          borderWidth: 0.5,
          padding: 5,
          borderRadius: 10,marginTop:40
        }}
        onPress={() => {navigation.navigate('GenrateQRCode')}}>
        <Text style={{fontSize: 20, color: '#000', fontWeight: 'bold'}}>
          Genrate QR code
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
