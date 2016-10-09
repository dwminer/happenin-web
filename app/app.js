'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.map',
  'myApp.addevent',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/map'});
}])
.factory('EventService', function() {
	return {
	events: 
	[
		{
			name: 'Hack Umass',
			location: [42.391, -72.526],
			location_desc: 'Integrative Learning Center',
			time: new Date(1476071240000),
			duration: 2,
			category: 'Other'
		},
		{
			name: 'Chill @ Sam\'s',
			location: [42.387095, -72.530784],
			location_desc: 'Linden Hall',
			time: new Date(1476157640000),
			duration: 4,
			category: 'Other'
		},
		{
			name: 'KanJam on the green!',
			location: [42.389392, -72.525616],
			location_desc: 'Green by the lake',
			time: new Date(1476005676000),
			duration: 3,
			category: 'Sports'
		},
		{
			name: 'Study session for Algorithms. :(',
			location: [42.393957, -72.529548],
			location_desc: 'School of Engineering building',
			time: new Date(1483264040000),
			duration: 1,
			category: 'Study'
		},
		{
			name: 'Prepare for physics',
			location: [42.394599, -72.530642],
			location_desc: 'ME Building',
			time: new Date(),
			duration: 1,
			category: 'Study'
		}
	]};
});
