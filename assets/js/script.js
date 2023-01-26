
var apiKey = "11642b92b61139b28b1837e159d93e17"

var geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}"


//[{ "name": "Seattle", "local_names": { "am": "ስያትል", "ko": "시애틀", "uk": "Сієтл", "en": "Seattle", "eo": "Seatlo", "bs": "Seattle", "kn": "ಸಿಯಾಟಲ್", "ru": "Сиэтл", "zh": "西雅圖", "tt": "Сиэтл", "bg": "Сиатъл", "oc": "Seattle", "la": "Seattlum", "ja": "シアトル", "fr": "Seattle", "lt": "Sietlas", "ug": "Séatl", "be": "Сіэтл", "af": "Seattle", "lv": "Sietla", "ar": "سياتيل، واشنطن", "uz": "Sietl" }, "lat": 47.6038321, "lon": -122.330062, "country": "US", "state": "Washington" }]


function weatherLookup(event) {
    event.preventDefault()

    var city = $("#name").val()

    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=11642b92b61139b28b1837e159d93e17')
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


            data.forEach(function (item) {

                $("#cityBtn").append($("<button>").text(city).on("click", function () {


                    city = $(this).text();
                    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=11642b92b61139b28b1837e159d93e17')
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
                        });
                }));
            });

        });
};






function getForecastByLatLon(lat, lon) {

    fetch('http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=11642b92b61139b28b1837e159d93e17&units=imperial')
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data)

            $("#temp").text(data.list[0].main.temp)
            $("#wind").text(data.list[0].wind.speed)
            $("#humidity").text(data.list[0].main.humidity)

            $("#d1Date").text(data.list[2].dt_txt)
            $("#d1Temp").text(data.list[2].main.temp)
            $("#d1Wind").text(data.list[2].wind.speed)
            $("#d1Humidity").text(data.list[2].main.humidity)

            $("#d2Date").text(data.list[9].dt_txt)
            $("#d2Temp").text(data.list[9].main.temp)
            $("#d2Wind").text(data.list[9].wind.speed)
            $("#d2Humidity").text(data.list[9].main.humidity)

            $("#d3Date").text(data.list[16].dt_txt)
            $("#d3Temp").text(data.list[16].main.temp)
            $("#d3Wind").text(data.list[16].wind.speed)
            $("#d3Humidity").text(data.list[16].main.humidity)

            $("#d4Date").text(data.list[25].dt_txt)
            $("#d4Temp").text(data.list[25].main.temp)
            $("#d4Wind").text(data.list[25].wind.speed)
            $("#d4Humidity").text(data.list[25].main.humidity)

            $("#d5Date").text(data.list[34].dt_txt)
            $("#d5Temp").text(data.list[34].main.temp)
            $("#d5Wind").text(data.list[34].wind.speed)
            $("#d5Humidity").text(data.list[34].main.humidity)

            // var dayOne = $("#day1").text(data.list[1].dt_txt) //
            console.log(data.list[1].dt_txt)


        });
}

$("#day1").text(dayjs().format("MM-DD-YYYY"))

$("#city-search").on("submit", weatherLookup)

