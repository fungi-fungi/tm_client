'use strict';

angular.module('gwTimeMachine')
  .controller('LoginCtrl', function ($scope, $location, apiService, $localStorage, $timeout, $mdSidenav, $mdUtil, $log) {

    $scope.toggleRight = buildToggler('left');

    function buildToggler(navID) {
      var debounceFn =  $mdUtil.debounce(function(){
            $mdSidenav(navID)
              .toggle()
              .then(function () {
                $log.debug("toggle " + navID + " is done");
              });
          },200);
      return debounceFn;
    }

    $scope.close = function () {
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };

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
