'use strict';

angular.module('myApp.map', ['ngRoute','ngMap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/map', {
    templateUrl: 'map/map.html',
    controller: 'mapViewCtrl as ctrl'
  });
}])

.controller('mapViewCtrl', ['NgMap', '$http', function(NgMap, $http) {
	var self = this;
	
	$http.get('/secrets.json').then(function successCallback(response){
		self.key = response.data.key;
	}, function errorCallback(response){
		console.log("Failed to fetch api key");
	});
	
	NgMap.getMap().then(function(map) {
		console.log(map.getCenter());
		console.log('markers', map.markers);
		console.log('shapes', map.shapes);
  	});
}]);
