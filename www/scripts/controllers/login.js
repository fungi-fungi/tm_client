'use strict';

angular.module('gwTimeMachine')
  .controller('LoginCtrl', function ($scope, $location, $localStorage, toastService, Session) {

    $scope.isLoading = false;

    $scope.login = function(user) {

      $scope.isLoading = true;

      Session.requestLogin({email: user.email, password: user.password}, {},
        function(res) {
          if (res.data.authentication_token){
            $localStorage.user = res.data;
            $location.path('/main');
          }else{
            setFormInvalid({"data": {"errors":"Something went wrong, try again later"}});
            $scope.isLoading = false;
          }
        },
        function(err){
          setFormInvalid(err);
          $scope.isLoading = false;
        }
      );
    };

    function setFormInvalid(err){
      $scope.loginForm.email.$invalid = true;
      $scope.loginForm.password.$invalid = true;
      toastService.error(err.data.errors);
    }

});
