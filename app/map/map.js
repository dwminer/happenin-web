'use strict';

angular.module('myApp.map', ['ngRoute','ngMap', 'ngMaterial'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/map', {
    templateUrl: 'map/map.html',
    controller: 'mapViewCtrl as ctrl'
  });
}])

.controller('mapViewCtrl', ['NgMap', 'NavigatorGeolocation', '$http', function(NgMap, NavigatorGeolocation, $http) {
	var self = this;

	self.events = [
		{
			name: 'Hack UMass',
			location: [42.391, -72.526],
			location_desc: 'Integrative Learning Center',
			time: new Date(),
			category: 'Other'
		},
		{
			name: 'Chill @ Sam\'s',
			location: [42.387095, -72.530784],
			location_desc: 'Linden Hall',
			time: new Date(),
			category: 'Other'
		},
		{
			name: 'KanJam on the green!',
			location: [42.389392, -72.525616],
			location_desc: 'Green by the lake',
			time: new Date(),
			category: 'Sports'
		},
		{
			name: 'Study session for Algorithms. :(',
			location: [42.393957, -72.529548],
			location_desc: 'School of Engineering building',
			time: new Date(),
			category: 'Study'
		},
		{
			name: 'Prepare for physics',
			location: [42.394599, -72.530642],
			location_desc: 'ME Building',
			time: new Date(),
			category: 'Study'
		}
	];

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
