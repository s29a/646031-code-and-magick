'use strict';

var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_COUNT = 4;

var userDialog = document.querySelector('.setup');

var showSetupDialog = function () {
  userDialog.classList.remove('hidden');
};

var getRandomArrItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var createRandomWizards = function (count) {
  var arr = [];

  for (var i = 0; i < count; i++) {
    arr[i] = {
      name: getRandomArrItem(WIZARD_FIRST_NAMES) + ' ' + getRandomArrItem(WIZARD_LAST_NAMES),
      coatColor: getRandomArrItem(WIZARD_COAT_COLORS),
      eyesColor: getRandomArrItem(WIZARD_EYE_COLORS)
    };
  }

  return arr;
};


var renderWizard = function (wizard) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var showWizardsList = function (wizards) {
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
};

showSetupDialog();
showWizardsList(createRandomWizards(WIZARDS_COUNT));

