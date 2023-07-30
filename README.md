# Weather App


<img
  src="/img/sc1.png"
  alt="Alt text"
  title="Optional title"
  style="display: inline-block; margin: 0 auto; max-width: 100px">
  <img
  src="/img/sc2.png"
  alt="Alt text"
  title="Optional title"
  style="display: inline-block; margin: 0 auto; max-width: 100px">

<h4> Weather app have two screens </h4>

&nbsp; &nbsp;<h4>1. Weather Screen</h4>

&nbsp; &nbsp; &nbsp;     1. Application ask permission for tracking user location. Once user accepts request, it will show current weather of your location.

&nbsp; &nbsp; &nbsp;     2. at the top, you can search location, by clicking on 'Enter', you will get current weather at search location. Whatever the location we searched, it stores on an array and shows at bottom of the weather screen. Once we click on item in the search list, you can see that location on text input and click enter to get the current weather. Also it stores on asyncstorage to get the location array once we close the applicatiion.

&nbsp; &nbsp; &nbsp;     3. If we need to get current location weather again, click on user location icon.

&nbsp; &nbsp; &nbsp;     4. We have refresh button to get the updated weather.


&nbsp; &nbsp;<h4>2. 5 Day Forecast screen</h4> 

&nbsp; &nbsp; &nbsp;     Once we click on 'Go to Forecast', app moves to second screen. Here we can see 5 days forecast with 3 hour interval of times, which is a scrollable flatslist with weather data. If any slow or network issues are there, it will show a text  like 'Oops something went wrong' and refresh button. If your network stable, you can see foreacast details by click on refresh button.


&nbsp;&nbsp;<h4>3. Every error responses are handled properly.</h4>


&nbsp;&nbsp;<h4>3. Added react navigation and app icons for both ios and android.</h4>


&nbsp;&nbsp;<h4>3. Added API helpers and location helper for maitaining code quality and reusability</h4>


&nbsp;&nbsp;<h3> Installation </h3>

&nbsp; &nbsp; &nbsp;     git clone https://github.com/Anushaca1995/WeatherApp.git

&nbsp; &nbsp; &nbsp;     yarn install/npm install


&nbsp;&nbsp;<h3> Running </h3>

&nbsp; &nbsp; &nbsp;     npx react-native run-android / run-ios


   


