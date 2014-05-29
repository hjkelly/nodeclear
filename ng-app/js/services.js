'use strict';

var services = angular.module('nodeclear.services', ['ngResource']);

services.factory('List', ['$resource',
  function($resource){
    return $resource('/api/lists/:id',
      {id: '@_id'},
      {
        myLists: {method:'GET', isArray:true},
        deleteList: {method:'DELETE'}
      });
  }]);
