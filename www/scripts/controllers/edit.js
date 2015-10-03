'use strict';

angular.module('gwTimeMachine')
  .controller('EditTaskCtrl', function ($scope, $routeParams, $location, shareService, apiService) {
    $scope.task = shareService.getData();
    $scope.task.startTime = new Date($scope.task.startTime);
    $scope.task.endTime = new Date($scope.task.endTime);

    $scope.timePickerOptions = {
      disableTimeRanges: [['12:00am', $scope.task.startTime]]
    }

    $scope.saveChanges = function(task){
      apiService.editTaskTimes(task).then(
        function(res){
          $location.path('/main');
        },
        function(err){
          $scope.loginForm.$invalid = true;
        }
      );
    }
});
