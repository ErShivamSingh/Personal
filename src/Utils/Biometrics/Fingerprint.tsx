import { ToastAndroid } from 'react-native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });
  export  const getBiometrics=(val?:string)=>{
    console.log('value',val);
    // return;
    
    rnBiometrics.isSensorAvailable().then(resultObject => {
        const {available, biometryType} = resultObject;
  
        if (available && biometryType === BiometryTypes.TouchID) {
          console.log('TouchID is supported');
        } else if (available && biometryType === BiometryTypes.FaceID) {
          console.log('FaceID is supported');
        } else if (available && biometryType === BiometryTypes.Biometrics) {
            
          ToastAndroid.show('Biometrics found', ToastAndroid.SHORT);
          rnBiometrics.biometricKeysExist().then(resultObject => {
            const {keysExist} = resultObject;
  
            if (keysExist) {
              console.log('Keys exist');
              if(val==='delete')
              {
                removeKeys();
              }
  
            } else {
              console.log('Keys do not exist or were deleted');
              generateKeys()
            }
          });
        } else {
          console.log('Biometrics not supported');
        }
      });
  }
  const generateKeys=()=>{
    rnBiometrics.createKeys().then(resultObject => {
        const {publicKey} = resultObject;
        console.log('publicKey : ', publicKey);
        createSignature(publicKey)
        // sendPublicKeyToServer(publicKey)
      });
  }
   const removeKeys=()=>{
    rnBiometrics.deleteKeys()
  .then((resultObject) => {
    const { keysDeleted } = resultObject

    if (keysDeleted) {
      console.log('Successful deletion')
    } else {
      console.log('Unsuccessful deletion because there were no keys to delete')
    }
  })
  }
  const createSignature=(publicKey:string)=>{
    rnBiometrics.createSignature({
        promptMessage: 'Put your fingerprint on sensor',
        payload:publicKey
        
      })
      .then((resultObject) => {
        const { success, signature } = resultObject
    
        if (success) {
          console.log('signature : ',signature)
        //   verifySignatureWithServer(signature, payload)
        }
      })
  }