import React, { useEffect, useState } from "react";
import { Text, View, Alert, ActivityIndicator } from "react-native";
import styles from "./styles";
import { CustomButton } from "../../components";
import { LocHelper } from "../../helpers";

const WeatherHome = ({ navigation }) => {
  const [userLoc, setUserLoc] = useState();
  const [foreCast, setForeCast] = useState(null);
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
            fetchForeCast();
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

  const fetchForeCast = async () => {
    setRefresh(true);
    weatherUrl = `${weatherUrl}&lat=${userLoc.latitude}&lon=${userLoc.longitude}`;
    const response = await fetch(weatherUrl);
    console.log("url", weatherUrl);
    const data = await response.json();
    console.log("forecast", data);
    const current = data.current.weather[0];
    console.log("Current weather", current);
    if (!response.ok) {
      Alert.alert("Error", "Something went wrong");
    } else {
      setForeCast(data);
    }
    setIsLoading(false);
    setRefresh(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.caption}>Weather Home</Text>
      {isLoading && <ActivityIndicator size="large" color="purple" />}
      <CustomButton
        buttonText={"Go to Forecast"}
        handleClick={() => navigation.navigate("ForeCast", {})}
      />
    </View>
  );
};

export default WeatherHome;
