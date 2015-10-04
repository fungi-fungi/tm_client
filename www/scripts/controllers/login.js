'use strict';

angular.module('gwTimeMachine')
  .controller('LoginCtrl', function ($scope, $location, apiService, toastService, $localStorage, $timeout, $mdSidenav, $mdUtil, $log) {

    $scope.login = function(user) {

      apiService.login(user).then(
        function(res){
          console.log(res);
          if (res.data.data.authentication_token){
            $localStorage.user = res.data;
            $location.path('/main');
          }else{
            setFormInvalid();
          }
        },
        function(err){
          setFormInvalid();
        }
      );
    };

    function setFormInvalid(){
      $scope.loginForm.email.$invalid = true;
      $scope.loginForm.password.$invalid = true;
      toastService.error('Please check entered data');
    }

});
