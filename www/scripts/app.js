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
    'datetime'
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
    $httpProvider.interceptors.push(function($localStorage) {
      return {
        request: function (config) {

          if ($localStorage.user){
            config.headers['X-User-Email'] = $localStorage.user.email;
            config.headers['X-User-Token'] = $localStorage.user.authentication_token;
          }
          return config;
        }
      };
    })
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
  .config(function($httpProvider) {
    $httpProvider.interceptors.push(function($localStorage) {
      return {
        request: function(config) {

          var networkState = navigator.connection.type;

          if(networkState === 'none' && !($localStorage.noInternetConnection)){
            $localStorage.noInternetConnection = true;
            document.addEventListener(
              "deviceready",
              function(){
                navigator.notification.confirm(
                  'This app requires internet connection, you need to connect to internet !',
                  (function(){navigator.app.exitApp()}),
                  'No internet connection detected',
                  ['OK']
                );
                delete $localStorage.noInternetConnection;
              },
              false
            );
          }
          return config;
        }
      };
    })
  })
  .config(function ($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  })
  .run(function($rootScope){
    $rootScope.endPoint = 'https://gwinstalls.com/api/v1/';
  });
