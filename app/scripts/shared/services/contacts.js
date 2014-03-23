'use strict';

angular.module('sharedApp')
    .service('Contacts', ['$rootScope', '$q', 'localStorageService', function Contacts($rootScope, $q, localStorageService) {
      Contacts.prototype.query = function () {
        return setUpResolver(function (deferred) {
          deferred.resolve(angular.copy(getContacts()));
        });
      };

      Contacts.prototype.get = function (id) {
        return setUpResolver(function (deferred) {
          var find = findById(id);
          if (find.index !== -1) {
            deferred.resolve(angular.copy(find.contact));
          } else {
            deferred.resolve(angular.copy(null));
          }
        });
      };

      Contacts.prototype.save = function (data) {
        return setUpResolver(function (deferred) {
          data.id = getId();
          setId(data.id + 1);

          var contacts = getContacts();
          contacts.push(data);
          setContacts(contacts);

          deferred.resolve(angular.copy(data));
        });
      };

      Contacts.prototype.update = function (data) {
        return setUpResolver(function (deferred) {
          var find = findById(data.id);
          if (find.index !== -1) {
            var contact = find.contact;
            contact.name = data.name;
            contact.surname = data.surname;
            contact.phoneNumber = data.phoneNumber;
            contact.group = data.group;

            var contacts = getContacts();
            contacts[find.index] = contact;
            setContacts(contacts);

            deferred.resolve(angular.copy(contact));
          } else {
            deferred.resolve(angular.copy(null));
          }
        });
      };

      Contacts.prototype.delete = function (id) {
        return setUpResolver(function (deferred) {
          var i = findById(id).index;
          if (i !== -1) {
            var contacts = getContacts();
            contacts.splice(i, 1);
            setContacts(contacts);
            deferred.resolve(true);
          } else {
            deferred.resolve(false);
          }
        });
      };

      function findById(id) {
        var contacts = getContacts();
        for (var i = 0; i < contacts.length; i++) {
          if (contacts[i].id === id) {
            return {contact: contacts[i], index: i};
          }
        }
        return {contact: null, index: -1};
      }

      function setUpResolver(func) {
        var deferred = $q.defer();

        setTimeout(function () {
          $rootScope.$apply(function () {
            func(deferred);
          });
        }, 15);

        return deferred.promise;
      }

      Contacts.prototype.getId = function () {
        return getId();
      };

      function getContacts() {
        return localStorageService.get('contacts');
      }

      function setContacts(contacts) {
        localStorageService.set('contacts', contacts);
      }

      function getId() {
        return parseInt(localStorageService.get('id'));
      }

      function setId(id) {
        localStorageService.set('id', id);
      }

      function init() {
        if (!getId() && !getContacts()) {
          var contacts = [
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
          var id = 5;
          setContacts(contacts);
          setId(id);
        }
      }
      init();
    }]);