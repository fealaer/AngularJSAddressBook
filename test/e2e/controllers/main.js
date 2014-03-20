'use strict';

describe('Controller: MainCtrl', function () {

  beforeEach(function () {
    browser().navigateTo('/');
  });

  it('should redirect / to /#/', function () {
    expect(browser().location().url()).toBe('/');
  });

  it('should render a list of contacts to the scope', function () {
    expect(repeater('.contact').count()).toBe(4);
  });

  it('should filter contacts', function () {
    var searchText = input('searchString');
    searchText.enter('');
    searchText.enter('Len');
    expect(repeater('.contact').count()).toBe(1);

    searchText.enter('');
    searchText.enter('925');
    expect(repeater('.contact').count()).toBe(3);

    searchText.enter('');
    searchText.enter('fam');
    expect(repeater('.contact').count()).toBe(2);

    searchText.enter('');
    searchText.enter('pUsh');
    expect(repeater('.contact').count()).toBe(2);
  });

  it('should sort contacts', function () {
    expect(element('div.navbar ul.dropdown-menu a').count()).toBe(4);
    element('#sortByName').click();
    expect(repeater('.contact', 'contact in contacts').column('contact.phoneNumber')).toEqual(['+79255000000','+79250000000','+79260000001','+79250000001']);
    element('#sortBySurname').click();
    expect(repeater('.contact', 'contact in contacts').column('contact.phoneNumber')).toEqual(['+79260000001','+79250000001','+79255000000','+79250000000']);
    element('#sortByGroup').click();
    expect(repeater('.contact', 'contact in contacts').column('contact.phoneNumber')).toEqual(['+79260000001','+79255000000','+79250000000','+79250000001']);
    element('#sortByPhoneNumber').click();
    expect(repeater('.contact', 'contact in contacts').column('contact.phoneNumber')).toEqual(['+79250000000','+79250000001','+79255000000','+79260000001']);
  });
});