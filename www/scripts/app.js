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
    'angularMoment',
    'scDateTime'
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
      })
      .when('/edit/:ID', {
        templateUrl: 'views/edit.html',
        controller: 'EditTaskCtrl'
      });
  })
  .config(function($httpProvider) {
    $httpProvider.interceptors.push(function($q, $location, $localStorage) {
      return {
        'responseError': function(rejection){
          var defer = $q.defer();
          if(rejection.status == 401){
            delete $localStorage.user;
            $location.path('/');
          }

          defer.reject(rejection);
          return defer.promise;
        }
      };
    })
  })
  .value('scDateTimeConfig', {
    defaultTheme: 'material',
    autosave: false,
    defaultMode: 'time',
    compact: true
  })
  .config(function ($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  })
  .run(function($rootScope){
    $rootScope.endPoint = 'https://gwinstalls.com/api/v1/';
  });;
