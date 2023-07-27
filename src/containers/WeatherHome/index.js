import React, { useEffect, useState } from "react";
import { Text, View, Alert, ActivityIndicator, Image } from "react-native";
import styles from "./styles";
import { CustomButton } from "../../components";
import { LocHelper } from "../../helpers";

const WeatherHome = ({ navigation }) => {
  const [userLoc, setUserLoc] = useState(null);
  const [foreCast, setForeCast] = useState(null);
  const [current, setCurrent] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const weatherAPIKey = "6a0255bff2f1816296816573eb6f389f";
  let weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?exclude=minutely&units=metric&appid=${weatherAPIKey}`;

  useEffect(() => {
    LocHelper.checkLocationPermission(
      () => {
        LocHelper.fetchUserLocation(
          (loc) => {
            setUserLoc(loc);
            console.log("User Location", loc);
          },
          (error) => {
            console.log(error);
            Alert.alert("Oops", "Something went wrong");
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  useEffect(() => {
    fetchForeCast();
  }, [userLoc != null]);

  const fetchForeCast = async () => {
    setRefresh(true);
    weatherUrl = `${weatherUrl}&lat=${userLoc.latitude}&lon=${userLoc.longitude}`;
    const response = await fetch(weatherUrl);
    console.log("url", weatherUrl);
    if (!response.ok) {
      Alert.alert("Error", "Something went wrong");
    } else {
      const data = await response.json();
      console.log("forecast", data);
      setForeCast(data);
      setCurrent(data.current.weather[0]);
      setImageUrl(
        `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@4x.png`
      );
    }
    setIsLoading(false);
    setRefresh(false);
  };

  const weatherData = () => {
    console.log(imageUrl);
    console.log("Current temp", foreCast.current.temp);
    return (
      <View style={styles.weatherView}>
        {current && (
          <>
            <Text style={styles.textView}>
              Current Temparature: {foreCast.current.temp} °C
            </Text>
            <Text style={styles.textView}>Weather: {current.main}</Text>
            <Text style={styles.textView}>
              Description: {current.description}
            </Text>
          </>
        )}
        {imageUrl && (
          <Image
            style={{ width: 200, height: 200 }}
            source={{
              uri: imageUrl,
            }}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.caption}>Weather On Your Location</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="purple" />
      ) : (
        weatherData()
      )}
      <CustomButton
        buttonText={"Go to Forecast"}
        handleClick={() => navigation.navigate("ForeCast", {})}
      />
    </View>
  );
};

export default WeatherHome;
