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
import { LocHelper, ApiHelper } from "../../helpers";
import { weatherAPIKey } from "../../config/AppConfig";
import {
  kSearchWeather,
  kCurrentWeatherUrl,
  kApiUrlEndpoint,
} from "../../config/WebServices";
import utils from "../../utils";

const WeatherHome = ({ navigation }) => {
  const [userLoc, setUserLoc] = useState(null);
  const [foreCast, setForeCast] = useState(null);
  const [currentWeather, setCurrentWeather] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [locSearch, setLocSearch] = useState("");
  const [locName, setLocName] = useState();

  let searchObject = {
    exclude: "minutely",
    units: "metric",
    limit: 5,
    appid: weatherAPIKey,
  };

  let currentWeatherObject = {
    exclude: "minutely",
    units: "metric",
    appid: weatherAPIKey,
  };

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
            utils.showAlertWithDelay("Oops", "Something went wrong");
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

    const response = await ApiHelper.get(kSearchWeather, {
      ...searchObject,
      q: locSearch,
    });

    if (!response.ok) {
      utils.showAlertWithDelay("Error", "Something went wrong in search");
    } else {
      const { data } = response;

      if (data && data.length > 0) {
        setUserLoc({ latitude: data[0].lat, longitude: data[0].lon });
      } else {
        setUserLoc(undefined);
        setForeCast(null);
        setCurrentWeather(null);
      }
    }
    setIsLoading(false);
  };

  const fetchForeCast = async () => {
    const response = await ApiHelper.get(kCurrentWeatherUrl, {
      ...currentWeatherObject,
      lat: userLoc.latitude,
      lon: userLoc.longitude,
    });

    if (!response.ok) {
      utils.showAlertWithDelay(
        "Error",
        "Something went wrong in fetching weather"
      );
    } else {
      const { data } = response;

      setForeCast(data);
      setCurrentWeather(data.current.weather[0]);
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
        {currentWeather && (
          <>
            <Text style={styles.tempView}>{foreCast.current.temp} °C</Text>
            <Text style={styles.textView}>{currentWeather.main}</Text>
            <Text style={styles.textView}>
              Description: {currentWeather.description}
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
      utils.showAlertWithDelay("Empty Search", "Please enter location");
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
      {userLoc != undefined ? (
        <>
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
        </>
      ) : (
        <View
          style={{ justifyContent: "center", alignItems: "center", margin: 20 }}
        >
          <Text style={styles.caption}>Oops! Something Went Wrong</Text>
          <Text style={styles.textView}>
            Please try again with valid places
          </Text>
          <Text style={styles.textView}>Or</Text>
          <Text style={styles.textView}>Choose your own location</Text>
        </View>
      )}
    </View>
  );
};

export default WeatherHome;
