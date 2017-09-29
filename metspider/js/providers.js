class Providers {
	OpenWeatherMap() {
		return new ProviderConfig('openweathermap', OpenWeatherMapApiKey(), 'OpenWeatherMap');
	}
}
class ProviderConfig {
	constructor(key, apiKey, name) {
		this.key = key;
		this.apiKey = apiKey;
		this.name = name;
	}
	getApiKey() {
		return this.apiKey;
	}
}