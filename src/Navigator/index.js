import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WeatherHome from '../containers/WeatherHome';
import WeatherList from '../containers/WeatherList';
const Navigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#400080', color: 'white'},
        headerTintColor: '#fefefe',
      }}>
      <Stack.Screen
        options={{
          headerTitleStyle: {color: 'white'},
          headerLeftContainerStyle: {color: 'white'},
        }}
        name="Weather Home"
        component={WeatherHome}
      />
      <Stack.Screen
        options={{
          headerTitleStyle: {color: 'white'},
          headerLeftContainerStyle: {color: 'white'},
        }}
        name="ForeCast"
        component={WeatherList}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
