var MetSpider = function() {

	var providers = new Providers();
	var places = new Places();
	var winds = [
		['N', 349, 11],
		['NNE', 12, 33],
		['NE', 34, 56],
		['ENE', 57, 78],
		['E', 79, 101],
		['ESE', 102, 123],
		['SE', 124, 146],
		['SSE', 147, 168],
		['S', 169, 191],
		['SSW', 192, 213],
		['SW', 214, 236],
		['WSW', 237, 258],
		['W', 259, 281],
		['WNW', 282, 303],
		['NW', 304, 326],
		['NNW', 327, 348]
	];
	
	var timestamp2Time = function(timestamp) {
		return new Date(timestamp*1000).toTimeString();
	};
	
	var directionName = function(degrees) {
		for (var i = 0; i < winds.length; i++) {
			if (winds[i][1] <= degrees && degrees <= winds[i][2]) {
				return winds[i][0];
			}
		}
		return degrees;
	};
	
	return {
		current : function(placeKey) {
			var provider = providers.OpenWeatherMap();
			console.log(provider);
			$('#current .provider').text(provider.name);
			var place = places.find(placeKey);
			console.log(place);
			$('#current .place').text(place.name);
			$.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + place.lat + '&lon=' + place.lon + '&units=metric&appid=' + provider.apiKey, function(data) {
				console.log(data);
				$('#current').show();
			 	$('#current .temp').text(data.main.temp);
			 	$('#current .rh').text(data.main.humidity);
			 	$('#current .pressure').text(data.main.pressure);
			 	$('#current .clouds').text(data.clouds.all);
			 	$('#current .wind_speed').text(data.wind.speed);
			 	$('#current .wind_direction').text(directionName(parseInt(data.wind.deg)));
			 	$('#current .visibility').text(data.visibility);
			 	$('#current .city_name').text(data.id + ' ' + data.name);
			 	$('#current .description').text(data.weather[0].description);
			 	$('#current .sunrise').text(timestamp2Time(data.sys.sunrise));
			 	$('#current .sunset').text(timestamp2Time(data.sys.sunset));
			 	$('#current .dt').text(timestamp2Time(data.dt));
			});
		}
	}
};

var app = new MetSpider();