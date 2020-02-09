$(function() {
  let forecasturl = "https://api.openweathermap.org/data/2.5/forecast?q=";
  // {city name},{country code}
  let apiKey = "973464612f77fc58086327531b8be6f9";
  let weatherSearch = "";
  let currentWeatherurl = "https://api.openweathermap.org/data/2.5/weather?q=";
  let buttonCount = 0;
  localStorage.getItem($("derry"));
  $(".fa-search").on("click", function() {
    $(".day").empty();
    weatherSearch = $(".citySearch").val();

    let currentWeatherCall =
      currentWeatherurl +
      weatherSearch +
      ",us&mode=json&units=imperial&appid=" +
      apiKey;
    let dayWeatherCall =
      forecasturl +
      weatherSearch +
      ",us&mode=json&units=imperial&appid=" +
      apiKey;
    buttonCount++;
    $(".cityList").append(
      $("<button>", "<br/>")
        .addClass(`col-12 btn btn-secondary btn-lg button${buttonCount}`)
        .text(weatherSearch)
    );
    localStorage.setItem($(`.button${buttonCount}`).text(), "string");
    
    //console.log(dayWeatherCall);
    get5DayForecast();
    currentWeather();

    function currentWeather() {
      $.get(currentWeatherCall, function(response) {
        console.log(response);
        $(".date").text(moment().format("MM/ DD/ YY"));
        $(".date").append(
          $("<img>").attr(
            "src",
            `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
          )
        );
        $(".cityName").text(response.name);

        $(".temp").text(`temp: ${Math.floor(response.main.temp)} F`);
        $(".humidity").text(`Humidity: ${response.main.humidity} %`);
        $(".windspeed").text(`Windspeed: ${response.wind.speed} MPH`);
      });
    }

    function parseForecastData(forecast) {
      // console.log(forecast);
      let currentDay = "00";
      let dayCount = 0;
      let hourCount = 43200;
      let hourSelect = moment().add(`${hourCount}`, "hours");
      forecast.forEach(timeBlock => {
        //variables
        let day = moment.unix(timeBlock.dt).format("DD");
        let hour = moment.unix(timeBlock.dt).format("HH");
        tempVal = Math.floor(timeBlock.main.temp);
        humidVal = timeBlock.main.humidity;
        windSpeed = timeBlock.wind.speed;
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
          $(`.day${dayCount}`).append(
            $("<img>").attr(
              "src",
              `https://openweathermap.org/img/wn/${timeBlock.weather[0].icon}@2x.png`
            )
          );
          $(`.day${dayCount}`).append($("<li>").text(`Temp: ${tempVal} F`));
          $(`.day${dayCount}`).append($("<li>").text(`Humidity: ${humidVal}%`));
        }

        forDate = moment
          .unix(timeBlock.dt)
          .format("dddd, MMMM, Do, YYYY h:mm:ss A");
        // console.log(forDate);

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
        console.log(response);
        let forecastArr = response.list;
        parseForecastData(forecastArr);
        // weatherCall.forEach(uvVal => {

        // });
      });
    }
    $(`.button${buttonCount}`).on("click", function() {
     

       currentWeather();
       get5DayForecast();
    });
  });
  //parseForecastData(window.testResponse.list);
});
