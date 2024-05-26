$(document).ready(function () {

    const apiKey = '84540bbe52674fb48fda904e0bea7194';

    function getWeather(latitude, longitude) {
        const url = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${apiKey}&lang=pt`;

        $('#loading').show();
        $('.container-weather').hide();

        $.get(url, function (data) {
            const weatherData = data.data[0];
            const cityName = weatherData.city_name;
            const temperature = Math.round(weatherData.temp);
            const description = weatherData.weather.description;
            const icon = weatherData.weather.icon;
            const rainProbability = weatherData.precip;
            const humidity = weatherData.rh; 

            const now = moment();
            moment.locale('pt');

            const day = now.format('DD');
            const month = now.format('MMMM');
            const year = now.format('YYYY');
            const dayOfWeek = now.format('dddd');

            $('#city_name').text(cityName);
            $('#temperature').text(`${temperature}°C`);
            $('#weather_description').text(`${description}`);
            $('#weather_icon').attr('src', `https://www.weatherbit.io/static/img/icons/${icon}.png`);
            $('#date').text(`${dayOfWeek}, ${day} de ${month}, ${year}`);
            $('#rainProbability').text(`${rainProbability}%`);
            $('#humidity').text(`Umidade: ${humidity}%`);

            $('#loading').hide();
            $('.container-weather').show();

        }).fail(function () {
            alert("Erro ao obter dados da API do tempo.");
        });
    }

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            getWeather(latitude, longitude);
        }, function (error) {
            console.error("Erro ao obter localização: ", error);
            alert('Erro ao obter localização.');
        });
    } else {
        alert('Geolocalização não suportada pelo seu navegador.');
    }
});