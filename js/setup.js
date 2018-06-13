'use strict';

var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_COUNT = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var userDialog = document.querySelector('.setup');
var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = userDialog.querySelector('.setup-close');
var playerCoat = userDialog.querySelector('.setup-wizard .wizard-coat');
var playerEye = userDialog.querySelector('.setup-wizard .wizard-eyes');
var playerFireball = userDialog.querySelector('.setup-fireball-wrap');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

userDialogOpen.addEventListener('click', function () {
  openPopup();
});

userDialogOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

userDialogClose.addEventListener('click', function () {
  closePopup();
});

userDialogClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

playerCoat.addEventListener('click', function () {
  userDialogChangeCoatColor();
});

playerEye.addEventListener('click', function () {
  userDialogChangeEyeColor();
});

playerFireball.addEventListener('click', function () {
  userDialogChangeFireballColor();
});

var userDialogChangeCoatColor = function () {
  var input = userDialog.querySelector('[name="coat-color"]');
  nextValueFromArr(input, WIZARD_COAT_COLORS);
  playerCoat.style.fill = input.value;
};

var userDialogChangeEyeColor = function () {
  var input = userDialog.querySelector('[name="eyes-color"]');
  nextValueFromArr(input, WIZARD_EYE_COLORS);
  playerEye.style.fill = input.value;
};

var userDialogChangeFireballColor = function () {
  var input = userDialog.querySelector('[name="fireball-color"]');
  nextValueFromArr(input, WIZARD_FIREBALL_COLORS);
  playerFireball.style.background = input.value;
};

var nextValueFromArr = function (input, arr) {
  var i = arr.indexOf(input.value);

  if (i < arr.length - 1) {
    input.value = arr[i + 1];
  } else {
    input.value = arr[0];
  }
};

var getRandomArrItem = function (arr, del) {
  var randomNum = Math.floor(Math.random() * arr.length);
  var randomItem = arr[randomNum];

  if (del) {
    arr.splice(randomNum, 1);
  }

  return randomItem;
};

var createRandomWizards = function (count) {
  var arr = [];
  var coatColors = WIZARD_COAT_COLORS.slice();
  var eyeColors = WIZARD_EYE_COLORS.slice();
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
};

var renderWizard = function (wizard) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
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

showWizardsList(createRandomWizards(WIZARDS_COUNT));

