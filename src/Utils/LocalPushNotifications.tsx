import PushNotification from 'react-native-push-notification';
 export const createChannels = ()=>{
PushNotification.createChannel({
    channelId:'test-channel-id',
    channelName:'test-channel-name'
})
}