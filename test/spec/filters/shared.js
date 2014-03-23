'use strict';

describe('Filters in SharedApp', function () {

  // load the controller's module
  beforeEach(module('sharedApp'));

  var filters = {};
  beforeEach(inject(function ($filter) {
    filters.l10n = $filter('l10n');
    filters.phone = $filter('phone');
  }));

  it('should have l10n and phone filters', function () {
    expect(filters.l10n).not.toBe(null);
    expect(filters.phone).not.toBe(null);
  });

  it('should change word or sentence if we have translation in requested language', function () {
    expect(filters.l10n('Contacts', 'en')).toBe('Contacts');
    expect(filters.l10n('Контакты', 'ru')).toBe('Контакты');
    expect(filters.l10n('Contacts', 'pl')).toBe('Contacts');
  });

  it('should format phone number', function () {
    expect(filters.phone('79261234567')).toBe('+7 (926) 123-4567');
  });
});
