'use strict';

describe('Service: Contacts', function () {

  beforeEach(module('mainApp'));

  var Contacts;
  beforeEach(inject(function (_Contacts_) {
    Contacts = _Contacts_;
  }));

  it('should do something', function () {
    expect(!!Contacts).toBe(true);
  });

  it('should initialise contacts id with 5', function () {
    expect(Contacts.getId()).toBe(5);
  });

  it('should return array with 4 contacts', function (done) {
    Contacts.query().then(function (contacts) {
      expect(contacts.length).toBe(Contacts.contacts.length);
      done();
    });
  });

  it('should return contact by id', function (done) {
    var id = 4;
    Contacts.get(id).then(function (contact) {
      expect(contact.id).toBe(id);
      done();
    });
  });

  it('should save new contact and return it', function (done) {
    var contact = {
      name: 'E',
      surname: 'P',
      phoneNumber: '79260000002',
      group: 'f'
    };
    Contacts.save(contact).then(function (newContact) {
      expect(Contacts.contacts.length).toBe(5);
      contact.id = 5;
      expect(newContact).toEqual(contact);
      done();
    });
  });

  it('should edit contact and return it', function (done) {
    var contact = {
      id: 4,
      name: 'E',
      surname: 'P',
      phoneNumber: '79260000002',
      group: 'f'
    };
    Contacts.update(contact).then(function (editedContact) {
      expect(editedContact).toEqual(contact);
      done();
    });
  });
});