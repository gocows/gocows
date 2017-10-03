Providers = function() {
	
	var openWeatherMap = function() {
		return new ProviderConfig('openweathermap', OpenWeatherMapApiKey(), 'OpenWeatherMap');
	};
	
	var darkSky = function() {
		return new ProviderConfig('darksky', DarkSkyApiKey(), 'DarkSky');
	};
	
	var providers = [ openWeatherMap(), darkSky() ];
	
    return {
        openWeatherMap : function() {
            return openWeatherMap();
        },
        
        darkSky : function() {
            return darkSky();
        },
        
        getAll : function() {
        	return providers;
        }
    };
};

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