'use strict';

// Declare app level module which depends on filters, and services

var nodeclear = angular.module('nodeclear', [
    'nodeclear.controllers',
    'nodeclear.services',
    'ngRoute'
]);

nodeclear.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/lists', {
      templateUrl: '/partials/my-lists.html',
      controller: 'MyListsCtrl'
    }).
    when('/lists/:id', {
      templateUrl: '/partials/list-items.html',
      controller: 'MyListItemsCtrl'
    }).
    otherwise({
      redirectTo: '/lists'
    });

  $locationProvider.html5Mode(true);
}]);
