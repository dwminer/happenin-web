'use strict';

angular.module('myApp.addevent', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addevent', {
    templateUrl: 'addevent/addevent.html',
    controller: 'addEventCtrl as ctrl'
  });
}])

.controller('addEventCtrl', [function() {

}]);
