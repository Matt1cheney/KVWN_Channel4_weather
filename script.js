$(function() {
  let url = "https://api.openweathermap.org/data/2.5/forecast?q=";
  // {city name},{country code}
  let apiKey = "973464612f77fc58086327531b8be6f9";
  let weatherSearch = $(".citySearch");
  let weatherCall = url + weatherSearch+ ",us&mode=json&appid=" + apiKey;

  function parseForecastData(forecast) {
    const currentDay = moment();
    let incrementday = moment();
    console.log(forecast);
    forecast.forEach(timeBlock => {
      forDate = moment
        .unix(timeBlock.dt)
        .format("dddd, MMMM, Do, YYYY h:mm:ss A");
      // console.log(forDate);

      let kelvin = timeBlock.main.temp;
      celsius = kelvin - 273;

      let farenheit = -celsius * (9 / 5) + 32;
      farenheit = Math.floor(farenheit);
      temp = farenheit;
      // console.log(temp);
      $(".temp").text(`temp: ${temp} F`);

      humidVal = timeBlock.main.humidity;
      $(".humidity").text(`humidity: ${humidVal}`);

      windSpeed = timeBlock.wind.speed;
       console.log(Math.floor(windSpeed));

      //   NEED TO GET UV INDEX WITH SEPERATE API
    });
  }
  function get5DayForecast() {
    $.get(weatherCall, function(response) {
      console.log(response);
      let forecastArr = response.list;
      parseForecastData(forecastArr);
      // weatherCall.forEach(uvVal => {

      // });
    });
  }
  parseForecastData(window.testResponse.list);
  
  
});
