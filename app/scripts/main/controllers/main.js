'use strict';

angular.module('mainApp')
    .controller('MainCtrl', ['$scope', '$routeParams',
      function ($scope, $routeParams) {
        $scope.lang = $routeParams.lang || 'en';
        $scope.sort = '';
        $scope.reverse = false;

        $scope.sortByVariants = [
          {title:'Name', sort:'name', id: 'sortByName'},
          {title:'Surname', sort:'surname', id: 'sortBySurname'},
          {title:'Phone Number', sort:'phoneNumber', id: 'sortByPhoneNumber'},
          {title:'Group', sort:'group', id: 'sortByGroup'}
        ];

        $scope.langVariants = [
          {title:'English', id: 'en'},
          {title:'Русский', id: 'ru'}
        ];

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

        $scope.sortBy = function(sortByVariant) {
          select($scope.sortByVariants, sortByVariant);
          if ($scope.sort === sortByVariant.sort) {
            $scope.reverse = !$scope.reverse;
          } else {
            $scope.reverse = false;
          }
          $scope.sort = sortByVariant.sort;
        };

        function select (menuItems, menuItem) {
          angular.forEach(menuItems, function (menuItem) {
            menuItem.selected = false;
          });
          menuItem.selected = true;
        }
      }]);
