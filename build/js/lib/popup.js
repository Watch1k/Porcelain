;(function () {
  var body = document.body;

  /**
   * Popup module.
   *
   * @TODO: add beforeOpen, afterOpen, onOpen, onClose callbacks
   *
   * @param {HTMLElement} button
   * @param {Object} options
   * @param {String} [options.openedClass] - class added to popup on popup open
   * @param {String} [options.openedBodyClass] - class added to body on popup open
   * @param {String} [options.popupDialogBoxClass] - popup content selector
   * @param {String} [options.closeBtnSelector]  - popup close button selector
   * @param {Boolean} [options.closeOnEsc] - close on 'Esc' button click
   * @param {String} [options.targetPopupId] - Popup to show (its data-popup-id value)
   * @param {Number} [options.animationTime] - animation time in ms (for removing/adding scrollbar and padding)
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
    this.remoteData = this.button.dataset.popupRemote || this.options.remote;
  }

  /**
   * Open popup.
   *
   * @param {Object} remoteData - ajax request 'response' object
   *
   * @return {Popup}
   */
  Popup.prototype.open = function (remoteData) {

    // do stuff with remote data before popup open
    if (remoteData) {
      // actions with response
      this.actionsWithRemoteData(remoteData);

      // register events now
      this.init(false);
    }

    // hide body's scrollbar if popup is higher then window
    var dialogBox = this.popup.querySelector(this.options.popupDialogBoxClass);
    var popupHasScrollbar = dialogBox.offsetHeight + 60 > window.innerHeight;
    var isNotMobile = window.innerWidth > 1024;

    if (popupHasScrollbar && isNotMobile) {
      //@TODO: check and add padding if needed (visual bug, bootstrap solution)
      body.style.overflow = 'hidden';

      this.overflowFlag = true;
    }

    // add active class to body
    body.classList.add(this.options.openedBodyClass);

    // add active active class to popup
    this.popup.classList.add(this.options.openedClass);

    return this;
  };

  /**
   * Close popup.
   *
   * @return {Popup}
   */
  Popup.prototype.close = function () {
    // remove active class from body
    body.classList.remove(this.options.openedBodyClass);

    // remove active class from popup
    this.popup.classList.remove(this.options.openedClass);

    // show body's scrollbar if it was hidden
    var closeOverflow;
    if (this.overflowFlag) {
      clearTimeout(closeOverflow);

      closeOverflow = setTimeout(function () {
        body.style.overflow = 'auto';
      }, this.options.animationTime);
    }

    return this;
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
      if (_this.remoteData) {
        var remoteUrl = _this.remoteData;

        if (!(typeof $ === 'function')) {
          console.log('Remote option needs jquery');
        } else {
          $.ajax({
            cache: 'false',
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
    var closeButton = _this.popup.querySelector(this.options.closeBtnSelector);

    closeButton.addEventListener('click', function () {
      _this.close();
    });

    return this;
  };

  /**
   * Actions with remote data.
   *
   * @param {Object} remoteData
   * @return {Popup}
   */
  Popup.prototype.actionsWithRemoteData = function (remoteData) {
    if (remoteData.replaces instanceof Array) {
      for (var i = 0, ilen = remoteData.replaces.length; i < ilen; i++) {
        $(remoteData.replaces[i].what).replaceWith(remoteData.replaces[i].data);
      }
    }
    if (remoteData.append instanceof Array) {
      for (i = 0, ilen = remoteData.append.length; i < ilen; i++) {
        $(remoteData.append[i].what).append(remoteData.append[i].data);
      }
    }
    if (remoteData.content instanceof Array) {
      for (i = 0, ilen = remoteData.content.length; i < ilen; i++) {
        $(remoteData.content[i].what).html(remoteData.content[i].data);
      }
    }
    if (remoteData.js) {
      $("body").append(remoteData.js);
    }
    if (remoteData.refresh) {
      window.location.reload(true);
    }
    if (remoteData.redirect) {
      window.location.href = remoteData.redirect;
    }
  };


  /**
   * Register all events.
   *
   * @param {Boolean} deferredRegistration - register events after AJAX's success callback
   * @return {Popup}
   */
  Popup.prototype.init = function (deferredRegistration) {
    deferredRegistration = typeof deferredRegistration === 'boolean'
      ? deferredRegistration
      : this.remoteData;

    // close popup on 'Esc' click
    if (this.options.closeOnEsc && !deferredRegistration) this.registerCloseOnEsc();

    // open popup on click (button) and close on bg click
    this.registerOpenOnClick().registerCloseOnBgClick();

    // close button
    if (!deferredRegistration) this.registerClsBtnClick();

    return this;
  };

  /**
   * Expose Popup module.
   */
  window.Popup = Popup;
})();

/**
 * Initialize popup module on buttons.
 */
document.querySelectorAll('[data-popup="toggle"]').forEach(function (button) {
  (new Popup(button)).init();
});