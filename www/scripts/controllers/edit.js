'use strict';

angular.module('gwTimeMachine')
  .controller('EditTaskCtrl', function ($scope, $location, toastService, shareService, Task) {
    $scope.task = shareService.getData();
    $scope.task.startTime = new Date($scope.task.startTime);
    $scope.task.endTime = new Date($scope.task.endTime);

    $scope.saveChanges = function(task){
      Task.update({task: $scope.task.id}, task,
        function(res){
          $location.path('/main');
        },
        function(err){
          $scope.editForm.startTime.$invalid = true;
          $scope.editForm.endTime.$invalid = true;
          toastService.error(err.data.errors);
        }
      );
    }
});
