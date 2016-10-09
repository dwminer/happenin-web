'use strict';

angular.module('myApp.addevent', ['ngRoute', 'ngMap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addevent', {
    templateUrl: 'addevent/addevent.html',
    controller: 'addEventCtrl as vm'
  });
}])

.controller('addEventCtrl', ['NgMap', function(NgMap) {
	var vm = this;
  vm.types = "['establishment']";
  vm.placeChanged = function() {
    vm.place = this.getPlace();
    console.log('location', vm.place.geometry.location);
    vm.map.setCenter(vm.place.geometry.location);
  }
  NgMap.getMap().then(function(map) {
    vm.map = map;
  });
}]);