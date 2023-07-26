import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import {CustomButton} from '../../components';

const WeatherHome = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.caption}>Weather Home</Text>
      <CustomButton
        buttonText={'Go to Forecast'}
        handleClick={() => navigation.navigate('ForeCast', {})}
      />
    </View>
  );
};

export default WeatherHome;
