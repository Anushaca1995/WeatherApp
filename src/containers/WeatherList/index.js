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
  const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
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
    const dateTime = item.dt_txt;
    const date = new Date(dateTime);
    const dateonly = date.toLocaleDateString("en-GB");
    const timeonly = dateTime.substring(11, 19);
    const dayName = days[date.getDay()];
    return (
      <View style={styles.weatherView}>
        <View style={styles.cellView}>
          <View>
            <Text style={styles.cellCap}>{dayName}</Text>
            <Text style={styles.cellItem}>{dateonly}</Text>
            <Text style={styles.cellItem}>{timeonly}</Text>
          </View>
          <View>
            <Image
              style={styles.weatherIcon}
              source={{
                uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`,
              }}
            />
          </View>
          <View>
            <Text style={styles.cellCap}>{item.main.temp} °C</Text>
            <Text style={styles.cellItem}>{item.weather[0].main}</Text>
            <Text style={styles.desc}>{item.weather[0].description}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderItemSeperator = () => {
    return <View style={styles.itemBorder}></View>;
  };

  const renderWeatherList = () => {
    return (
      <FlatList
        data={weatherArr}
        renderItem={renderCellItem}
        scrollEnabled
        ItemSeparatorComponent={renderItemSeperator}
      />
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
