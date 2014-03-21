'use strict';

angular.module('mainApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'sharedApp'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/:lang', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/en'
      });
  });
