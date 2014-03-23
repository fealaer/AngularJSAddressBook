'use strict';

angular.module('mainApp')
    .controller('ModalCtrl', function ($scope, $modalInstance, Contacts, action, contact, lang) {
      var defaultError = {error: false};
      $scope.error = defaultError;
      $scope.data = contact || {};
      $scope.lang = lang;
      $scope.action = action;
      $scope.save = function (data) {
        if ($scope.action === 'add') {
          Contacts.save(data).then(onSuccess);
        } else if ($scope.action === 'edit') {
          Contacts.update(data).then(onSuccess);
        }
      };

      function onSuccess(res) {
        if (res.err) {
          $scope.error = {error: true, message: res.err.message};
        } else {
          $modalInstance.close(res);
        }
      }

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
      $scope.$watch('data', function () {
        $scope.error = defaultError;
      }, true);
    });
