'use strict';

var controllers = angular.module('nodeclear.controllers', []);

// LISTS =======================================================================
controllers.controller('MyListsCtrl', ['$scope', 'List', function ($scope, List) {
  $scope.lists = List.myLists();

  $scope.addList = function(name) {
    var newList = new List({name: name, items: []});
    newList.$save();
    // Update the lists.
    $scope.lists = List.myLists();
    // Reset the form.
    $scope.newListName = '';
  };
}]);

// ITEMS =======================================================================
controllers.controller('MyListItemsCtrl', ['$scope', 'List', '$routeParams', function ($scope, List, $routeParams) {
  $scope.list = List.get({id: $routeParams.id});
  if (!$scope.list.items) {
    $scope.list.items = [];
  }

  $scope.updateList = function() {
    List.save($scope.list);
  };

  $scope.addItem = function(label) {
    if (!$scope.list.items) {
      $scope.list.items = [];
    }
    $scope.list.items.push({'label': label});
    List.save($scope.list);
    $scope.newItemLabel = '';
  };

  $scope.removeItem = function(item) {
    var index = $scope.list.items.indexOf(item);
    $scope.list.items.splice(index,1);
    List.save($scope.list);
  };
}]);
