'use strict';

describe('Filters in SharedApp', function () {

  beforeEach(function () {
    browser().navigateTo('/');
  });

  it('should has filter l10n and it has to work properly when we change Language', function () {
    element('#en a').click();
    expect(element('strong.navbar-brand').text()).toBe('Contacts');
    element('#ru a').click();
    expect(element('strong.navbar-brand').text()).toBe('Контакты');
  });
});