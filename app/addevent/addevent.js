'use strict';

angular.module('myApp.addevent', ['ngRoute', 'ngMap', 'myApp'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addevent', {
    templateUrl: 'addevent/addevent.html',
    controller: 'addEventCtrl as vm'
  });
}])

.controller('addEventCtrl', ['NgMap', 'NavigatorGeolocation', '$http', 'EventService', '$location', function(NgMap, NavigatorGeolocation, $http, EventService, $location) {
	var vm = this;

	vm.events = EventService.events;

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

	vm.submit = function() {
		var event = {
			name: vm.name,
			category: vm.category,
			location: [vm.place.geometry.location.lat(), vm.place.geometry.location.lng()],
			location_desc: vm.place.formatted_address,
			description: vm.description,
			time: new Date(2016, vm.month + 1, vm.day, vm.hour, vm.minute)
		};

		vm.events.push(event);		
		console.log(event);
		$location.path('/map');
	}
}]);
