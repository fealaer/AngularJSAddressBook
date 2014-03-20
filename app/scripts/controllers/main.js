'use strict';

angular.module('mainApp')
    .controller('MainCtrl', ['$scope',
      function ($scope) {
        $scope.contacts = [
          {name: 'Eka',
            surname: 'Pusheva',
            phoneNumber: '+79260000001',
            group: 'family'
          },
          {
            name: 'Alexandr',
            phoneNumber: '+79255000000',
            group: 'family'
          },
          {
            name: 'Alexandr',
            phoneNumber: '+79250000000'
          },
          {
            name: 'Lena',
            surname: 'Pusheva',
            phoneNumber: '+79250000001'
          }
        ];
        $scope.makeTitle = function (contact) {
          var title = contact.name;
          if (contact.surname) {
            title += ' ' + contact.surname;
          }
          if (contact.group) {
            title += ' (' + contact.group + ')';
          }
          return title;
        };
      }]);
