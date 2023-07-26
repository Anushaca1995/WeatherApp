import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import {CustomButton} from '../../components';

const WeatherHome = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Weather Home</Text>
      <CustomButton
        buttonText={'Go to forecast'}
        handleClick={() => navigation.navigate('ForeCast', {})}
      />
    </View>
  );
};

export default WeatherHome;
