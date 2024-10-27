let currentDayEl = document.getElementById("currentDay");
let currentDateEl = document.getElementById("currentDate");
let nextDay1 = document.getElementById("nextDay1");
let nextDay2 = document.getElementById("nextDay2");
// current day
let country = document.getElementById("country");
let currentTem = document.getElementById("currentTem");
let currentImg = document.getElementById("currentImg");
let currentStatus = document.getElementById("currentStatus");
let humidity = document.getElementById("humidity");
let windSpeed = document.getElementById("windSpeed");
let windDirection = document.getElementById("windDirection");
// day 1
let day1Img = document.getElementById("day1Img");
let maxTemp1 = document.getElementById("maxTemp1");
let minTemp1 = document.getElementById("minTemp1");
let status1 = document.getElementById("status1");
// day 2
let day2Img = document.getElementById("day2Img");
let maxTemp2 = document.getElementById("maxTemp2");
let minTemp2 = document.getElementById("minTemp2");
let status2 = document.getElementById("status2");
// search on country
let searchInput = document.getElementById("search");
let searchCountry = "";
inputRegex = /^[a-zA-Z]{3,}$/;

function setDays() {
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  var currentDate = new Date();

  // Get the current day of the month and month name
  var currentDayFormatted =
    currentDate.getDate() +
    currentDate.toLocaleString("en-US", { month: "long" });

  // Get the current day index (0-6)
  var currentDayIndex = currentDate.getDay();

  // Get the name of the current day
  var currentDayName = days[currentDayIndex];

  // Get the names of the next two days
  var day1Name = days[(currentDayIndex + 1) % 7];
  var day2Name = days[(currentDayIndex + 2) % 7];

  currentDayEl.innerText = currentDayName;
  currentDateEl.innerText = currentDayFormatted;
  nextDay1.innerText = day1Name;
  nextDay2.innerText = day2Name;
}
setDays();
async function weather(searchCountry = "cairo") {
  try {
    let res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=1fe6590632444c28bb2112233240710&q=${searchCountry}&days=3`
    );
    let data = await res.json();

    //fill current day forcast
    country.innerHTML = data.location.name;
    currentTem.innerHTML = data.current.temp_c;
    currentImg.src = `https:${data.current.condition.icon}`;
    currentStatus.innerHTML = data.current.condition.text;
    humidity.innerHTML = data.current.humidity;
    windSpeed.innerHTML = data.current.wind_kph;
    windDirection.innerHTML = data.current.wind_dir;

    //fill day 1 after
    day1Img.src = `https:${data.forecast.forecastday[1].day.condition.icon}`;
    maxTemp1.innerHTML = data.forecast.forecastday[1].day.maxtemp_c;
    minTemp1.innerHTML = data.forecast.forecastday[1].day.mintemp_c;
    status1.innerHTML = data.forecast.forecastday[1].day.condition.text;
    //fill day 2 after
    day2Img.src = `https:${data.forecast.forecastday[2].day.condition.icon}`;
    maxTemp2.innerHTML = data.forecast.forecastday[2].day.maxtemp_c;
    minTemp2.innerHTML = data.forecast.forecastday[2].day.mintemp_c;
    status2.innerHTML = data.forecast.forecastday[2].day.condition.text;
  } catch (e) {
    console.error("Error fetching weather data:", e);
  }
}
weather();

searchInput.addEventListener("input", function () {
  searchCountry = searchInput.value.trim();

  if (inputRegex.test(searchCountry)) {
    weather(searchCountry);
  } else {
    weather("cairo");
  }
});
