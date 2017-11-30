var MetSpider = function() {

	var chart = null;
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
	
	var timestamp2Date = function(timestamp) {
		return new Date(timestamp*1000).toDateString();
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

				$('#current').text(place.name + ', ' + provider.name + ' at ' + timestamp2Time(data.currently.time) + ': ' + data.currently.summary + ' ' + data.currently.temperature + ' C (dew point '
					+ data.currently.dewPoint + ' C) ' + data.currently.humidity*100 + '% ' + data.currently.pressure + ' hPa '
					+ data.currently.windSpeed + ' m/s ' + directionName(data.currently.windBearing) + ' (gusts ' + data.currently.windGust + ' m/s) '
					+ 'Clouds:' + data.currently.cloudCover*100 + '% (' + data.currently.icon + ') ' 
					+ data.currently.precipType + ' (' + data.currently.precipProbability*100 + '% '
					+ data.currently.precipIntensity + ' mm/h) UV:' + data.currently.uvIndex
					+ ' Ozone:' + data.currently.ozone);
				
				var xAxisLabels = [];
				for (var index in data.hourly.data) {
					xAxisLabels[index] = timestamp2Date(data.hourly.data[index].time).substring(0, 4) + ' ' + timestamp2Time(data.hourly.data[index].time).substring(0, 5);
				}
				var hourlyTemp = [];
				for (var index in data.hourly.data) {
					hourlyTemp[index] = data.hourly.data[index].temperature;
				}
				
				var hourlyDewPoint = [];
				for (var index in data.hourly.data) {
					hourlyDewPoint[index] = data.hourly.data[index].dewPoint;
				}
				
				var hourlyPressure = [];
				for (var index in data.hourly.data) {
					hourlyPressure[index] = data.hourly.data[index].pressure;
				}
				
				/*var hourlyWindSpeed = [];
				for (var index in data.hourly.data) {
					hourlyWindSpeed[index] = data.hourly.data[index].windSpeed;
				}
				
				var hourlyHumidity = [];
				for (var index in data.hourly.data) {
					hourlyHumidity[index] = data.hourly.data[index].humidity;
				}*/
				
				$('#forecastCanvas').show();
				var ctx = document.getElementById('forecastCanvas').getContext('2d');
				if (chart != null) {
					chart.destroy();
				}
				chart = new Chart(ctx, {
					type: 'line',
					data: {
						labels: xAxisLabels,
						datasets: [{
							label: 'Temperature',
							data: hourlyTemp,
							borderWidth: 4,
							fill: false,
							pointRadius: 0,
							yAxisID: "y-axis-1",
							borderColor: 'red'
						},
						{
							label: 'Pressure',
							data: hourlyPressure,
							borderWidth: 4,
							fill: false,
							pointRadius: 0,
							yAxisID: "y-axis-2",
							borderColor: 'green'
						},
						/*{
							label: 'Wind Speed',
							data: hourlyWindSpeed,
							borderWidth: 4,
							fill: false,
							pointRadius: 0,
							yAxisID: "y-axis-3",
							borderColor: 'yellow'
						},*/
						{
							label: 'Dew Point',
							data: hourlyDewPoint,
							borderWidth: 4,
							fill: false,
							pointRadius: 0,
							yAxisID: "y-axis-1",
							borderColor: 'blue'
						}]
					},
					options: {
						responsive: true,
						hoverMode: 'index',
						stacked: false,
						title:{
							display: true,
							text:'Chart.js Line Chart - Multi Axis'
						},
						scales: {
							yAxes: [{
							    type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							    display: true,
							    position: "left",
							    id: "y-axis-1",
							},
							/*{
							    type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							    display: true,
							    position: "left",
							    id: "y-axis-3",
							},*/ {
							    type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							    display: true,
							    position: "right",
							    id: "y-axis-2",

							    // grid line settings
							    gridLines: {
							        drawOnChartArea: false, // only want the grid lines for one axis to show up
							    },
							}/*,
							{
							    type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							    display: true,
							    position: "right",
							    id: "y-axis-4",

							    // grid line settings
							    gridLines: {
							        drawOnChartArea: false, // only want the grid lines for one axis to show up
							    },
							}*/],
						}
					}
				});
			});
		}
	}
};

var app = new MetSpider();

$(document).ready(function() {
	//app.loadPlaces();
});