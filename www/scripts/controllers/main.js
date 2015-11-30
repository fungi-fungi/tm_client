'use strict';

angular.module('gwTimeMachine')
  .controller('MainCtrl', function ($scope, $location, toastService, $localStorage, Task, Job, User) {

    var self                = this;
    self.querySearch        = querySearch;
    $scope.isLoading        = true;

    $scope.jobTypes = [
      {value: "ShopTask", display: "Shop task"},
      {value: "SfaTask", display: "SFA task"}
    ];

    $scope.phases = [
      {phase_id: 1, name: "PreStage"},
      {phase_id: 2, name: "I&D"},
      {phase_id: 3, name: "Return inspection"}
    ];

    $scope.$watch('updated', function(){
      if ($scope.updated == false){
        updateCurrent();
      }
    });

    function updateCurrent() {
      User.current({id: $localStorage.user.id, action: 'current'},
        function(res){
          if (!res.errors){
            $scope.current = angular.fromJson(res).task;
          }else{
            $scope.current = null;
          }
          $scope.updated = true;
          $scope.isLoading = false;
        },
        function(err){
          $scope.updated = true;
          $scope.isLoading = false;
          toastService.error(err);
        }
      );
    }

    $scope.isShowNewTaskForm = function(){
      if (self.search && self.search.selectedItem && !$scope.current){
        return true;
      }else{
        return false;
      }
    };

    function querySearch (query) {
      var results = query ? prepareResults(query) : prepareResults(), deferred;
        return results;
    }

    function prepareResults(sfid){
      return Job.query({sfid: sfid}).$promise.then(function(res){
        return res.map(function(item){
          return {value: item.id, display: item.sfid + ", " + item.client + ", " + item.show}
        });
      })
    }

    $scope.startNewTask = function(newTask){

      if (newTask){
        newTask.sfid = self.search.selectedItem.value;
      }

      Task.save({}, {data: {
          job_id:     newTask.sfid,
          phase_id:   newTask.phase.phase_id,
          date:       new Date().toISOString().slice(0, 10),
          startTime:  new Date().toISOString(),
          type:       newTask.jobType.value,
          note:       newTask.note == undefined || newTask.note  == null ? '' : newTask.note
        }},
        function(res){
          $scope.current = res.task;
        },
        function(err){
          toastService.error(err);
        }
      );
    };

    $scope.stopOnGoingTask = function(){
      Task.stop({task: $scope.current.id},
        function(res){
          self.search = null;
          $scope.current = null;
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
    };

    updateCurrent();
});
