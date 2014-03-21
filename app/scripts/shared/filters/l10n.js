'use strict';

angular.module('sharedApp')
    .filter('l10n', function () {
      var dict = {
        ru: {
          'New': 'Новый',
          'Contacts': 'Контакты',
          'Search': 'Поиск',
          'Sort by': 'Сортировать',
          'Name': 'Имя',
          'Surname': 'Фамилия',
          'Group': 'Группа',
          'Phone Number': 'Номер телефона',
          'Edit': 'Редактировать',
          'Delete': 'Удалить',
          'Toggle navigation': 'Переключение навигации',
          'Language': 'Язык'
        }
      };

      return function (word, lang) {
        if (lang === 'en') {
          return word;
        } else {
          if (dict[lang]) return dict[lang][word] || word;
          else return word;
        }
      };
    });