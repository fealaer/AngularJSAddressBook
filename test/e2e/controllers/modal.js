'use strict';

describe('Controller: ModalCtrl', function () {

  var errorMessages = 'div.modal-body div:visible.alert';

  beforeEach(function () {
    browser().navigateTo('/');
    localStorage.clear();
  });

  var modalSave,
      modalCancel,
      nameInput,
      surnameInput,
      phoneNumberInput,
      groupInput,
      newBtn,
      editBtn;
  beforeEach(function () {
    newBtn = element('div.navbar button.btn-success');
    editBtn = element('div.contact button.btn.btn-info:first');
    newBtn.click();
    modalSave = element('div.modal-body button.btn-success');
    modalCancel = element('div.modal-body button.btn-warning');
    nameInput = input('data.name');
    surnameInput = input('data.surname');
    phoneNumberInput = input('data.phoneNumber');
    groupInput = input('data.group');
  });

  it('should has proper elements on page', function () {
    expect(modalCancel.text()).toBe('Cancel');
    expect(modalSave.text()).toBe('Save');
  });

  it('should dismiss Modal when cancel button clicked', function () {
    modalCancel.click();
    expect(element('div.modal')).toBe(undefined);
  });

  it('should enable button save when minimum information entered', function () {
    expect(modalSave.prop("disabled")).toBe(true);
    nameInput.enter('New');
    phoneNumberInput.enter('12345678901');
    expect(modalSave.prop("disabled")).toBe(false);
  });

  it('should save new contact with minimum information then close Modal and return result', function () {
    expect(repeater('.contact').count()).toBe(4);
    nameInput.enter('New');
    phoneNumberInput.enter('12345678901');
    modalSave.click();
    expect(element('div.modal')).toBe(undefined);
    sleep(0.016);
    expect(repeater('.contact').count()).toBe(5);
  });

  it('should save new contact with full contact information then close Modal and return result', function () {
    expect(repeater('.contact').count()).toBe(4);
    nameInput.enter('Name');
    phoneNumberInput.enter('12345678901');
    surnameInput.enter('Surname');
    groupInput.enter('Group');
    modalSave.click();
    expect(element('div.modal')).toBe(undefined);
    sleep(0.016);
    expect(repeater('.contact').count()).toBe(5);
  });

  it('should edit contact if minimum contact information entered then close Modal and return result', function () {
    expect(repeater('.contact').count()).toBe(4);
    modalCancel.click();
    expect(element('div.modal')).toBe(undefined);
    editBtn.click();
    nameInput.enter('Name');
    phoneNumberInput.enter('12345678901');
    surnameInput.enter('');
    groupInput.enter('');
    modalSave.click();
    expect(element('div.modal')).toBe(undefined);
    expect(repeater('.contact').count()).toBe(4);
  });

  it('should show errors when necessary', function () {
    expect(element(errorMessages).count()).toBe(0);
    phoneNumberInput.enter('1');
    nameInput.enter('p');
    expect(element(errorMessages).count()).toBe(0);
    nameInput.enter('');
    expect(element(errorMessages).count()).toBe(1);
    phoneNumberInput.enter('');
    expect(element(errorMessages).count()).toBe(2);
    phoneNumberInput.enter('12345678901');
    expect(element(errorMessages).count()).toBe(1);
    nameInput.enter('u');
    expect(element(errorMessages).count()).toBe(0);
  });
});