'use strict';

angular.module('gwTimeMachine')
  .controller('MainCtrl', function ($scope, $location, $q, apiService, toastService, $localStorage, $timeout) {

    var self                = this;
    self.querySearch        = querySearch;

    $scope.$storage = $localStorage;
    $scope.errorMessage = "sdfs";

    $scope.showError = false;

    $scope.jobTypes = [
      {value: "ShopTask", display: "Shop task"},
      {value: "SfaTask", display: "SFA task"}
    ];

    $scope.phases = [
      {phase_id: 1, name: "PreStage"},
      {phase_id: 2, name: "I&D"},
      {phase_id: 3, name: "Return inspection"}
    ];

    $scope.isShowNewTaskForm = function(){
      if (self.selectedItem && !$scope.$storage.current){
        return true;
      }else{
        return false;
      }
    }

    function querySearch (query) {
      var results = query ? prepareResults(query) : prepareResults(), deferred;
        return results;
    };

    function prepareResults(sfid){
      return apiService.sfidAutocompleteRequest(sfid).then(function(res){
        return res.data.jobs.map(function(item){
          return {value: item.id, display: item.sfid + ", " + item.client + ", " + item.show}
        });
      })
    };

    $scope.startNewTask = function(newTask){

      if (newTask){
        newTask.sfid = self.selectedItem.value;
      }

      apiService.startNewTask(newTask).then(
        function(res){
          $scope.$storage.current = res;
        },
        function(err){
          toastService.error(err);
        }
      );
    }

    $scope.stopOnGoingTask = function(){
      apiService.stopTask().then(
        function(res){
          delete $scope.$storage.current;
        },
        function(err){
          toastService.error(err);

          if (err.status == 405){
            delete $scope.$storage.current;
          }else if (err.status == 409){
            delete $scope.$storage.current;
          }else if (err.status == 422){
            delete $scope.$storage.current;
          }
        }
      );
    }

});
