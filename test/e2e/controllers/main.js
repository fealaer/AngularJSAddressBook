'use strict';

describe('Controller: MainCtrl', function () {

  beforeEach(function () {
    localStorage.clear();
    browser().navigateTo('/');
  });

  it('should redirect / to /#/en', function () {
    expect(browser().location().url()).toBe('/en');
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
    expect(element('div.navbar ul.sort a').count()).toBe(4);
    element('#sortByName').query(function ($el, done) {
      element('#sortByName a').click();
      $el.hasClass('active');
      expect(repeater('.contact', 'contact in contacts').column('contact.phoneNumber')).toEqual(['+7 (925) 500-0000', '+7 (925) 000-0000', '+7 (926) 000-0001', '+7 (925) 000-0001']);
      done();
    });
    element('#sortBySurname').query(function ($el, done) {
      element('#sortBySurname a').click();
      $el.hasClass('active');
      expect(repeater('.contact', 'contact in contacts').column('contact.phoneNumber')).toEqual(['+7 (926) 000-0001', '+7 (925) 000-0001', '+7 (925) 500-0000', '+7 (925) 000-0000']);
      done();
    });
    element('#sortByGroup').query(function ($el, done) {
      element('#sortByGroup a').click();
      $el.hasClass('active');
      expect(repeater('.contact', 'contact in contacts').column('contact.phoneNumber')).toEqual(['+7 (926) 000-0001', '+7 (925) 500-0000', '+7 (925) 000-0000', '+7 (925) 000-0001']);
      done();
    });
    element('#sortByPhoneNumber').query(function ($el, done) {
      element('#sortByPhoneNumber a').click();
      $el.hasClass('active');
      expect(repeater('.contact', 'contact in contacts').column('contact.phoneNumber')).toEqual(['+7 (925) 000-0000', '+7 (925) 000-0001', '+7 (925) 500-0000', '+7 (926) 000-0001']);
      done();
    });
  });

  it('should redirect to /#/:lang when change Language', function () {
    expect(element('div.navbar ul.lang a').count()).toBe(2);
    element('#en').query(function ($el, done) {
      element('#en a').click();
      $el.hasClass('active');
      expect(browser().location().url()).toBe('/en');
      done();
    });
    element('#ru').query(function ($el, done) {
      element('#ru a').click();
      $el.hasClass('active');
      expect(browser().location().url()).toBe('/ru');
      done();
    });
  });
});