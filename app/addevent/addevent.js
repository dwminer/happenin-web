'use strict';

angular.module('myApp.addevent', ['ngRoute', 'ngMap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addevent', {
    templateUrl: 'addevent/addevent.html',
    controller: 'addEventCtrl as vm'
  });
}])

.controller('addEventCtrl', ['NgMap', 'NavigatorGeolocation', '$http', function(NgMap, NavigatorGeolocation, $http) {
	var vm = this;
	vm.types = "['establishment']";
	vm.placeChanged = function() {
    vm.place = this.getPlace();
    console.log('location', vm.place.geometry.location);

  }
  
	NgMap.getMap().then(function(map) {
		vm.map = map;

		NavigatorGeolocation.getCurrentPosition().then(function(position) {
			vm.location = {lat: position.coords.latitude, lng: position.coords.longitude};
			vm.map.setCenter(vm.location);
		});
  	});
	
  NgMap.getMap().then(function(map) {
    vm.map = map;
  });
}]);