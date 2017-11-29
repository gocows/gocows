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
		changeProvider : function(providerKey) {
			$('#current_provider').val(providerKey);
			this.loadWeather();
			
		},
		
		changePlace : function(placeKey) {
			$('#current_place').val(placeKey);
			this.loadWeather();
		},
		
		loadWeather : function() {
			var providerKey = $('#current_provider').val();
			var provider = providers.find(providerKey);
			console.log(provider);
			var placeKey = $('#current_place').val();
			var place = places.find(placeKey);
			console.log(place);
			
			$.getJSON('https://api.darksky.net/forecast/' + provider.apiKey + '/' + place.lat + ',' + place.lon + '?units=si&extend=hourly&callback=?', function(data) {
				console.log(data.currently);
				console.log(data.daily);
				console.log(data.hourly);

				$('#current').text(timestamp2Time(data.currently.time) + ': ' + data.currently.summary + ' ' + data.currently.temperature + ' C (dew point '
					+ data.currently.dewPoint + ' C) ' + data.currently.humidity*100 + '% ' + data.currently.pressure + ' hPa '
					+ data.currently.windSpeed + ' m/s ' + directionName(data.currently.windBearing) + ' (gusts ' + data.currently.windGust + ' m/s) '
					+ 'Clouds:' + data.currently.cloudCover*100 + '% (' + data.currently.icon + ') ' 
					+ data.currently.precipType + ' (' + data.currently.precipProbability*100 + '% '
					+ data.currently.precipIntensity + ' mm/h) UV:' + data.currently.uvIndex
					+ ' Ozone:' + data.currently.ozone);
					
//				var ctx = document.getElementById('forecastCanvas').getContext('2d');
			});
		}
	}
};

var app = new MetSpider();

$(document).ready(function() {
	//app.loadPlaces();
});