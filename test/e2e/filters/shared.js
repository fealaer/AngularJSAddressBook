'use strict';

describe('Filters in SharedApp', function () {

  beforeEach(function () {
    localStorage.clear();
    browser().navigateTo('/');
  });

  it('should has filter l10n and it has to work properly when we change Language', function () {
    element('#en a').click();
    expect(element('strong.navbar-brand').text()).toBe('Contacts');
    element('#ru a').click();
    expect(element('strong.navbar-brand').text()).toBe('Контакты');
  });

  it('should has filter phone and it has to work properly', function () {
    expect(repeater('.contact', 'contact in contacts').column('contact.phoneNumber')).toEqual(['+7 (926) 000-0001','+7 (925) 500-0000','+7 (925) 000-0000','+7 (925) 000-0001']);
  });
});