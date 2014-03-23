'use strict';

angular.module('sharedApp')
    .filter('phone', function () {
      return function (phone) {
        return phone.replace(/(\d)(\d{3})(\d{3})(\d{4})/, '+$1 ($2) $3-$4');
      };
    });