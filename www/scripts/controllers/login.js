'use strict';

angular.module('gwTimeMachine')
  .controller('LoginCtrl', function ($scope, $location, apiService, $localStorage, $timeout, $mdSidenav, $mdUtil, $log) {

    $scope.login = function(user) {

      apiService.login(user).then(
        function(res){
          console.log(res);
          if (res.data.data.authentication_token && res.data.data.authentication_token){
            $localStorage.user = res.data;
            $location.path('/main');
          }else{
            $scope.loginForm.$invalid = true;
          }
        },
        function(err){
          $scope.loginForm.$invalid = true;
        }
      );
    };

});
