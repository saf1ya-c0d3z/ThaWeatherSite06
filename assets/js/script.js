
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

        $("#d1Date").text()
        $("#d1Temp").text()
        $("#d1Wind").text()
        $("#d1Humidity").text()

        $("#d2Date").text()
        $("#d2Temp").text()
        $("#d2Wind").text()
        $("#d2Humidity").text()

        $("#d3Date").text()
        $("#d3Temp").text()
        $("#d3Wind").text()
        $("#d3Humidity").text()

        $("#d4Date").text()
        $("#d4Temp").text()
        $("#d4Wind").text()
        $("#d4Humidity").text()

        $("#d5Date").text()
        $("#d5Temp").text()
        $("#d5Wind").text()
        $("#d5Humidity").text()
            // var dayOne = $("#day1").text(data.list[1].dt_txt) //
            console.log(data.list[1].dt_txt)


        });
}

$("#day1").text(dayjs().format("MM-DD-YYYY"))

$("#city-search").on("submit", weatherLookup)

