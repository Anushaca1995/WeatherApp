import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Alert,
  ActivityIndicator,
  Image,
  FlatList,
} from "react-native";
import styles from "./styles";

const WeatherList = ({ navigation, route }) => {
  const { userLoc } = route.params;
  const [weatherArr, SetWeatherArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const weatherAPIKey = "6a0255bff2f1816296816573eb6f389f";
  let foreCastUrl = `https://api.openweathermap.org/data/2.5/forecast?exclude=minutely&units=metric&appid=${weatherAPIKey}`;

  useEffect(() => {
    fetchForeCast();
  }, [userLoc != null]);

  const fetchForeCast = async () => {
    foreCastUrl = `${foreCastUrl}&lat=${userLoc.latitude}&lon=${userLoc.longitude}`;
    const response = await fetch(foreCastUrl);
    console.log("url", foreCastUrl);
    if (!response.ok) {
      Alert.alert("Error", "Something went wrong");
    } else {
      const data = await response.json();
      console.log("forecast", data);
      SetWeatherArr(data.list);
    }
    setIsLoading(false);
    setRefresh(false);
  };

  const renderCellItem = ({ item, index }) => {
    return (
      <View style={styles.weatherView}>
        <View>
          <Image
            style={styles.weatherIcon}
            source={{
              uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`,
            }}
          />
        </View>
        <View>
          <Text>{item.dt_txt}</Text>
          <Text>{item.main.temp} °C</Text>
          <Text>{item.weather[0].main}</Text>
          <Text>{item.weather[0].description}</Text>
        </View>
      </View>
    );
  };

  const renderWeatherList = () => {
    return (
      <FlatList data={weatherArr} renderItem={renderCellItem} scrollEnabled />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.caption}>Five Days ForeCast</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#660022" />
      ) : (
        renderWeatherList()
      )}
    </View>
  );
};

export default WeatherList;
