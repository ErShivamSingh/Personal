import { Alert, PermissionsAndroid, Platform } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
export const pick = async (optionType: any) => {
   
        let title = 'Image';
        let takePhotoButtonTitle = 'Take Photo...';
      let  isCameraPermitted = await requestCameraPermission();
      let  isStoragePermitted = await requestExternalWritePermission();
        
    const options = {
      title: 'Select ' + title,
      takePhotoButtonTitle,
      mediaType: 'image',
      maxWidth: 1000,
      maxHeight: 1000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    //   videoQuality: 'medium',
      saveToPhotos: true,
    };
  
    return new Promise((resolve, reject) => {
      if (optionType === 1) {
        launchCamera(options, async (response) => {
          console.log('Response = ', response);
          if (isCameraPermitted && isStoragePermitted) {
            if (response.didCancel) {
              response.error = 'CANCEL';
            }
            if (response.error) {
              reject(response.error);
            } else {
              console.log('resolve Response = ', response);
              resolve(response);
            }
          }
        });
      } else {
        launchImageLibrary(options, async (response) => {
          console.log('Response = ', response);
          if (isStoragePermitted) {
            if (response.didCancel) {
              response.error = 'CANCEL';
            }
            if (response.error) {
              reject(response.error);
            } else {
              resolve(response);
            }
          }
        });
      }
  
      // launchCamera(options, (response) => {
      //   console.log('Response = ', response);
  
      //   if (response.didCancel) {
      //     //alert('User cancelled camera picker');
      //     //return;
      //     reject('User cancelled camera picker');
      //   } else if (response.errorCode == 'camera_unavailable') {
      //     //alert('Camera not available on device');
      //     //return;
      //     reject('Camera not available on device');
      //   } else if (response.errorCode == 'permission') {
      //     //alert('Permission not satisfied');
      //     //return;
      //     reject('Permission not satisfied');
      //   } else if (response.errorCode == 'others') {
      //     //alert(response.errorMessage);
      //     reject(response.errorMessage);
      //   }
      //   console.log('base64 -> ', response.base64);
      //   console.log('uri -> ', response.uri);
      //   console.log('width -> ', response.width);
      //   console.log('height -> ', response.height);
      //   console.log('fileSize -> ', response.fileSize);
      //   console.log('type -> ', response.type);
      //   console.log('fileName -> ', response.fileName);
      //   resolve(response);
      // });
      //const res =captureImage("video");
      //console.log("capture video response ",res);
      //resolve(res);
    });
  };
  
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
          title: 'Camera Permission',
          message: 'App needs camera permission',
        });
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        // Sentry.captureMessage('Handling error at '+JSON.stringify(err));
        return false;
      }
    } else return true;
  };
  
  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
          title: 'External Storage Write Permission',
          message: 'App needs write permission',
        });
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        Alert.alert('Write permission err', err);
        // Sentry.captureMessage('Handling error at '+JSON.stringify(err));
      }
      return false;
    } else return true;
  };