'use strict';

angular.module('myApp.map', ['ngRoute','ngMap', 'ngMaterial', 'myApp'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/map', {
    templateUrl: 'map/map.html',
    controller: 'mapViewCtrl as ctrl'
  });
}])

.controller('mapViewCtrl', ['NgMap', 'NavigatorGeolocation', '$http', 'EventService', function(NgMap, NavigatorGeolocation, $http, EventService) {
	var self = this;

	self.events = EventService.events;

	self.categories = ['Sports', 'Music', 'Video games', 'Board games', 'Outing', 'Social', 'Study', 'Volunteer', 'Other'];
	self.sel_categories = {};
	for (var cat in self.categories){
		self.sel_categories[self.categories[cat]] = true;
	}

	self.distance = function(p1, p2) {
		return math.sqrt(p1*p1 + p2*p2);
	}

	self.comparator = function(actual, expected) {
		console.log(self.sel_categories[actual.category]);
	}

	self.change = function() {
		console.log(self.sel_categories);
	}
	
	$http.get('/secrets.json').then(function successCallback(response){
		self.key = response.data.key;
	}, function errorCallback(response){
		console.log("Failed to fetch api key");
	});
	
	NgMap.getMap().then(function(map) {
		self.map = map;

		NavigatorGeolocation.getCurrentPosition().then(function(position) {
			self.location = {lat: position.coords.latitude, lng: position.coords.longitude};
			self.map.setCenter(self.location);
		});
  	});

}])
.filter('timefilter', function() {
	return function(dateobj) {
		var now = new Date();
		if (dateobj.getTime() <= now.getTime())
		{
			return "now!";
		}
		else if (dateobj.getTime() - now.getTime() <= 60 * 60 * 1000)
		{
			return "in " + (dateobj.getTime() - now.getTime())/(60*1000) + " minutes!";
		}
		else if (dateobj.getDay() == now.getDay() && dateobj.getMonth() == now.getMonth())
		{
			return "in " + (dateobj.getTime() - now.getTime())/(60*60*1000) + " hours.";
		}
		else
		{
			return dateobj.getHours() + ":" + dateobj.getMinutes() + " on " + dateobj.getMonth() + "/" + dateobj.getDay() + ".";
		}
	}
})
.filter('eventFilter', function() {
	return function(input, expected, sel_categories) {
		var res = [];

		if (!expected)
			expected = {$:""}
		
		angular.forEach(input, function(event) {
			if ((event.name.toLowerCase().match(expected.$.toLowerCase()) || event.location_desc.toLowerCase().match(expected.$.toLowerCase())) &&
				sel_categories[event.category])
			{
				res.push(event);
			}
		})

		return res;
	}
});
