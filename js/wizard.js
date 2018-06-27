'use strict';

(function () {
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var userDialog = document.querySelector('.setup');
  var playerCoat = userDialog.querySelector('.setup-wizard .wizard-coat');
  var playerEye = userDialog.querySelector('.setup-wizard .wizard-eyes');
  var playerFireball = userDialog.querySelector('.setup-fireball-wrap');

  window.wizard = {
    onChange: function () {},
    coatInput: userDialog.querySelector('[name="coat-color"]'),
    eyeInput: userDialog.querySelector('[name="eyes-color"]'),
    fireballInput: userDialog.querySelector('[name="fireball-color"]')
  };

  var nextValueFromArr = function (input, arr) {
    var i = arr.indexOf(input.value);

    if (i < arr.length - 1) {
      input.value = arr[i + 1];
    } else {
      input.value = arr[0];
    }

    return input.value;
  };

  playerCoat.addEventListener('click', function () {
    playerCoat.style.fill = nextValueFromArr(window.wizard.coatInput, WIZARD_COAT_COLORS);
    window.wizard.onChange();
  });

  playerEye.addEventListener('click', function () {
    playerEye.style.fill = nextValueFromArr(window.wizard.eyeInput, WIZARD_EYE_COLORS);
    window.wizard.onChange();
  });

  playerFireball.addEventListener('click', function () {
    playerFireball.style.background = nextValueFromArr(window.wizard.fireballInput, WIZARD_FIREBALL_COLORS);
    window.wizard.onChange();
  });

  return window.wizard;
})();
