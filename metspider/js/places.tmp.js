Places = function() {
	var places = {
		lviv : {
			lat : 49.80985,
			lon : 23.98557,
			name : 'Lviv'
		}
	};
	
	return {
		get : function() {
			return places;
		},
		
		find : function(key) {
			for (var placeKey in places) {
				if (placeKey == key) {
					return places[placeKey];
				}
			}
		}
	}
};