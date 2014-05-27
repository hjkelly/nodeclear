'use strict';

var controllers = angular.module('nodeclear.controllers', []);

controllers.controller('MyListsCtrl', ['$scope', 'Lists', function ($scope, Lists) {
  $scope.lists = Lists.myLists();
}]);

controllers.controller('MyListItemsCtrl', ['$scope', 'Lists', '$routeParams', function ($scope, Lists, $routeParams) {
  $scope.list = Lists.get({id: $routeParams.id});

  $scope.updateList = function() {
    Lists.save($scope.list);
  };

  $scope.addItem = function(label) {
    $scope.list.items.push({'label': label});
    Lists.save($scope.list);
    $scope.newItemLabel = '';
  };

  $scope.removeItem = function(item) {
    var index = $scope.list.items.indexOf(item);
    $scope.list.items.splice(index,1);
    Lists.save($scope.list);
  };
}]);
