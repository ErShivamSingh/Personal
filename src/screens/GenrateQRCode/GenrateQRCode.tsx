import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import QRCode from 'react-native-qrcode-svg';

const GenrateQRCode = () => {
  const base64Logo =
    'https://images.pexels.com/photos/176837/pexels-photo-176837.jpeg?auto=compress&cs=tinysrgb&w=1600';
  const [link, setLink] = useState('');
  const [showQR, setShowQR] = useState(false);
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="enter URL to generate QR"
        onChangeText={setLink}
        value={link}
        style={{
          backgroundColor: 'rgba(0,0,0,0.1)',
          width: Dimensions.get('screen').width * 0.7,
          marginBottom: 50,
        }}
      />
      <TouchableOpacity
        style={{
          padding: 7,
          borderWidth: 1,
          backgroundColor: 'rgb(192,192,192)',
          borderRadius: 10,
          marginBottom:50
        }} 
        onPress={()=>setShowQR(true)}>
        <Text style={styles.text}>Generate QRCode</Text>
      </TouchableOpacity>

      {showQR && link!=='' ? (
        <QRCode
          value={link}
          //   logo={{uri: base64Logo}}
          //   logoSize={30}
          //   logoBackgroundColor='transparent'
        />
      ) : null}
    </View>
  );
};

export default GenrateQRCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
  },
});
