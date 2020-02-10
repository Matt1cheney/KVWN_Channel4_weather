$(function() {
  // global varaibles
  let forecasturl = "https://api.openweathermap.org/data/2.5/forecast?q=";
  let apiKey = "973464612f77fc58086327531b8be6f9";
  let weatherSearch = "";
  let currentWeatherurl = "https://api.openweathermap.org/data/2.5/weather?q=";
  let buttonCount = 0;
  // grabbing buttons from local storage
  localStorage.getItem($("derry"));
  $(".fa-search").on("click", function() {
    // clears the 5 day forcast containers
    $(".day").empty();
    weatherSearch = $(".citySearch").val();
    // create api request for current weather
    let currentWeatherCall =
      currentWeatherurl +
      weatherSearch +
      ",us&mode=json&units=imperial&appid=" +
      apiKey;
    // create api request for 5 day weather
    let dayWeatherCall =
      forecasturl +
      weatherSearch +
      ",us&mode=json&units=imperial&appid=" +
      apiKey;
    buttonCount++;
    // create button and give button classes
    $(".cityList").append(
      $("<button>", "<br/>")
        .addClass(
          `col-12 btn btn-secondary btn-lg cityButton button${buttonCount}`
        )
        .text(weatherSearch)
    );
    //store button to local storage
    localStorage.setItem($(`.button${buttonCount}`).text(), "string");

    // fire the 5day forecast and current weather forecast
    get5DayForecast();
    currentWeather();
    // function for current weather
    function currentWeather() {
      $.get(currentWeatherCall, function(response) {
        // show date and icon
        $(".date").text(moment().format("MM/ DD/ YY"));
        $(".date").append(
          $("<img>").attr(
            "src",
            `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
          )
        );
        // show city name
        $(".cityName").text(response.name);
        // print temp, humidity, and windspeed
        $(".temp").text(`temp: ${Math.floor(response.main.temp)} F`);
        $(".humidity").text(`Humidity: ${response.main.humidity} %`);
        $(".windspeed").text(`Windspeed: ${response.wind.speed} MPH`);
      });
    }
    // grab data
    function parseForecastData(forecast) {
      let currentDay = "00";
      let dayCount = 0;
      let hourCount = 43200;
      let hourSelect = moment().add(`${hourCount}`, "hours");
      forecast.forEach(timeBlock => {
        // variables
        let day = moment.unix(timeBlock.dt).format("DD");
        let hour = moment.unix(timeBlock.dt).format("HH");
        tempVal = Math.floor(timeBlock.main.temp);
        humidVal = timeBlock.main.humidity;
        windSpeed = timeBlock.wind.speed;
        // if statement for showing 
        if (day != currentDay) {
          currentDay = day;

          dayCount++;
          hourCount[4];
          // grabs the 12th hour of everyday
          console.log(day, hour);
          $(`.day${dayCount}`).append(
            $("<li>").text(
              moment()
                .add(`${dayCount}`, "days")
                .format("M/D/YY")
            )
          );
          // creates icons in the 5 day
          $(`.day${dayCount}`).append(
            $("<img>").attr(
              "src",
              `https://openweathermap.org/img/wn/${timeBlock.weather[0].icon}@2x.png`
            )
          );
          // tempurature and humidity in 5 day containers
          $(`.day${dayCount}`).append($("<li>").text(`Temp: ${tempVal} F`));
          $(`.day${dayCount}`).append($("<li>").text(`Humidity: ${humidVal}%`));
        }

        forDate = moment
          .unix(timeBlock.dt)
          .format("dddd, MMMM, Do, YYYY h:mm:ss A");

        //day 1

        //day2

        $(".date2").text(
          moment()
            .add(2, "days")
            .format("M/D/YY")
        );
        $(".icon2").append(
          $("<img>").attr(
            "href",
            `https://openweathermap.org/img/wn/${timeBlock.weather[0].icon}@2x.png`
          )
        );
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
        let forecastArr = response.list;
        parseForecastData(forecastArr);
        // weatherCall.forEach(uvVal => {

        // });
      });
    }
    // event listener for button 
    $(`.button${buttonCount}`).on("click", function() {
      // when clicked empty 5 day containers
      $(".day").empty();
      // fire with the button value 
      currentWeather();
      get5DayForecast();
    });
  });
});
