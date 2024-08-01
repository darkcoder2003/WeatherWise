const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '3df1e27e9dmsh9c859af546e3a1fp1065c8jsn0eeb0bf77060',
		'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com'
	}
};

function saveSearch(location) {
    let searches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    searches = searches.filter(item => item.toLowerCase() !== location.toLowerCase());
    searches.unshift(location);
    searches = searches.slice(0, 5);
    localStorage.setItem('recentSearches', JSON.stringify(searches));
    displayRecentSearches();
}

function displayRecentSearches() {
    const searches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    const list = document.getElementById('recentSearchesList');
    list.innerHTML = '';
    searches.forEach(location => {
        const li = document.createElement('li');
        li.textContent = location;
        li.addEventListener('click', () => getweather(location));
        list.appendChild(li);
    });
}

const getweather = (location) => {
    cityname.innerHTML = location;
    fetch(`https://yahoo-weather5.p.rapidapi.com/weather?location=${encodeURIComponent(location)}&format=json&u=f`, options)
        .then(response => response.json())
        .then((response) => {
            console.log(response);
            if (response.current_observation) {
                temp.innerHTML = response.current_observation.condition.temperature;
                humidity.innerHTML = response.current_observation.atmosphere.humidity;
                visibility.innerHTML = response.current_observation.atmosphere.visibility;
                sunrise.innerHTML = response.current_observation.astronomy.sunrise;
                sunset.innerHTML = response.current_observation.astronomy.sunset;
                wind_speed.innerHTML = response.current_observation.wind.speed;
                condition.innerHTML = response.current_observation.condition.text;
                day1.innerHTML = response.forecasts[0].day;
                high1.innerHTML = response.forecasts[0].high;
                low1.innerHTML = response.forecasts[0].low;
                condition1.innerHTML = response.forecasts[0].text;
                day2.innerHTML = response.forecasts[1].day;
                high2.innerHTML = response.forecasts[1].high;
                low2.innerHTML = response.forecasts[1].low;
                condition2.innerHTML = response.forecasts[1].text;
                day3.innerHTML = response.forecasts[2].day;
                high3.innerHTML = response.forecasts[2].high;
                low3.innerHTML = response.forecasts[2].low;
                condition3.innerHTML = response.forecasts[2].text;
                day4.innerHTML = response.forecasts[3].day;
                high4.innerHTML = response.forecasts[3].high;
                low4.innerHTML = response.forecasts[3].low;
                condition4.innerHTML = response.forecasts[3].text;
                day5.innerHTML = response.forecasts[4].day;
                high5.innerHTML = response.forecasts[4].high;
                low5.innerHTML = response.forecasts[4].low;
                condition5.innerHTML = response.forecasts[4].text;

                saveSearch(location);
            } else {
                console.error('Unexpected API response structure');
                cityname.innerHTML = 'Error: Could not retrieve weather data';
            }
        })
        .catch(err => {
            console.error('Error fetching weather data:', err);
            cityname.innerHTML = 'Error fetching weather data';
        });
}

submit.addEventListener("click", (e) => {
    e.preventDefault();
    getweather(city.value);
});

document.addEventListener('DOMContentLoaded', () => {
    displayRecentSearches();
    getweather("Delhi");
});

getweather("Delhi");