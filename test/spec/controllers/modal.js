'use strict';

describe('Controller: modalCtrl', function () {

  beforeEach(module('mainApp'));
  beforeEach(module('ui.bootstrap.modal'));

  var scope,
      ModalCtrl,
      q,
      saveDeferred,
      updateDeferred,
      MockContacts,
      MockModal,
      action = 'add',
      newContact = null,
      contact,
      lang = 'en';
  beforeEach(function () {
    contact = {
      id: 4,
      name: 'E',
      surname: 'P',
      phoneNumber: '79260000002',
      group: 'f'
    };
    MockModal = {
      close: function (param) {
        return param;
      },
      dismiss: function (param) {
        return param;
      }
    };
    MockContacts = {
      save: function () {
        saveDeferred = q.defer();
        return saveDeferred.promise;
      },
      update: function () {
        updateDeferred = q.defer();
        return updateDeferred.promise;
      }
    };
  });

  beforeEach(inject(function ($controller, $rootScope, $q) {
    scope = $rootScope.$new();
    q = $q;
    ModalCtrl = $controller('ModalCtrl', {
      $scope: scope,
      $modalInstance: MockModal,
      Contacts: MockContacts,
      action: action,
      contact: newContact,
      lang: lang
    });
  }));

  it('should set up scope variables with arguments values', function () {
    expect(scope.lang).toBe(lang);
    expect(scope.data).toEqual(newContact || {});
  });

  it('should dismiss Modal when cancel method called', function () {
    spyOn(MockModal, 'dismiss');
    scope.cancel();
    expect(MockModal.dismiss).toHaveBeenCalledWith('cancel');
  });

  it('should close modal with created contact when save successful', function () {
    spyOn(MockModal, 'close');
    scope.save(contact);
    saveDeferred.resolve(contact);
    scope.$root.$digest();
    expect(MockModal.close).toHaveBeenCalledWith(contact);
  });

  it('should close modal with edited contact when edit successful', function () {
    spyOn(MockModal, 'close');
    scope.action = 'edit';
    scope.data = contact;
    var edited = angular.copy(contact);
    edited.name = 'NewOne';
    scope.save(edited);
    updateDeferred.resolve(edited);
    scope.$root.$digest();
    expect(MockModal.close).toHaveBeenCalledWith(edited);
  });
});