class Providers {
	OpenWeatherMap() {
		return new ProviderConfig('openweathermap', OpenWeatherMapApiKey(), 'OpenWeatherMap');
	}
}
class ProviderConfig {
	constructor(key, apiKey, providerName) {
		this.key = key;
		this.apiKey = apiKey;
		this.providerName = name;
	}
	getApiKey() {
		return this.apiKey;
	}
}