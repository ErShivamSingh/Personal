import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import VIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const Firebase = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const LoginUsingEmailAndPassword = () => {};
  return (
    <View style={styles.container}>
      <View
        style={{
          height: Dimensions.get('screen').height * 0.4,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={{
            uri: 'https://seeklogo.com/images/F/firebase-logo-402F407EE0-seeklogo.com.png',
          }}
          resizeMode="contain"
          style={{
            width: Dimensions.get('screen').width * 0.4,
            height: Dimensions.get('screen').width * 0.4,
          }}
        />
      </View>
      <View
        style={{
          height: Dimensions.get('screen').height * 0.4,
          //   borderWidth: 1,
          alignItems: 'center',
        }}>
        <TextInput
          placeholder="enter email"
          placeholderTextColor={'#000'}
          value={email}
          onChangeText={setEmail}
          keyboardType={'email-address'}
          style={{
            borderWidth: 2,
            borderColor: '#c0c0c0',
            width: Dimensions.get('screen').width * 0.8,
            color: '#000',
            borderRadius: 10,
            marginBottom: 20,
            paddingLeft: 20,
          }}
        />
        <TextInput
          placeholder="enter password"
          secureTextEntry={true}
          placeholderTextColor={'#000'}
          value={password}
          onChangeText={setPassword}
          keyboardType={'visible-password'}
          style={{
            borderWidth: 2,
            borderColor: '#c0c0c0',
            width: Dimensions.get('screen').width * 0.8,
            color: '#000',
            borderRadius: 10,
            paddingLeft: 20,
            marginBottom: 20,
          }}
        />
        <TouchableOpacity
          style={{
            padding: 5,
            backgroundColor: '#FCC336',
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#E9A703',
            width: Dimensions.get('screen').width * 0.8,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 30,
          }}
          onPress={() => {
            LoginUsingEmailAndPassword();
          }}>
          <Text style={{color: '#fff', fontSize: 22, fontWeight: 'bold'}}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 5,
            backgroundColor: '#FCC336',
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#E9A703',
            width: Dimensions.get('screen').width * 0.3,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 30,
          }}
          onPress={() => {
            LoginUsingEmailAndPassword();
          }}>
          <Text style={{color: '#fff', fontSize: 12, fontWeight: 'bold'}}>
            Login Anonymously
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('creating new user');
          }}>
          <Text
            style={{
              color: '#FB4444',
              fontSize: 16,
              fontWeight: 'bold',
              //   textAlign: 'center',
            }}>
            Not Register ? Register Now
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 30,
            width: Dimensions.get('screen').width * 0.6,
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity>
            <VIcon name="google" size={45} color="red" />
          </TouchableOpacity>
          <TouchableOpacity>
            <VIcon name="facebook" size={45} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity>
            <VIcon name="github" size={45} color="#BB6CDB" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Firebase;

const styles = StyleSheet.create({
  container: {flex: 1},
});
