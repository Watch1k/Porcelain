;(function () {
  var body = document.body;

  /**
   * Popup module.
   *
   * @TODO: add beforeOpen, afterOpen, onOpen, onClose callbacks
   *
   * @param {HTMLElement} button
   * @param {Object} options
   * @param {String} [options.openedClass]
   * @param {String} [options.openedBodyClass]
   * @param {String} [options.popupDialogBoxClass]
   * @param {String} [options.targetPopupId] - Popup to show (its data-pop-id value)
   * @param {String} [options.closeBtnSelector]
   * @param {Boolean} [options.closeOnEsc]
   * @param {Number} [options.animationTime] - time in ms
   * @param {String|Boolean} [options.remote] - Remote data URL (TODO: make it an object with callback params)
   */
  function Popup (button, options) {
    options = options || {};

    this.options = {
      openedClass: options.openedClass || 'opened',
      openedBodyClass: options.openedBodyClass || 'popup-opened',
      popupDialogBoxClass: options.popupDialogBoxClass || '.popup__container',
      targetPopupId: options.targetPopupId || button.dataset.targetPopup,
      closeBtnSelector: options.closeBtnSelector || '.popup__close-btn',
      closeOnEsc: typeof options.closeOnEsc === 'boolean' ? options.closeOnEsc : true,
      animationTime: options.animationTime || 200,
      remote: options.remote || false
    };

    this.button = button;
    this.popup = document.querySelector('[data-popup-id="' + this.options.targetPopupId + '"]');
    this.closeBtn = this.popup.querySelector(this.options.closeBtnSelector);
    this.dialogBox = this.popup.querySelector(this.options.popupDialogBoxClass);
  }

  /**
   * Open popup.
   *
   * @param {Object} remoteData - ajax request 'response' object
   */
  Popup.prototype.open = function (remoteData) {
    // do stuff with remote data before popup open
    if (remoteData) {
      console.log(remoteData);
    }

    // hide body scrollbar if popup is higher then window
    if (this.dialogBox.offsetHeight + 60 > window.innerHeight && window.innerWidth > 1024) {
      //@TODO: check and add padding if needed (visual bug, bootstrap solution)
      body.style.overflow = 'hidden';

      this.overflowFlag = true;
    }

    // active class on body
    body.classList.add(this.options.openedBodyClass);

    // active class on element
    this.popup.classList.add(this.options.openedClass);
  };

  /**
   * Close popup.
   */
  Popup.prototype.close = function () {
    // remove class on body
    body.classList.remove(this.options.openedBodyClass);

    // active class on element
    this.popup.classList.remove(this.options.openedClass);

    // show scrollbar if it was hidden
    var closeOverflow;
    if (this.overflowFlag) {
      clearTimeout(closeOverflow);

      closeOverflow = setTimeout(function () {
        body.style.overflow = 'auto';
      }, this.options.animationTime);
    }
  };

  /**
   * Open popup on button's click.
   *
   * @return {Popup}
   */
  Popup.prototype.registerOpenOnClick = function () {
    var _this = this;

    this.button.addEventListener('click', function () {

      // REMOTE DATA
      if (_this.button.dataset.popupRemote || _this.options.remote) {
        var remoteUrl =_this.button.dataset.popupRemote || _this.options.remote;

        if (!(typeof $ === 'function')) {
          console.log('Remote option needs jquery');
        } else {
          $.ajax({
            method: 'get',
            url: remoteUrl,
            beforeSend: function () {
              // example - preloader start here
            },
            success: function (response) {
              _this.open(response);
            },
            error: function (xhr) {
              // handle error
            },
            complete: function () {
              // example - remove preloader here
            }
          });
        }

        return;
      }

      //TODO: check for opened popups and close them

      // open popup
      _this.open();
    });

    return this;
  };

  /**
   * Close popup on esc button click.
   *
   * @return {Popup}
   */
  Popup.prototype.registerCloseOnEsc = function () {
    document.addEventListener('keypress', function (event) {
      if (event.keyCode == 27) this.close();
    });

    return this;
  };

  /**
   * Close popup on modal's background click.
   *
   * @return {Popup}
   */
  Popup.prototype.registerCloseOnBgClick = function () {
    var _this = this;

    _this.popup.addEventListener('click', function (event) {
      if (event.target === _this.popup) _this.close();
    });

    return this;
  };

  /**
   * Close popup on close button click.
   *
   * @return {Popup}
   */
  Popup.prototype.registerClsBtnClick = function () {
    var _this = this;

    this.closeBtn.addEventListener('click', function () {
      _this.close();
    });

    return this;
  };

  /**
   * Register all events.
   */
  Popup.prototype.init = function () {
    if (this.options.closeOnEsc) this.registerCloseOnEsc();

    this.registerOpenOnClick().registerClsBtnClick().registerCloseOnBgClick();
  };

  /**
   * Expose Popup module.
   */
  window.Popup = Popup;
})();

/**
 * Initialize popup module.
 */
document.querySelectorAll('[data-popup="toggle"]').forEach(function (button) {
  (new Popup(button)).init();
});