
var apiKey = "11642b92b61139b28b1837e159d93e17"

var geoUrl = "https://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}"

function weatherLookup(event) {
    event.preventDefault()

    var city = $("#name").val()

    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=11642b92b61139b28b1837e159d93e17')
        .then(response => {
            return response.json();
        })
        .then(data => {

            var cityObj = data[0]
            var lat = cityObj.lat
            var lon = cityObj.lon

            var cityArray = JSON.parse(localStorage.getItem("cities")) || [];
            var search = {
                city,
                lat,
                lon,
            }
            cityArray.push(search)
            localStorage.setItem("cities", JSON.stringify(cityArray))
            getForecastByLatLon(lat, lon)


            displayCityBtns()

        });
};

function displayCityBtns() {
    $("#cityBtn").text("")
    var cities = JSON.parse(localStorage.getItem("cities"))

    cities.forEach(function (item) {

        $("#cityBtn").append($("<button>").text(item.city).on("click", function () {


            var city = item.city;

            getForecastByLatLon(item.lat, item.lon)
        }));
    });
}

function getForecastByLatLon(lat, lon) {

    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=11642b92b61139b28b1837e159d93e17&units=imperial')
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data)

            $("#icon0").attr("src", "http://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + ".png")
            $("#icon1").attr("src", "http://openweathermap.org/img/wn/" + data.list[7].weather[0].icon + ".png")
            $("#icon2").attr("src", "http://openweathermap.org/img/wn/" + data.list[15].weather[0].icon + ".png")
            $("#icon3").attr("src", "http://openweathermap.org/img/wn/" + data.list[23].weather[0].icon + ".png")
            $("#icon4").attr("src", "http://openweathermap.org/img/wn/" + data.list[31].weather[0].icon + ".png")
            $("#icon5").attr("src", "http://openweathermap.org/img/wn/" + data.list[39].weather[0].icon + ".png")

            $("#city-name").text(data.city.name)
            $("#temp").text(data.list[0].main.temp)
            $("#wind").text(data.list[0].wind.speed)
            $("#humidity").text(data.list[0].main.humidity)

            $("#d1Date").text(dayjs(data.list[7].dt * 1000).format("MM-DD-YYYY"))
            $("#d1Temp").text(data.list[7].main.temp)
            $("#d1Wind").text(data.list[7].wind.speed)
            $("#d1Humidity").text(data.list[7].main.humidity)

            $("#d2Date").text(dayjs(data.list[15].dt * 1000).format("MM-DD-YYYY"))
            $("#d2Temp").text(data.list[15].main.temp)
            $("#d2Wind").text(data.list[15].wind.speed)
            $("#d2Humidity").text(data.list[15].main.humidity)

            $("#d3Date").text(dayjs(data.list[23].dt * 1000).format("MM-DD-YYYY"))
            $("#d3Temp").text(data.list[23].main.temp)
            $("#d3Wind").text(data.list[23].wind.speed)
            $("#d3Humidity").text(data.list[23].main.humidity)

            $("#d4Date").text(dayjs(data.list[31].dt * 1000).format("MM-DD-YYYY"))
            $("#d4Temp").text(data.list[31].main.temp)
            $("#d4Wind").text(data.list[31].wind.speed)
            $("#d4Humidity").text(data.list[31].main.humidity)

            $("#d5Date").text(dayjs(data.list[39].dt * 1000).format("MM-DD-YYYY"))
            $("#d5Temp").text(data.list[39].main.temp)
            $("#d5Wind").text(data.list[39].wind.speed)
            $("#d5Humidity").text(data.list[39].main.humidity)

        });
}

$("#day1").text(dayjs().format("MM-DD-YYYY"))

$("#city-search").on("submit", weatherLookup)

displayCityBtns()
