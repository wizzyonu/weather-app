let long = 3.3792;
let lat = 6.5244;
let selectCity;

const majorCities = {
      "New York": { lat: 40.7128, lon: -74.006 },
      London: { lat: 51.5074, lon: -0.1278 },
      Tokyo: { lat: 35.6895, lon: 139.6917 },
      Paris: { lat: 48.8566, lon: 2.3522 },
      Sydney: { lat: -33.8688, lon: 151.2093 },
      "Los Angeles": { lat: 34.0522, lon: -118.2437 },
      Moscow: { lat: 55.7558, lon: 37.6173 },
      Beijing: { lat: 39.9042, lon: 116.4074 },
      Dubai: { lat: 25.2048, lon: 55.2708 },
      Singapore: { lat: 1.3521, lon: 103.8198 },
      "Hong Kong": { lat: 22.3193, lon: 114.1694 },
      Berlin: { lat: 52.52, lon: 13.405 },
      Toronto: { lat: 43.6532, lon: -79.3832 },
      "Mexico City": { lat: 19.4326, lon: -99.1332 },
      Istanbul: { lat: 41.0082, lon: 28.9784 },
      Johannesburg: { lat: -26.2041, lon: 28.0473 },
      "São Paulo": { lat: -23.5505, lon: -46.6333 },
      Mumbai: { lat: 19.076, lon: 72.8777 },
      Seoul: { lat: 37.5665, lon: 126.978 },
      Bangkok: { lat: 13.7563, lon: 100.5018 },
      Rome: { lat: 41.9028, lon: 12.4964 },
      Madrid: { lat: 40.4168, lon: -3.7038 },
      Chicago: { lat: 41.8781, lon: -87.6298 },
      Cairo: { lat: 30.0444, lon: 31.2357 },
      "Buenos Aires": { lat: -34.6037, lon: -58.3816 },
      Jakarta: { lat: -6.2088, lon: 106.8456 },
      Lagos: { lat: 6.5244, lon: 3.3792 },
      Toronto: { lat: 43.65107, lon: -79.347015 },
      "San Francisco": { lat: 37.7749, lon: -122.4194 },
      Vancouver: { lat: 49.2827, lon: -123.1207 },
      "Cape Town": { lat: -33.9249, lon: 18.4241 },
    };


navigator.geolocation.getCurrentPosition(
  (pos) => {
    console.log(pos.coords);
    long = pos.coords.longitude;
    lat = pos.coords.latitude;
  },
  (error) => {
    console.error("Error getting location:", error);
  }
);

async function fetchData() {
  const url = `https://open-weather13.p.rapidapi.com/fivedaysforcast?latitude=${lat}&longitude=${long}&lang=EN`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "2ca897141amshb42aeab8eefe026p10d9bfjsn8b3c0ef502f2",
      "x-rapidapi-host": "open-weather13.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const { list, city } = result;

    const main = document.querySelector(".main");
    // const mainWeather = document.querySelector('.weather-main');
    // const forcast = document.querySelector('.forcast');

    // Major cities with their coordinates
   

    const weather = document.createElement("div");
    weather.setAttribute("class", "weather-main");
    weather.innerHTML = `
                    <div style="display: flex; justify-content: flex-end">
                    <select
                        id="city-select"
                        style="
                        margin-bottom: 1rem;
                        border-radius: 8px;
                        padding: 0.4rem 1rem;
                        border: none;
                        font-size: 1rem;
                        background: linear-gradient(
                            120deg,
                            #f7971e 0%,
                            #ffd200 100%
                            );
                            color: #333;
                            font-weight: 500;
                            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
                            cursor: pointer;
                            "
                            >
                        </select>
                    </div>
                    <div class="temp">${
                      Math.round((list[0].main.temp - 273.15) * 100) / 100
                    }°C</div>
                        <div class="desc">${
                          list[0].weather[0].description
                        }</div>
                    <div class="weather-details">
                        <div>Wind: ${
                          Math.round((list[0].wind.speed / 1000) * 100) / 100
                        } km/h</div>
                    <div>Visibility: ${
                      Math.round((list[0].visibility / 1000) * 100) / 100
                    } km</div>
                    <div>Sea level: ${list[0].main.sea_level} hPa</div>
                    <div>Humidity: ${list[0].main.humidity}%</div>
                        </div>
                    <div class="date">${new Date(
                      list[0].dt_txt
                    ).toDateString()}</div>
        `;

    main.appendChild(weather);
    listCity();

    const forecast = document.createElement("div");
    forecast.setAttribute("class", "forecast");
    main.appendChild(forecast);

    list
      .filter((item) => item.dt_txt && item.dt_txt.endsWith("12:00:00"))
      .forEach((item) => {
        console.log("reached here");
        const forecastItem = document.createElement("div");
        forecastItem.classList.add("forecast-item");
        forecastItem.innerHTML = `
            <div class="forecast-day">
            <div class="day">${new Date(item.dt_txt).toLocaleString("en-US", {
              weekday: "short",
            })}</div>
            <div class="icon">🌦️</div>
            <div class="temp">${
              Math.round((item.main.temp - 273.15) * 100) / 100
            }°C</div>
            <div class="desc">${item.weather[0].description}</div>
            </div>
            `;
        document.querySelector(".forecast").appendChild(forecastItem);
      });

        document.getElementById("city-select").addEventListener("change", (e) => {
        selectCity = e.target.value;
        console.log("Selected city:", selectCity);
        document.querySelector(".main").innerHTML = ""; // Clear previous content

          //fetchData();
        });
        function listCity() {
      Object.keys(majorCities).forEach((city, coords) => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        option.selected = city === result.city.name; // Select the current city
        document.querySelector("#city-select").appendChild(option);
      });
    }
  } catch (error) {
    console.error(error);
  }
}
 //fetchData();
 
    


