'use strict';

angular
  .module('gwTimeMachine', [
    'ngAria',
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngMaterial',
    'ngMdIcons',
    'ngStorage',
    'angularMoment'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        resolve:{
        "check": function($location, $localStorage){
            if($localStorage.user){
              $location.path('/main');
            }
          }
        }
      })
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      });
  })
  .directive('resize', function ($window) {
    return function (scope, element) {
        var w = angular.element($window);
        var changeHeight = function() {
          element.css('height', (w.height() -20) + 'px' );
        };
        w.bind('resize', function () { changeHeight(); });
        changeHeight();
    }
  })
  .config(function ($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  })
  .run(function($rootScope){
    $rootScope.endPoint = 'http://localhost:3000/api/v1/';
  });;
