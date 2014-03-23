'use strict';

angular.module('mainApp')
    .controller('MainCtrl', ['$scope', '$routeParams', '$modal', 'Contacts',
      function ($scope, $routeParams, $modal, Contacts) {
        $scope.lang = $routeParams.lang || 'en';
        $scope.sort = '';
        $scope.reverse = false;

        $scope.sortByVariants = [
          {title: 'Name', sort: 'name', id: 'sortByName'},
          {title: 'Surname', sort: 'surname', id: 'sortBySurname'},
          {title: 'Phone Number', sort: 'phoneNumber', id: 'sortByPhoneNumber'},
          {title: 'Group', sort: 'group', id: 'sortByGroup'}
        ];

        $scope.langVariants = [
          {title: 'English', id: 'en'},
          {title: 'Русский', id: 'ru'}
        ];

        $scope.contacts = [];

        Contacts.query().then(function (contacts) {
          return $scope.contacts = contacts;
        });

        $scope.add = function () {
          $modal
              .open({
                templateUrl: 'views/modal.html',
                controller: 'ModalCtrl',
                resolve: {
                  action: function () {
                    return 'add';
                  },
                  contact: function () {
                    return null;
                  },
                  lang: function () {
                    return $scope.lang;
                  }
                }
              }).result.then(function (res) {
                $scope.contacts.push(res);
              });
        };

        $scope.edit = function (contact) {
          $modal
              .open({
                templateUrl: 'views/modal.html',
                controller: 'ModalCtrl',
                resolve: {
                  action: function () {
                    return 'edit';
                  },
                  contact: function () {
                    return angular.copy(contact);
                  },
                  lang: function () {
                    return $scope.lang;
                  }
                }
              }).result.then(function (res) {
                var index = findById($scope.contacts, contact.id);
                $scope.contacts[index] = res;
              });
        };

        $scope.delete = function (contact) {
          Contacts.delete(contact.id).then(function (res) {
            if (res) {
              var index = findById($scope.contacts, contact.id);
              if (index !== -1) {
                $scope.contacts.splice(index, 1);
              }
            }
          })
        };

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

        $scope.sortBy = function (sortByVariant) {
          select($scope.sortByVariants, sortByVariant);
          if ($scope.sort === sortByVariant.sort) {
            $scope.reverse = !$scope.reverse;
          } else {
            $scope.reverse = false;
          }
          $scope.sort = sortByVariant.sort;
        };

        function select(menuItems, menuItem) {
          angular.forEach(menuItems, function (menuItem) {
            menuItem.selected = false;
          });
          menuItem.selected = true;
        }

        function findById(array, id) {
          for (var i = 0; i < array.length; i++) {
            if (array[i].id === id) {
              return i;
            }
          }
          return -1;
        }
      }]);
