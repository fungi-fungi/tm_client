'use strict';

angular.module('gwTimeMachine')
  .controller('ToolbarCtrl', function ($scope, $location, apiService, $localStorage, $timeout, $mdSidenav, $mdUtil, $log) {

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
      $mdSidenav('right').close();
    }
});
