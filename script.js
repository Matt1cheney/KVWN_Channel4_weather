$(function() {
  let forecasturl = "https://api.openweathermap.org/data/2.5/forecast?q=";
  // {city name},{country code}
  let apiKey = "973464612f77fc58086327531b8be6f9";
  let weatherSearch = $(".citySearch");
  let dayWeatherCall =
    forecasturl + "derry" + ",us&mode=json&units=imperial&appid=" + apiKey;
  let currentWeatherurl = "https://api.openweathermap.org/data/2.5/weather?q=";
  let currentWeatherCall =
    currentWeatherurl +
    "derry" +
    ",us&mode=json&units=imperial&appid=" +
    apiKey;

  function currentWeather() {
    $.get(currentWeatherCall, function(response) {
      console.log(response);

      $(".temp").text(`temp: ${Math.floor(response.main.temp)} F`);
      $(".humidity").text(`Humidity: ${response.main.humidity} F`);
      $(".windspeed").text(`Windspeed: ${response.wind.speed.imperial} F`);
    });
  }

  function parseForecastData(forecast) {
    let tomorrow = moment().add(1, "days");
    let incrementday = moment();
    console.log(forecast);
    forecast.forEach(timeBlock => {
      forDate = moment
        .unix(timeBlock.dt)
        .format("dddd, MMMM, Do, YYYY h:mm:ss A");
      // console.log(forDate);

      tempVal = timeBlock.main.temp;
      humidVal = timeBlock.main.humidity;
      windSpeed = timeBlock.wind.speed;
      //day 1

      $(".date1").text(
        moment()
          .add(1, "days")
          .format("M/D/YY")
      );
      $(".icon1").text(timeBlock.weather[0].icon);

      //day2

      $(".date2").text(
        moment()
          .add(2, "days")
          .format("M/D/YY")
      );
      $(".icon2").text(timeBlock.weather[0].icon);
      //day 3

      $(".date3").text(
        moment()
          .add(3, "days")
          .format("M/D/YY")
      );
      $(".icon3").text(timeBlock.weather[0].icon);
      // day 4

      $(".date4").text(
        moment()
          .add(4, "days")
          .format("M/D/YY")
      );
      $(".icon4").text(timeBlock.weather[0].icon);

      // day 5
      $(".date5").text(
        moment()
          .add(5, "days")
          .format("M/D/YY")
      );
      $(".icon5").text(timeBlock.weather[0].icon);

      //   NEED TO GET UV INDEX WITH SEPERATE API
    });
  }
  function get5DayForecast() {
    $.get(dayWeatherCall, function(response) {
      console.log(response);
      let forecastArr = response.list;
      parseForecastData(forecastArr);
      // weatherCall.forEach(uvVal => {

      // });
    });
  }
  // currentWeather();
  // get5DayForecast();
  parseForecastData(window.testResponse.list);
});
