'use strict';

angular.module('gwTimeMachine')
  .service('apiService', function($http, $q, $rootScope, $localStorage){

    var service = this;

    service.login = function(user){
      var defer = $q.defer();

      $http.post($rootScope.endPoint + "sessions?email=" + user.email + "&password=" + user.password).then(function(res) {
        defer.resolve(res);
      }, function(err) {
        defer.reject(err);
      });

      return defer.promise;
    }

    service.sfidAutocompleteRequest = function(sfid){
      var defer = $q.defer();

      $http.get($rootScope.endPoint + "jobs?sfid=" + sfid, { headers: getCredentialsHeaders()}).then(function(res){
          defer.resolve(res);
        },function(err){
          defer.reject(err);
        });

      return defer.promise;
    }

    service.getHistory = function(){
      var defer = $q.defer();

      $http.get($rootScope.endPoint + "tasks/history", { headers: getCredentialsHeaders()}).then(function(res){
          defer.resolve(res);
        },function(err){
          defer.reject(err);
        });

      return defer.promise;
    }

    service.startNewTask = function(data){
      var defer = $q.defer();

      $http({
        method: 'POST',
        url: $rootScope.endPoint + "tasks",
        headers: getCredentialsHeaders(),
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: preparePostData(data)
      }).then(function(res){
        defer.resolve(res);
      },function(err){
        defer.reject(err);
      });

      return defer.promise;
    }

    service.sendGetRequest = function(data){
      var defer = $q.defer();

      $http.get($rootScope.endPoint + "/" + data, { headers: getCredentialsHeaders()}).then(
        function(res){
          defer.resolve(res);
        },function(err){
          defer.reject(err);
        });

      return defer.promise;
    };

    service.stopTask = function(){
      var defer = $q.defer();

      $http({
        method: 'PUT',
        url: $rootScope.endPoint + "tasks/" + $localStorage.current.data.task.id + "/stop",
        headers: getCredentialsHeaders(),
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: prepareStopTaskData()
      }).then(function(res){
        defer.resolve(res);
      },function(err){
        defer.reject(err);
      });

      return defer.promise;
    };

    service.editTaskTimes = function(task){
      var defer = $q.defer();

      $http({
        method: 'PUT',
        url: $rootScope.endPoint + "tasks/" + task.id,
        headers: getCredentialsHeaders(),
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: task
      }).then(function(res){
        defer.resolve(res);
      },function(err){
        defer.reject(err);
      });

      return defer.promise;
    }

    function preparePostData(data){
      return {
        job_id:     data.sfid,
        phase_id:   data.phase.phase_id,
        date:       new Date().toISOString().slice(0, 10),
        startTime:  new Date().toISOString(),
        type:       data.jobType.value,
        note:       data.note
      };
    }

    function prepareStopTaskData(){
      var date = new Date();
      return {
        endTime: date.toISOString()
      };
    }

    function getCredentialsHeaders(){
      return {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-User-Email": $localStorage.user.data.email,
        "X-User-Token": $localStorage.user.data.authentication_token
      };
    }

    return service;
  });
