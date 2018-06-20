'use strict';

var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_COUNT = 4;

var userDialog = document.querySelector('.setup');
var playerCoat = userDialog.querySelector('.setup-wizard .wizard-coat');
var playerEye = userDialog.querySelector('.setup-wizard .wizard-eyes');
var playerFireball = userDialog.querySelector('.setup-fireball-wrap');


playerCoat.addEventListener('click', function () {
  playerCoat.style.fill = nextValueFromArr(userDialog.querySelector('[name="coat-color"]'), WIZARD_COAT_COLORS);
});

playerEye.addEventListener('click', function () {
  playerEye.style.fill = nextValueFromArr(userDialog.querySelector('[name="eyes-color"]'), WIZARD_EYE_COLORS);
});

playerFireball.addEventListener('click', function () {
  playerFireball.style.background = nextValueFromArr(userDialog.querySelector('[name="fireball-color"]'), WIZARD_FIREBALL_COLORS);
});

var nextValueFromArr = function (input, arr) {
  var i = arr.indexOf(input.value);

  if (i < arr.length - 1) {
    input.value = arr[i + 1];
  } else {
    input.value = arr[0];
  }

  return input.value;
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

showWizardsList(window.data.createRandomWizards(WIZARDS_COUNT, WIZARD_COAT_COLORS.slice(), WIZARD_EYE_COLORS.slice()));

