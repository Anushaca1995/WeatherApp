import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Alert,
  ActivityIndicator,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import { CustomButton } from "../../components";
import { LocHelper } from "../../helpers";

const WeatherHome = ({ navigation }) => {
  const [userLoc, setUserLoc] = useState(null);
  const [foreCast, setForeCast] = useState(null);
  const [current, setCurrent] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [locSearch, setLocSearch] = useState("");
  const [locName, setLocName] = useState();
  const weatherAPIKey = "6a0255bff2f1816296816573eb6f389f";
  let weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?exclude=minutely&units=metric&appid=${weatherAPIKey}`;
  let searchUrl = `https://api.openweathermap.org/geo/1.0/direct?exclude=minutely&units=metric&limit=5&appid=${weatherAPIKey}`;

  useEffect(() => {
    checkLocPermission();
  }, []);

  const checkLocPermission = () => {
    LocHelper.checkLocationPermission(
      () => {
        LocHelper.fetchUserLocation(
          (loc) => {
            setUserLoc(loc);
            console.log("User Location", loc);
            setLocName("Your Location");
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
  };

  useEffect(() => {
    fetchForeCast();
  }, [userLoc?.latitude, userLoc?.longitude]);

  const fetchLocSearch = async () => {
    setIsLoading(true);
    searchUrl = `${searchUrl}&q=${locSearch}`;
    console.log("Search url", searchUrl);
    const response = await fetch(searchUrl);
    if (!response.ok) {
      Alert.alert("Error", "Something went wrong in search");
    } else {
      const data = await response.json();
      console.log("search url data", data);
      setUserLoc({ latitude: data[0].lat, longitude: data[0].lon });
    }
    setIsLoading(false);
  };

  const fetchForeCast = async () => {
    weatherUrl = `${weatherUrl}&lat=${userLoc.latitude}&lon=${userLoc.longitude}`;
    const response = await fetch(weatherUrl);
    console.log("url", weatherUrl);
    if (!response.ok) {
      Alert.alert("Error", "Something went wrong in fetching weather");
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
  };

  const weatherData = () => {
    console.log(imageUrl);
    return (
      <View style={styles.weatherView}>
        <TouchableOpacity onPress={fetchForeCast}>
          <Image
            style={styles.refresh}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3318/3318364.png",
            }}
          />
        </TouchableOpacity>
        {imageUrl && (
          <Image
            style={styles.icon}
            source={{
              uri: imageUrl,
            }}
          />
        )}
        {current && (
          <>
            <Text style={styles.tempView}>{foreCast.current.temp} °C</Text>
            <Text style={styles.textView}>{current.main}</Text>
            <Text style={styles.textView}>
              Description: {current.description}
            </Text>
          </>
        )}
      </View>
    );
  };

  const handleSearchEnter = () => {
    if (locSearch != "") {
      fetchLocSearch();
      setLocName(locSearch);
      setLocSearch("");
    } else {
      Alert.alert("Empty Search", "Please enter location");
    }
  };

  const renderSearch = () => {
    return (
      <View style={styles.searchView}>
        <TextInput
          style={styles.searchInput}
          onChangeText={(newText) => setLocSearch(newText)}
          defaultValue={locSearch}
          placeholder="Search Location .."
        />
        <TouchableOpacity onPress={checkLocPermission}>
          <Image
            style={styles.yourLocIcon}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/256/3711/3711245.png",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.enterButton}
          onPress={handleSearchEnter}
        >
          <Text style={{ color: "white", fontWeight: "700" }}>Enter</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderSearch()}
      <Text style={styles.caption}>Weather @ {locName}</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#660022" />
      ) : (
        weatherData()
      )}
      <CustomButton
        buttonText={"Go to Forecast"}
        handleClick={() => navigation.navigate("ForeCast", { userLoc })}
      />
    </View>
  );
};

export default WeatherHome;
