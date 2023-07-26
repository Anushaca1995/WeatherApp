import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import {CustomButton} from '../../components';
import {LocHelper} from '../../helpers';

const WeatherHome = ({navigation}) => {
  const [userLoc, setUserLoc] = useState();
  useEffect(() => {
    LocHelper.checkLocationPermission(
      () => {
        LocHelper.fetchUserLocation(
          loc => {
            setUserLoc(loc);
            console.log(loc);
          },
          error => {
            console.log(error);
          },
        );
      },
      err => {
        console.log(err);
      },
    );
  }, []);
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
