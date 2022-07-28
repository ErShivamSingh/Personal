import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {pick} from '../../Utils/imagePicker';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import TouchID from 'react-native-touch-id';
import {useNavigation} from '@react-navigation/native';
const Login = () => {
  const [showDialog, setshowDialog] = useState(false);
  const [profileImage, setProfileImage] = useState({});
  const [PAN, setPAN] = useState('');
  const [aadharfront, setAadharfront] = useState('');
  const [aadharback, setAadharBack] = useState('');
  const [btnType, setBtnType] = useState('');
  const navigation = useNavigation();
  const checkID = (btnType:Number) => {
    const optionalConfigObject = {
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false, // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
    };

    TouchID.isSupported(optionalConfigObject)
      .then(biometryType => {
        // Success code
        if (biometryType === 'FaceID') {
          console.log('FaceID is supported.');
        } else {
          console.log('TouchID is supported.');
          TouchID.authenticate(
            'Authenticate with your touch ID please',
            optionalConfigObject,
          )
            .then((success: any) => {
              console.log('btntype  : ',success);
              
              if(btnType===3){
                navigation.navigate('Home');
              }
              else
              {
                  uploadResource(btnType)
              }
              // Alert.alert('Authenticated Successfully');
              
              // return true;
            })
            .catch(error => {
              setshowDialog(false)
              Alert.alert('Authentication Failed');
              // return false;
              
            });
        }
      })
      .catch(error => {
        // Failure code
        console.log('error here', error);
      });
  };
  const uploadResource = async (type: Number) => {
    
    const resp: any = await pick(type);
    console.log('response : ', resp);

    switch (btnType) {
      case 'Profile':
        setProfileImage(resp);
        console.log('in profile');

        break;
      case 'PAN':
        console.log('in PAN');

        setPAN(resp);
        break;
      case 'AadharFront':
        console.log('in Aadhar Front');

        setAadharfront(resp);
        break;

      case 'AadharBack':
        console.log('in Aadhar Back');

        setAadharBack(resp);
        break;
      default:
        console.log('not valid');
    }
    setshowDialog(false);
    console.log('reponse from image picker :', profileImage);
  };
  const RenderDialog = () => {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 10,
          width: Dimensions.get('screen').width * 0.7,
        }}>
        <Text
          style={{
            color: '#000',
            textAlignVertical: 'center',
            fontSize: 20,
            paddingBottom: 5,
            backgroundColor: 'red',
            padding: 5,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}>
          Choose Option
        </Text>
        <TouchableOpacity
          style={{marginBottom: 5, paddingLeft: 20}}
          onPress={() => {
            checkID(1);
            // uploadResource(1);
          }}>
          <Text
            style={{
              color: '#000',
              textAlignVertical: 'center',
              fontSize: 20,
              paddingBottom: 5,
            }}>
            Camera
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginBottom: 5, paddingLeft: 20}}>
          <Text
            style={{
              color: '#000',
              textAlignVertical: 'center',
              fontSize: 20,
              paddingBottom: 5,
            }}
            onPress={() => {
              checkID(0);
              // uploadResource(0);
            }}>
            Open Gallery
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{paddingLeft: 20, paddingBottom: 5}}
          onPress={() => setshowDialog(false)}>
          <Text
            style={{color: '#000', textAlignVertical: 'center', fontSize: 20}}>
            Close
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          borderWidth: 0,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 100,
        }}>
        <View style={styles.flexRow}>
          <Text style={styles.text}>upload Image</Text>
          {profileImage && profileImage.assets ? (
            // <Image
            //   source={{uri: profileImage.assets[0].uri}}
            //   style={{width: 30, height: 30}}
            // />
            <Icon name={'check'} color="green" size={25} />
          ) : (
            <TouchableOpacity
              style={styles.btnView}
              onPress={() => {
                
                setBtnType('Profile');
                setshowDialog(true);
              }}>
              <Text style={styles.btn}>upload</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.flexRow}>
          <Text style={styles.text}>upload PAN</Text>
          {PAN && PAN.assets ? (
            // <Image
            //   source={{uri: PAN.assets[0].uri}}
            //   style={{width: 30, height: 30}}
            // />
            <Icon name={'check'} color="green" size={25} />
          ) : (
            <TouchableOpacity
              style={styles.btnView}
              onPress={() => {
                setBtnType('PAN');
                setshowDialog(true);
              }}>
              <Text style={styles.btn}>upload</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.flexRow}>
          <Text style={styles.text}>upload AADHAR</Text>

          {aadharfront && aadharfront.assets ? (
            // <Image
            //   source={{uri: aadharfront.assets[0].uri}}
            //   style={{width: 30, height: 30}}
            // />
            <Icon name={'check'} color="green" size={25} />
          ) : (
            <TouchableOpacity
              style={styles.btnView}
              onPress={() => {
                setBtnType('AadharFront');
                setshowDialog(true);
              }}>
              <Text style={styles.btn}>upload</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.flexRow}>
          <Text style={styles.text}>upload backside of aadhar</Text>
          {aadharback && aadharback.assets ? (
            // <Image
            //   source={{uri: aadharback.assets[0].uri}}
            //   style={{width: 30, height: 30}}
            // />
            <Icon name={'check'} color="green" size={25} />
          ) : (
            <TouchableOpacity
              style={styles.btnView}
              onPress={() => {
                setBtnType('AadharBack');
                setshowDialog(true);
              }}>
              <Text style={styles.btn}>upload</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/* {profileImage &&
      profileImage.assets &&
      PAN &&
      PAN.assets &&
      aadharfront &&
      aadharfront.assets &&
      aadharback &&
      aadharback.assets ? ( */}
        {true ? (
        <TouchableOpacity
          style={{
            backgroundColor: '#C0C0C0',
            padding: 7,
            width: Dimensions.get('screen').width * 0.4,
            borderRadius: 10,
          }}
          onPress={() => {
            // checkID(3);
            navigation.navigate('Home')
          }}>
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 22,
              textAlign: 'center',
            }}>
            Proceed
          </Text>
        </TouchableOpacity>
      ) : null}
<TouchableOpacity
          style={{
            backgroundColor: '#C0C0C0',
            padding: 7,
            width: Dimensions.get('screen').width * 0.7,
            borderRadius: 10,
            marginTop:50
          }}
          onPress={() => {
            // checkID(3);
            navigation.navigate('PushNotifications')
          }}>
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 22,
              textAlign: 'center',
            }}>
            Push Notification Screen
          </Text>
        </TouchableOpacity>
      {showDialog ? (
        <View
          style={{
            position: 'absolute',
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}>
          <RenderDialog />
        </View>
      ) : null}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {
    color: '#000',
    fontSize: 18,
    width: Dimensions.get('screen').width * 0.6,
    textAlignVertical: 'center',
  },
  btn: {fontSize: 18},
  btnView: {
    padding: 5,
    backgroundColor: '#c0c0c0',
    borderRadius: 5,
  },
  flexRow: {
    flexDirection: 'row',
    width: Dimensions.get('screen').width * 0.9,
    // justifyContent: 'space-around',
    margin: 10,
  },
});
