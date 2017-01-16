/**
 * Created by Alexander Lozovskiy on 13.01.2017.
 */
function Popup(callbackParams) {
  var params = callbackParams || {};
  var _this = this;

  //Рендер элементов
  var body = document.body;
  var popup = createElement('popup hidden', 'body');
  var popupContainer = createElement('popup__container', '.popup');
  var closeBtn = createElement('popup__close-btn', '.popup__container');
  var popupContent = createElement('popup__content', '.popup__container');
  var esc = 27;

  var openBtns = document.querySelectorAll('.popup__open-btn');
  var closeBtns = document.querySelectorAll('.popup__close-btn');

  //Events
  for (var i = 0; i < closeBtns.length; i++) {
    closeBtns[i].addEventListener('click', closePopup);
  }
  for (var i = 0; i < openBtns.length; i++) {
    openBtns[i].addEventListener('click', showPopup);
  }
  body.addEventListener('keyup', onPressClose);

  /**
   * Функция рендера элементов
   *
   * @param {String} elementClass
   * @param {String|HTMLElement} elementContainer
   * @returns {Element}
   */
  function createElement(elementClass, elementContainer) {

    var container = document.createElement('div');

    container.className = elementClass;

    elementContainer = document.querySelector(elementContainer);

    elementContainer.appendChild(container);

    return container;
  }

  //Закрытие по нажатию екнопки ESC
  function onPressClose(object) {
    if (object.which == esc) {
      closePopup()
    }
  }

  //Открыть попап
  function showPopup() {
    typeof _this.params.beforeOpen === 'function' ? _this.params.beforeOpen.call(_this) : null;
    body.style.overflow = "hidden";
    body.style.height = "100%";
    popup.classList.remove('hidden');
    popup.classList.add('visible');
    typeof _this.params.afterOpen === 'function' ? _this.params.afterOpen.call(_this) : null;
  }

  //Закрыть попап
  function closePopup() {
    typeof _this.params.beforeClose === 'function' ? _this.params.beforeClose.call(_this) : null;
    body.style.overflow = "visible";
    body.style.height = "auto";
    popup.classList.remove('visible');
    popup.classList.add('hidden');
    typeof _this.params.afterClose === 'function' ? _this.params.afterClose.call(_this) : null;
  }

  //Public methods

  this.open = showPopup;

  this.close = closePopup;

  this.destroy = function () {
    body.removeEventListener('keyup', onPressClose);
    for (var i = 0; i < closeBtns.length; i++) {
      closeBtns[i].removeEventListener('click', closePopup);
    }
    ;
    for (var i = 0; i < openBtn.length; i++) {
      openBtn[i].removeEventListener('click', showPopup);
    }
    ;


    popup.parentNode.removeChild(popup);
  };

  this.createContent = function (content) {
    popupContent.innerHTML = content;
  };

  this.createCloseBtn = function (content) {
    closeBtn.innerHTML = content;
  };

  this.params = {
    beforeOpen: params.beforeOpen || false,
    afterOpen: params.afterOpen || false,
    beforeClose: params.beforeOpen || false,
    afterClose: params.afterOpen || false,
    closeBtn: params.closeBtn || '<svg x="0px" y="0px" viewBox="0 0 16.7 16.7">' +
    '    <g>' +
    '        <line class="st0" x1="16.4" y1="0.4" x2="0.4" y2="16.4"></line>' +
    '    </g>' +
    '    <g>' +
    '        <line class="st0" x1="0.4" y1="0.4" x2="16.4" y2="16.4"></line>' +
    '    </g>' + +'</svg>',
    content: params.content || ''
  };

  (function init() {
    _this.createContent(_this.params.content);
    _this.createCloseBtn(_this.params.closeBtn);
  })()
}

var data = {
  id: 'test-template',
  blog__date: '10 december 2016',
  blog__tag: ['#finance', '#finopay'],
  blog__title: 'What makes it different from normal currencies?',
  blog__img: 'static/img/content/blog.jpg',
  mainBtnBottom: 'Read more'
};

var content = _.template(document.getElementById(data.id).innerHTML);

var popup = new Popup({
  content: content(data)
});