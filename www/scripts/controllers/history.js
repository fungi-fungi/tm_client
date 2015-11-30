'use strict';

angular.module('gwTimeMachine')
  .controller('HistoryCtrl', function ($scope, $location, shareService, toastService, $localStorage, User) {

    $scope.isLoading = true;

    $scope.$watch('updated', function(){
      if ($scope.updated == false){
        updateHistory();
      }
    });

    function updateHistory(){
      User.history({id: $localStorage.user.id, action: 'history'},
        function(res){
          if (!res.errors){
            $scope.history = angular.fromJson(res);
          }else{
            $scope.history = null;
          }
          $scope.updated = true;
          $scope.isLoading = false;
        },
        function(err){
          $scope.updated = true;
          $scope.isLoading = false;
          toastService.error(err.data.errors);
        }
      );
    };

    $scope.calcDiff = function(task){
      var res = "~";
      var diffInMinutes = (new Date(task.endTime) - new Date(task.startTime)) / (60 * 1000);
      var fullHours = Math.floor(diffInMinutes / 60);
      var minutes = diffInMinutes - (fullHours * 60);

      if (Math.round(minutes / 15) === 4){
        res += (fullHours + 1) + "h ";
      }else{
        res = fullHours > 0 ? fullHours + "h " : "" + (Math.round(minutes / 15) + 1) * 15 + "m";
      }

      return res;
    }

    $scope.edit = function(task){
      $location.path('/edit/' + task.id);
      shareService.setData(task);
    };

});
