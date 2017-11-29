Providers = function() {
	
	var darkSky = function() {
		return new ProviderConfig('darksky', DarkSkyApiKey(), 'DarkSky');
	};
	
	var providers = [ darkSky() ];
	
    return {
        darkSky : function() {
            return darkSky();
        },
        
        getAll : function() {
        	return providers;
        },
        
		find : function(key) {
			for (var index in providers) {
				if (providers[index].key == key) {
					return providers[index];
				}
			}
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