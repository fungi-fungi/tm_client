'use strict';

angular.module('gwTimeMachine')
  .service('shareService', function(){

    var service = this;

    service.data = "";

    service.setData = function(data) {
      service.data = data;
    };


    this.getData = function() {
      return service.data;
    };

    return service;
  });
