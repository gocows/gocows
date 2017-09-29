MetSpider = function() {

	var providers = new Providers();
	
	var timestamp2Time = function(timestamp) {
		return new Date(timestamp*1000).toTimeString();
	}
	
	return {
		start : function() {
			var apiKey = providers.OpenWeatherMap().getApiKey();
			$.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=49.80985&lon=23.98557&units=metric&appid=' + apiKey, function(data) {
				console.log(data);
			 	$('#current .temp').text(data.main.temp);
			 	$('#current .rh').text(data.main.humidity);
			 	$('#current .pressure').text(data.main.pressure);
			 	$('#current .clouds').text(data.clouds.all);
			 	$('#current .wind_speed').text(data.wind.speed);
			 	$('#current .wind_direction').text(data.wind.deg);
			 	$('#current .visibility').text(data.visibility);
			 	$('#current .description').text(data.weather[0].description);
			 	$('#current .sunrise').text(timestamp2Time(data.sys.sunrise));
			 	$('#current .sunset').text(timestamp2Time(data.sys.sunset));
			 	$('#current .dt').text(timestamp2Time(data.dt));
			});
		}
	}
};

let app = new MetSpider();
app.start();