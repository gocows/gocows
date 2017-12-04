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
			
			$.getJSON('https://api.darksky.net/forecast/' + provider.apiKey + '/' + place.lat + ',' + place.lon + '?units=si&lang=es&extend=hourly&callback=?', function(data) {
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
				var hourlyTemp = [];
				var hourlyDewPoint = [];
				var hourlyPressure = [];
				var hourlyWindSpeed = [];
				var hourlyHumidity = [];
				var hourlyWindGust = [];
				var hourlyVisibility = [];
				var hourlyUvIndex = [];
				var hourlyPrecipIntensity = [];
				var hourlyPrecipProbability = [];
				var hourlyOzone = [];
				var hourlyCloudCover = [];
				for (var index in data.hourly.data) {
					xAxisLabels[index] = timestamp2Date(data.hourly.data[index].time).substring(0, 4) + ' ' + timestamp2Time(data.hourly.data[index].time).substring(0, 5);
					hourlyTemp[index] = data.hourly.data[index].temperature;
					hourlyHumidity[index] = data.hourly.data[index].humidity*100;
					hourlyWindSpeed[index] = [data.hourly.data[index].windSpeed, data.hourly.data[index].windBearing];
					hourlyPressure[index] = data.hourly.data[index].pressure;
					hourlyDewPoint[index] = data.hourly.data[index].dewPoint;
					hourlyWindGust[index] = data.hourly.data[index].windGust;
					hourlyVisibility[index] = data.hourly.data[index].visibility;
					hourlyUvIndex[index] = data.hourly.data[index].uvIndex;
					hourlyPrecipIntensity[index] = data.hourly.data[index].precipIntensity;
					hourlyPrecipProbability[index] = data.hourly.data[index].precipProbability*100;
					hourlyOzone[index] = data.hourly.data[index].ozone;//
					hourlyCloudCover[index] = data.hourly.data[index].cloudCover*100;
				}
				console.log(hourlyWindSpeed);

				$('#chartContainer').show();
				Highcharts.chart('chartContainer', {
					title: {
						text: 'Forecast in ' + place.name + ' (' + provider.name + ')',
					},
					chart: {
						zoomType: 'x'
					},
					plotOptions: {
						spline: {
							marker: {
								radius: 1
							}
						}
					},
					xAxis: [{
						categories: xAxisLabels,
						crosshair: true,
						offset: 40
					}],
					yAxis: [{
						labels: {
							format: '{value}°C',
							style: {
								color: Highcharts.getOptions().colors[1]
							}
						},
						title: {
							text: 'Temperature',
							style: {
								color: Highcharts.getOptions().colors[1]
							}
						}
					},
					{
						labels: {
							format: '{value} hPa',
							style: {
								color: Highcharts.getOptions().colors[1]
							}
						},
						title: {
							text: 'Pressure',
							style: {
								color: Highcharts.getOptions().colors[1]
							}
						}
					},
					{
						title: {
							text: '%%',
							style: {
								color: Highcharts.getOptions().colors[0]
							}
						},
						labels: {
							format: '{value}%',
							style: {
								color: Highcharts.getOptions().colors[0]
							}
						},
						opposite: true
					},
					{
						title: {
							text: 'Wind Speed',
							style: {
								color: Highcharts.getOptions().colors[0]
							}
						},
						labels: {
							format: '{value} m/s',
							style: {
								color: Highcharts.getOptions().colors[0]
							}
						},
						opposite: true
					},
					{
						title: {
							text: 'Precipitation',
							style: {
								color: Highcharts.getOptions().colors[0]
							}
						},
						labels: {
							format: '{value} mm/h',
							style: {
								color: Highcharts.getOptions().colors[0]
							}
						},
						opposite: true
					},
					{
						title: {
							text: 'UV-Index',
							style: {
								color: Highcharts.getOptions().colors[0]
							}
						},
						labels: {
							format: '{value}',
							style: {
								color: Highcharts.getOptions().colors[0]
							}
						},
						opposite: true
					},
					{
						title: {
							text: 'Ozone',
							style: {
								color: Highcharts.getOptions().colors[0]
							}
						},
						labels: {
							format: '{value}',
							style: {
								color: Highcharts.getOptions().colors[0]
							}
						},
						opposite: true
					}],
					tooltip: {
						shared: true
					},
					legend: {
						layout: 'horizontal',
						align: 'center',
						verticalAlign: 'bottom',
						backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
					},
					series: [
					{
						name: 'Temperature',
						yAxis: 0,
						type: 'spline',
						data: hourlyTemp,
						tooltip: {
							valueSuffix: '°C'
						}
					},
					{
						name: 'Dew point',
						yAxis: 0,
						type: 'spline',
						data: hourlyDewPoint,
						visible: false,
						tooltip: {
							valueSuffix: '°C'
						}
					},
					{
						name: 'Pressure',
						yAxis: 1,
						type: 'spline',
						data: hourlyPressure,
						tooltip: {
							valueSuffix: ' hPa'
						}
					},
					{
						name: 'Humidity',
						yAxis: 2,
						type: 'spline',
						data: hourlyHumidity,
						visible: false,
						tooltip: {
							valueSuffix: '%'
						}
					},
					{
						name: 'Visibility',
						yAxis: 2,
						type: 'column',
						data: hourlyVisibility,
						visible: false,
						tooltip: {
							valueSuffix: '%'
						}
					},
					{
						name: 'Precip Probability',
						yAxis: 2,
						type: 'spline',
						data: hourlyPrecipProbability,
						visible: false,
						tooltip: {
							valueSuffix: '%'
						}
					},
					{
						name: 'Cloud Cover',
						yAxis: 2,
						type: 'spline',
						data: hourlyCloudCover,
						visible: false,
						tooltip: {
							valueSuffix: '%'
						}
					},
					{
						name: 'Wind Bearing',
						type: 'windbarb',
						data: hourlyWindSpeed,
						visible: false,
						tooltip: {
							valueSuffix: ' m/s'
						}
					},
					{
						name: 'Wind Speed',
						yAxis: 3,
						keys: ['y', 'rotation'],
						type: 'area',
						data: hourlyWindSpeed,
						visible: false,
						tooltip: {
							valueSuffix: ' m/s'
						}
					},
					{
						name: 'Wind Gust',
						yAxis: 3,
						type: 'spline',
						data: hourlyWindGust,
						visible: false,
						tooltip: {
							valueSuffix: ' m/s'
						}
					},
					{
						name: 'Precipitation',
						yAxis: 4,
						type: 'column',
						data: hourlyPrecipIntensity,
						visible: false,
						tooltip: {
							valueSuffix: ' mm/h'
						}
					},
					{
						name: 'UV-Index',
						yAxis: 5,
						type: 'column',
						data: hourlyUvIndex,
						visible: false,
						tooltip: {
							valueSuffix: ''
						}
					},
					{
						name: 'Ozone',
						yAxis: 6,
						type: 'spline',
						data: hourlyOzone,
						visible: false,
						tooltip: {
							valueSuffix: ''
						}
					}]
				});
			});
		}
	}
};

var app = new MetSpider();

$(document).ready(function() {
	//app.loadPlaces();
});