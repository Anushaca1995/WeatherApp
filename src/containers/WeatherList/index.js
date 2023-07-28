import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import { kWeatherForecast } from "../../config/WebServices";
import { weatherAPIKey } from "../../config/AppConfig";
import { ApiHelper } from "../../helpers";
import utils from "../../utils";

const WeatherList = ({ navigation, route }) => {
  const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  const { userLoc } = route.params;
  const [weatherArr, SetWeatherArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const forecastObject = {
    exclude: "minutely",
    units: "metric",
    appid: weatherAPIKey,
  };

  useEffect(() => {
    fetchForeCast();
  }, [userLoc != null]);

  const fetchForeCast = async () => {
    const response = await ApiHelper.get(kWeatherForecast, {
      ...forecastObject,
      lat: userLoc.latitude,
      lon: userLoc.longitude,
    });

    if (!response.ok) {
      utils.showAlertWithDelay(
        "Forecast Error",
        "Something went wrong in forecast error"
      );
    } else {
      const { data } = response;

      SetWeatherArr(data.list);
    }
    setIsLoading(false);
    setRefresh(false);
  };

  const renderCellItem = ({ item, index }) => {
    const dateTime = item.dt_txt;
    const date = new Date(dateTime);
    const dateonly = date.toLocaleDateString("en-GB").substring(0, 5);
    const timeonly = dateTime.substring(11, 16);
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
      <View>
        <Text style={styles.caption}>Five Days ForeCast</Text>
        <FlatList
          data={weatherArr}
          renderItem={renderCellItem}
          scrollEnabled
          ItemSeparatorComponent={renderItemSeperator}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {userLoc == undefined || weatherArr.length == 0 ? (
        <View style={styles.refreshView}>
          <Text style={styles.caption}> Oops something went wrong</Text>
          <Text style={[styles.textView, { textAlign: "center" }]}>
            Please try again by refreshing page
          </Text>
          <TouchableOpacity onPress={fetchForeCast}>
            <Image
              style={styles.refresh}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/3318/3318364.png",
              }}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {isLoading ? (
            <View>
              <Text style={styles.caption}>Please Wait...</Text>
              <ActivityIndicator size="large" color="#660022" />
            </View>
          ) : (
            renderWeatherList()
          )}
        </>
      )}
    </View>
  );
};

export default WeatherList;
