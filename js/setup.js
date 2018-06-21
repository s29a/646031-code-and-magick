'use strict';

var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_COUNT = 4;

var userDialog = document.querySelector('.setup');
var form = userDialog.querySelector('.setup-wizard-form');
var playerCoat = userDialog.querySelector('.setup-wizard .wizard-coat');
var playerEye = userDialog.querySelector('.setup-wizard .wizard-eyes');
var playerFireball = userDialog.querySelector('.setup-fireball-wrap');

form.addEventListener('submit', function (evt) {
  window.backend.save(new FormData(form), function () {
    userDialog.classList.add('hidden');
  }, function (message) {
    console.log(message);
  });
  evt.preventDefault();
});

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
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

  return wizardElement;
};

var showWizardsList = function (wizards) {
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < WIZARDS_COUNT; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
};

var errorHandler = function (errorMessage) {
  var node = document.createElement('div');
  node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
  node.style.position = 'absolute';
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = '30px';

  node.textContent = errorMessage;
  document.body.insertAdjacentElement('afterbegin', node);
};

window.backend.load(showWizardsList, errorHandler);
