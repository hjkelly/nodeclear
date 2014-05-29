'use strict';

var controllers = angular.module('nodeclear.controllers', []);

// LISTS =======================================================================
controllers.controller('MyListsCtrl', ['$scope', 'List', function ($scope, List) {
  $scope.lists = List.myLists();
  $scope.listBeingEdited = null;

  $scope.createList = function(name) {
    var newList = new List({name: name, items: []});
    newList.$save();
    // Update the lists.
    $scope.lists = List.myLists();
    // Reset the form.
    $scope.newListName = '';
  };

  $scope.giveListFocus = function(list) {
    $scope.listBeingEdited = list;
    // Use the element's ID to set its focus.
    var $jqFocusTarget = $('#list-'+list._id+' input');
    setTimeout(function(){
      $jqFocusTarget.focus();
    }, 0);
  };

  $scope.updateList = function(list) {
    List.save(list);
    $scope.listBeingEdited = null;
  };

  $scope.deleteList = function(list) {
    var index = $scope.lists.indexOf(list);
    var terminalList = $scope.lists.splice(index,1);
    List.deleteList({id: list._id});
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

  $scope.createItem = function(label) {
    if (!$scope.list.items) {
      $scope.list.items = [];
    }
    $scope.list.items.push({'label': label});
    List.save($scope.list);
    $scope.newItemLabel = '';
  };

  $scope.deleteItem = function(item) {
    var index = $scope.list.items.indexOf(item);
    $scope.list.items.splice(index,1);
    List.save($scope.list);
  };
}]);
