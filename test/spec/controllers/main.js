'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('mainApp'));

  var MainCtrl,
      scope,
      q,
      queryDeferred,
      deleteDeferred,
      modalDeferred,
      contacts,
      MockContacts,
      MockModal;

  beforeEach(function () {
    contacts = [
      {
        id: 1,
        name: 'Eka',
        surname: 'Pusheva',
        phoneNumber: '79260000001',
        group: 'family'
      },
      {
        id: 2,
        name: 'Alexandr',
        phoneNumber: '79255000000',
        group: 'family'
      },
      {
        id: 3,
        name: 'Alexandr',
        phoneNumber: '79250000000'
      },
      {
        id: 4,
        name: 'Lena',
        surname: 'Pusheva',
        phoneNumber: '79250000001'
      }
    ];
    MockModal = {
      open: function () {
        modalDeferred = q.defer();
        return {result: modalDeferred.promise};
      }
    };
    MockContacts = {
      query: function () {
        queryDeferred = q.defer();
        return queryDeferred.promise;
      },
      delete: function () {
        deleteDeferred = q.defer();
        return deleteDeferred.promise;
      }
    };
  });

  beforeEach(inject(function ($controller, $rootScope, $routeParams, $q) {
    scope = $rootScope.$new();
    q = $q;
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      $routeParams: $routeParams,
      $modal: MockModal,
      Contacts: MockContacts
    });
  }));

  it('should attach a list of contacts to the scope', function () {
    queryDeferred.resolve(contacts);
    scope.$root.$digest();
    expect(scope.contacts.length).toBe(4);
  });

  it('should has list of sort by variants', function () {
    expect(scope.sortByVariants.length).toBe(4);
  });

  it('should has list of languages to translate interface', function () {
    expect(scope.langVariants.length).toBe(2);
  });

  it('should has correctly working method makeTitle', function () {
    queryDeferred.resolve(contacts);
    scope.$root.$digest();
    expect(scope.makeTitle(scope.contacts[0])).toBe('Eka Pusheva (family)');
    expect(scope.makeTitle(scope.contacts[1])).toBe('Alexandr (family)');
    expect(scope.makeTitle(scope.contacts[2])).toBe('Alexandr');
    expect(scope.makeTitle(scope.contacts[3])).toBe('Lena Pusheva');
  });

  it('should has properly working method sortBy', function () {
    angular.forEach(scope.sortByVariants, function (sortVariant) {
      scope.sortBy(sortVariant);
      expect(scope.sort).toBe(sortVariant.sort);
      expect(scope.reverse).toBe(false);
      expect(sortVariant.selected).toBe(true);
      scope.sortBy(sortVariant);
      expect(scope.sort).toBe(sortVariant.sort);
      expect(scope.reverse).toBe(true);
      expect(sortVariant.selected).toBe(true);
    });
  });

  it('should has properly working method delete', function () {
    queryDeferred.resolve(contacts);
    scope.$root.$digest();
    expect(scope.contacts.length).toBe(4);

    scope.delete(scope.contacts[2]);
    deleteDeferred.resolve(false);
    scope.$root.$digest();
    expect(scope.contacts.length).toBe(4);

    scope.delete(scope.contacts[3]);
    deleteDeferred.resolve(true);
    scope.$root.$digest();
    expect(scope.contacts.length).toBe(3);
  });

  it('should has properly working method add', function () {
    queryDeferred.resolve(contacts);
    scope.$root.$digest();
    expect(scope.contacts.length).toBe(4);

    var contact = {
      id: 5,
      name: 'E',
      surname: 'P',
      phoneNumber: '79260000002',
      group: 'f'
    };
    scope.add();
    modalDeferred.resolve(contact);
    scope.$root.$digest();
    expect(scope.contacts.length).toBe(5);
    expect(scope.contacts[4]).toEqual(contact);
  });

  it('should has properly working method edit', function () {
    queryDeferred.resolve(contacts);
    scope.$root.$digest();
    expect(scope.contacts.length).toBe(4);

    var contact = {
      id: 4,
      name: 'E',
      surname: 'P',
      phoneNumber: '79260000002',
      group: 'f'
    };
    scope.edit(scope.contacts[3]);
    modalDeferred.resolve(contact);
    scope.$root.$digest();
    expect(scope.contacts.length).toBe(4);
    expect(scope.contacts[3]).toEqual(contact);

  });
});
