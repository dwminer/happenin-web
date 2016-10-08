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
			name: 'Hack Umass',
			location: [42.391, -72.526]
		},
		{
			name: 'Chill @ Sam\'s',
			location: [42.388570, -72.529235]
		}
	];
	
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

}]);
