'use strict';
(function () {
  var wizards = [];

  window.wizard.onChange = window.debounce(function () {
    updateWizards();
  });

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === window.wizard.coatInput.value) {
      rank += 2;
    }
    if (wizard.colorEyes === window.wizard.eyeInput.value) {
      rank += 1;
    }
    if (wizard.colorFireball === window.wizard.fireballInput.value) {
      rank += 0;
    }
    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  var successHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  window.backend.load(successHandler, window.dialog.errorHandler);

})();
