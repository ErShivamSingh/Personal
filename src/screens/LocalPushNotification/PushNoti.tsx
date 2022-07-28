import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import PushNotification from 'react-native-push-notification';

import {createChannels} from '../../Utils/LocalPushNotifications';
const PushNoti = () => {
  const [data, setData] = useState([
    {name: 'shivam1', age: 24, contact: '1314253675'},
    {name: 'shivam2', age: 23, contact: '1314253675'},
    {name: 'shivam3', age: 26, contact: '1314253675'},
    {name: 'shivam4', age: 23, contact: '1314253675'},
    {name: 'shivam5', age: 65, contact: '1314253675'},
    {name: 'shivam6', age: 23, contact: '1314253675'},
    {name: 'shivam7', age: 21, contact: '1314253675'},
  ]);
  useEffect(() => {
    createChannels();
  }, []);
  const handleLocalPushNotification = (data: any) => {
    PushNotification.localNotification({
      channelId: 'test-channel-id',
      title: data.name,
      message: 'Age : ' + data.age,
    });
  };
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          width: Dimensions.get('screen').width * 0.9,
          //   marginLeft: Dimensions.get('screen').width * 0.05,
          height: Dimensions.get('screen').width * 0.15,
          borderWidth: 1,
          borderRadius: 10,
          padding: 7,
          margin: 10,
        }}
        onPress={() => {
          handleLocalPushNotification(item);
        }}>
        <Text style={{...styles.h1, fontWeight: 'bold'}}>{item.name}</Text>
        <Text style={styles.h1}>{item.age}</Text>
        <Text style={styles.h1}>{item.contact}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
};

export default PushNoti;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  h1: {color: '#000'},
});
