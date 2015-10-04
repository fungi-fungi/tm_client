'use strict';

angular.module('gwTimeMachine')
  .controller('ToolbarCtrl', function ($scope, $mdSidenav, $mdUtil, $localStorage, $location) {

    $scope.toggleRight = buildToggler('left');

    function buildToggler(navID) {
      var debounceFn =  $mdUtil.debounce(function(){
            $mdSidenav(navID).toggle()
          },200);
      return debounceFn;
    }

    $scope.close = function () {
      $mdSidenav('right').close();
    }

    $scope.openMenu = function($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    }

    $scope.logout = function(){
      delete $localStorage.current;
      delete $localStorage.user;
      $location.path('/');
    }
});
