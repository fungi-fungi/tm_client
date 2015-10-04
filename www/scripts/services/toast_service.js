'use strict';

angular.module('gwTimeMachine')
  .service('toastService', ['$mdToast', function ($mdToast){

     var toastPosition = 'bottom right';

     return{
       info: function(message){
         $mdToast.show(
           $mdToast.simple()
            .content(message)
            .position(toastPosition)
            .hideDelay(3000)
          );
       },error: function(message){
         $mdToast.show(
           $mdToast.simple()
             .content(message)
             .position(toastPosition)
             .hideDelay(3000)
         );
       }

     };
   }
  ]);
