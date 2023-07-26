import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

const WeatherList = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.caption}>5 Day Forecast</Text>
    </View>
  );
};

export default WeatherList;
