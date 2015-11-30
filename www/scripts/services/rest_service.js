'use strict';

var restService = angular.module('gwTimeMachine');

restService.factory('Task', function ($resource, $rootScope) {
  var data = $resource($rootScope.endPoint + 'tasks/:task', {task: "@task"}, {
    get: {
      method: 'GET'
    },
    stop: {
      url: $rootScope.endPoint + 'tasks/:task/stop',
      method: 'PUT',
      postData: { endTime: new Date().toISOString().slice(0, 10) }
    },
    update: {
      method: 'PUT'
    },
    save: {
      method: 'POST'
    }
  });
  return data;
});


restService.factory('Job', function ($resource, $rootScope) {
  var data = $resource($rootScope.endPoint + 'jobs/', {}, {
    query: {
      method: 'GET',
      isArray:true
    }
  });
  return data;
});

restService.factory('User', function ($resource, $rootScope) {
  var data = $resource($rootScope.endPoint + 'users/:id/:action', {id: "@id"}, {
    current: {
      method: 'GET'
    },
    history: {
      method: 'GET',
      isArray:true
    }
  });
  return data;
});

restService.factory('Session', function ($resource, $rootScope) {
  var data = $resource($rootScope.endPoint + 'sessions/', {}, {
    requestLogin: {
      method: 'POST',
    }
  });
  return data;
});
