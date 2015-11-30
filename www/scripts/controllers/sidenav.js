'use strict';

angular.module('gwTimeMachine')
  .controller('SidenavCtrl', function ($scope, $localStorage) {

    $scope.getUserName = function(){
      var res = "No account yet";

      if ($localStorage.user){
        res = $localStorage.user.email;
      }

      return res;
    }

});
