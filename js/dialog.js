'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var userDialog = window.setup.userDialog;
  var form = userDialog.querySelector('.setup-wizard-form');
  var userDialogOpen = document.querySelector('.setup-open');
  var userDialogClose = userDialog.querySelector('.setup-close');
  var dialogInputName = userDialog.querySelector('.setup-user-name');
  var artifacts = userDialog.querySelectorAll('[draggable="true"]');
  var dialogHandler = userDialog.querySelector('.upload');
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && evt.target !== dialogInputName) {
      closePopup();
    }
  };

  var defaultPopupCoords = {
    x: userDialog.style.left,
    y: userDialog.style.top
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

  window.backend.load(window.setup.showWizardsList, errorHandler);

  var openPopup = function () {
    userDialog.classList.remove('hidden');
    userDialog.style.left = defaultPopupCoords.x;
    userDialog.style.top = defaultPopupCoords.y;
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

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      userDialog.classList.add('hidden');
    }, errorHandler);
    evt.preventDefault();
  });

  artifacts.forEach(function (item) {
    item.addEventListener('mousedown', function (evt) {
      onArtifactMouseDown(item, item, evt, false);
    });
  });

  dialogHandler.addEventListener('mousedown', function (evt) {
    onArtifactMouseDown(dialogHandler, userDialog, evt, true);
  });

  var onArtifactMouseDown = function (handler, item, evt, dialog) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    if (!dialog) {
      var oldParrent = evt.target.parentElement;
    }

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (!dialog) {
        item.style.zIndex = 9999;
        item.style.position = 'absolute';
      }
      item.style.top = (item.offsetTop - shift.y) + 'px';
      item.style.left = (item.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      var droppable = document.querySelectorAll('.setup-artifacts-cell');

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          handler.removeEventListener('click', onClickPreventDefault);

          if (!dialog) {
            item.hidden = true;

            var elem = document.elementFromPoint(clickEvt.clientX, clickEvt.clientY);
            item.hidden = false;

            for (var i = 0; i < droppable.length; i++) {
              if (droppable[i] === elem) {
                oldParrent.removeChild(item);
                droppable[i].appendChild(item);
                item.style = null;
                break;
              }
            }
            item.style = null;
          }
        };
        handler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

})();
