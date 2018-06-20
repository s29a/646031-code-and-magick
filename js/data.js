'use strict';

(function () {
  var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  var getRandomArrItem = function (arr, del) {
    var randomNum = Math.floor(Math.random() * arr.length);
    var randomItem = arr[randomNum];

    if (del) {
      arr.splice(randomNum, 1);
    }

    return randomItem;
  };

  window.data = {
    createRandomWizards: function (count, coatColors, eyeColors) {
      var arr = [];
      var firstNames = WIZARD_FIRST_NAMES.slice();
      var lastNames = WIZARD_LAST_NAMES.slice();

      for (var i = 0; i < count; i++) {
        arr[i] = {
          name: getRandomArrItem(firstNames, true) + ' ' + getRandomArrItem(lastNames, true),
          coatColor: getRandomArrItem(coatColors, true),
          eyesColor: getRandomArrItem(eyeColors, true)
        };
      }

      return arr;
    }
  };
})();
