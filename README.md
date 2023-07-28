# Weather App

My weather app have two screen

1. Weather Screen
       1. Application ask permission for tracking user location. Once user accepts request, it will show current weather of your location.
       2. at the top, you can search location, by clicking on 'Enter', you will get current weather at search location. Whatever the location we searched, it stores on an array and shows at bottom of the weather screen. Once we click on item in the search list, you can see that location on text input and click enter to get the current weather. Also it stores on asyncstorage to get the location array once we close the applicatiion.
       3. If we need to get current location weather again, click on user location icon.
       4. We have refresh button to get the updated weather.

2. 5 Day Forecast screen - Once we click on 'Go to Forecast', app moves to second screen. Here we can see 5 days forecast with 3 hour interval of times, which is a scrollable flatslist with weather data. If any slow or network issues are there, it will show a text  like 'Oops something went wrong' and refresh button. If your network stable, you can see foreacast details by click on refresh button.

3. Every error responses are handled properly.


   


