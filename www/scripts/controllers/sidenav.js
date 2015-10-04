'use strict';

angular.module('gwTimeMachine')
  .controller('SidenavCtrl', function ($scope, $localStorage) {

    $scope.user = $localStorage.user ? $localStorage.user.data.email : "No account yet";

});
