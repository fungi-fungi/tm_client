'use strict';

angular.module('gwTimeMachine')
  .controller('HistoryCtrl', function ($scope, $location, $timeout, apiService, shareService, $localStorage) {

    $scope.updateHistory = function() {

      apiService.getHistory().then(
        function(res){
          $scope.history = angular.fromJson(res.data).tasks;
        },
        function(err){
          console.log(err);
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
