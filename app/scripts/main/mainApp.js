'use strict';

angular.module('mainApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'sharedApp',
  'ui.bootstrap',
  'ui.mask'
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
