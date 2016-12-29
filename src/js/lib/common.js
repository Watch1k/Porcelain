/* Common JS */
$(document).ready(function () {

	$(window).on('load', function () {
		$('body').addClass('is-loaded');
		TweenMax.staggerTo($('.header .nav__item'), 1, {opacity: 1, transform: 'translateY(0)', delay: 0.5}, 0.1);

		(function () {
			var testEl = $('.js-test-el');

			var Animation = function () {
				this.motion = false;
				this.tween = false;
				this.mainDelay = false;
				this.reveal = false;
				this.bgColor = '#eeeeee';
				this.speedLine = 500;
				this.speedRect = 500;
				this.moveDown = false;
				this.moveDownDelay = false;
				this.moveDownSpeed = 500;
				this.moveUp = false;
				this.moveUpDelay = false;
				this.moveUpSpeed = 500;
			};

			testEl.each(function () {
				var el = $(this);

				var animation = new Animation();

				if (checkAttrExists('data-motion')) {
					animation.motion = el.attr('data-motion');
				}
				if (checkAttrExists('data-tween')) {
					animation.tween = true;
				}
				if (checkAttrExists('data-main-delay')) {
					animation.delayMain = el.attr('data-main-delay');
				} else {
					animation.delayMain = 0;
				}
				if (checkAttrExists('data-reveal')) {
					if (el.attr('data-reavel') == 'true') {
						animation.reveal = true;
					}
				}
				if (checkAttrExists('data-speed-line')) {
					animation.speedLine = el.attr('data-speed-line');
				}
				if (checkAttrExists('data-speed-rect')) {
					animation.speedRect = el.attr('data-speed-rect');
				}
				if (checkAttrExists('data-main-delay')) {
					animation.delayMain = el.attr('data-main-delay');
				} else {
					animation.delayMain = 0;
				}
				if (checkAttrExists('data-move-down')) {
					if (el.attr('data-move-down') == 'true') {
						animation.moveDown = true;
					}
				}
				if (checkAttrExists('data-move-down-delay')) {
					animation.moveDownDelay = el.attr('data-move-down-delay');
				} else {
					animation.moveDownDelay = 0;
				}
				if (checkAttrExists('data-move-down-speed')) {
					animation.moveDownSpeed = el.attr('data-move-down-speed');
				}
				if (checkAttrExists('data-move-up')) {
					if (el.attr('data-move-up') == 'true') {
						animation.moveUp = true;
					}
				}
				if (checkAttrExists('data-move-up-delay')) {
					animation.moveUpDelay = el.attr('data-move-up-delay');
				} else {
					animation.moveUpDelay = 0;
				}
				if (checkAttrExists('data-move-up-speed')) {
					animation.moveUpSpeed = el.attr('data-move-up-speed');
				}

				switch (animation.motion) {
					case 'motion3':
						break;
					default:
						console.log(animation.motion);
				}

				if (animation.tween) {
					setTimeout(function () {

					}, animation.delayMain);
				}

				function checkAttrExists(name) {
					return (testEl.attr(name) != undefined) && (testEl.attr(name) != '');
				}
			});
		})();

		(function () {
			var inviewItem = $('.js-inview'),
				motionEl1 = $('.js-motion1'),
				motionEl2 = $('.js-motion2'),
				motionEl3 = $('.js-motion3'),
				hideEl = $('.js-hide');

			if (hideEl.length) {
				hideEl.each(function () {

					$(this).children().first().css({
						position: 'absolute',
						width: 15,
						height: 0
					}).next().css({
						opacity: 0
					});
				});
			}

			if (motionEl1.length) {
				motionEl1.each(function () {
					var _thisEl1 = $(this),
						_motionElWidth1 = Math.floor($(this).width()),
						_motionElHeight1 = Math.floor($(this).height());

					_thisEl1
						.css({
							position: 'absolute',
							width: 15,
							height: 0
						})
						.parent()
						.css({
							width: _motionElWidth1,
							height: _motionElHeight1
						});
					_thisEl1.children().css({
						width: _motionElWidth1,
						height: _motionElHeight1
					});
				});
			}

			if (motionEl2.length) {
				motionEl2.each(function () {
					var _thisEl2 = $(this),
						_motionElWidth2 = Math.floor($(this).parent().width()),
						_motionElHeight2 = Math.floor($(this).parent().height());

					_thisEl2
						.css({
							position: 'absolute',
							width: 15,
							height: 0
						})
						.parent()
						.css({
							width: _motionElWidth2,
							height: _motionElHeight2
						});
					_thisEl2.children().css({
						width: _motionElWidth2,
						height: _motionElHeight2
					});
				});
			}

			if (motionEl3.length) {
				motionEl3.each(function () {
					var _thisEl3 = $(this),
						_motionElWidth3 = Math.floor($(this).width()),
						_motionElHeight3 = Math.floor($(this).height()),
						_motionColor3 = $(this).css('backgroundColor');

					_thisEl3
						.css({
							background: 'transparent'
						})
						.wrapInner('<div class="motion__inner"></div>')
						.wrapInner('<div class="motion"></div>')
						.find('.motion')
						.css({
							position: 'absolute',
							'z-index': 1,
							left: '50%',
							top: 0,
							overflow: 'hidden',
							width: 0,
							background: _motionColor3
						})
						.children()
						.css({
							position: 'relative',
							width: _motionElWidth3,
							left: _motionElWidth3 / 2 * (-1)
						});
				});
			}

			for (var i = 0; i < inviewItem.length; i++) {
				var elementWatcher = scrollMonitor.create(inviewItem[i], -200);
				elementWatcher.enterViewport(function () {
					this.destroy();
					var el = $(this.watchItem);
					el.addClass('is-visible');

					if (el.attr('data-tween') == 'true') {
						var animName = el.attr('data-anim');

						switch (animName) {
							case 'anim1':
								var elMainDelay1 = el.attr('data-main-delay'),
									elSpeed1 = el.attr('data-speed'),
									elSpeedTween1 = elSpeed1 / 1000,
									animDelay = el.attr('data-anim-delay');

								if (animDelay == 'true') {
									TweenMax.to(el, elSpeedTween1, {
										opacity: 1,
										ease: Power1.easeInOut
									});
								}

								setTimeout(function () {
									TweenMax.to(el, elSpeedTween1, {
										opacity: 1,
										transform: 'translateY(0)',
										ease: Power1.easeInOut
									});
								}, elMainDelay1);
								break;
							case 'anim2':
								var elWidth2 = el.width(),
									elHeight2 = el.height(),
									elMainDelay2 = el.attr('data-main-delay'),
									elMainDelay2Tween = elMainDelay2 / 1000,
									elDelay2 = el.attr('data-delay'),
									elDelay2Tween = elDelay2Tween / 1000,
									elSpeed2 = el.attr('data-speed'),
									elSpeed2Tween = elSpeed2 / 1000;

								el.css('transform', 'translateY(10px)');

								setTimeout(function () {
									TweenMax.to(el, elDelay2Tween, {
										transform: 'translateY(20px)', ease: Power1.easeInOut, onComplete: function () {
											TweenMax.to(el, elSpeed2Tween * 2, {transform: 'translateY(0)', ease: Power1.easeInOut, delay: 0.5});
										}
									});

									el.children()
										.animate({
											height: elHeight2
										}, elSpeed2, function () {
											el.children()
												.addClass('is-motion')
												.animate({
													width: elWidth2
												}, elSpeed2, 'swing');
										});
								}, elMainDelay2);
								break;
							case 'anim3':
								var elWidth3 = el.width(),
									elHeight3 = el.height(),
									elMainDelay3 = el.attr('data-main-delay'),
									elMainDelay3Tween = elMainDelay3 / 1000,
									elDelay3 = parseFloat(el.attr('data-delay')),
									elDelay3Twenn = elDelay3 / 1000,
									elSpeed3 = el.attr('data-speed'),
									elSpeed3Tween = elSpeed3 / 1000,
									elOffsetY3 = el.attr('data-offset-y');

								if (elOffsetY3 != 'undefined') {
									el.css('transform', 'translateY(' + elOffsetY3 + 'px)');
								} else {
									el.css('transform', 'translateY(10px)');
								}
								el.children().last().children().last().css('width', elWidth3);

								setTimeout(function () {
									TweenMax.to(el, elSpeed3Tween, {
										transform: 'translateY(20px)', ease: Power1.easeInOut, onComplete: function () {
											TweenMax.to(el, elSpeed3Tween * 2, {transform: 'translateY(0)', ease: Power1.easeInOut});
										}
									});

									el.children().first()
										.animate({
											height: elHeight3
										}, elSpeed3, function () {
											el.children()
												.animate({
													width: elWidth3
												}, elSpeed3, 'swing', function () {
													el.children().addClass('is-motion');
												});
										});
									TweenMax.to(el.children().last(), elSpeed3Tween, {opacity: 1});
								}, elMainDelay3);
								break;
							case 'anim4':
								var elWidth4 = el.width(),
									elHeight4 = el.height(),
									elMainDelay4 = el.attr('data-main-delay'),
									elMainDelay4Tween = elMainDelay4 / 1000,
									elDelay4 = el.attr('data-delay'),
									elDelay4Tween = elDelay4Tween / 1000,
									elSpeed4 = el.attr('data-speed'),
									elSpeed4Tween = elSpeed4 / 1000,
									elOffsetY4 = el.attr('data-offset-y');

								if (elOffsetY4 != 'undefined') {
									el.css('transform', 'translateY(' + elOffsetY4 + 'px)');
								} else {
									el.css('transform', 'translateY(10px)');
								}
								el.children().last().children().last().children().last().css('width', elWidth4);

								setTimeout(function () {
									TweenMax.to(el, elSpeed4Tween, {
										transform: 'translateY(20px)', ease: Power1.easeInOut, onComplete: function () {
											TweenMax.to(el, elSpeed4Tween * 2, {transform: 'translateY(0)', ease: Power1.easeInOut});
										}
									});

									el.children()
										.animate({
											height: elHeight4
										}, elSpeed4, function () {
											el.children()
												.animate({
													width: elWidth4
												}, elSpeed4, 'swing');
										});
								}, elMainDelay4);
								break;
							case 'anim5':
								var elMainDelay5 = el.attr('data-main-delay'),
									elSpeed5 = el.attr('data-speed'),
									elSpeed5Tween = elSpeed5 / 1000;

								setTimeout(function () {
									TweenMax.to(el.children(), elSpeed5Tween, {
										left: 0, width: '100%', ease: Power1.easeInOut
									});
									TweenMax.to(el.children().children(), elSpeed5Tween, {
										left: 0, ease: Power1.easeInOut
									});
								}, elMainDelay5);
							default:
								break;
						}
					}
				});
			}
		})();
	});

	//for IE9
	svg4everybody();

	// Clear placeholder
	(function () {
		var el = $('input, textarea');
		el.focus(function () {
			$(this).data('placeholder', $(this).attr('placeholder'));
			$(this).attr('placeholder', '');
		});
		el.blur(function () {
			$(this).attr('placeholder', $(this).data('placeholder'));
		});
	})();

	(function () {
		var btn = $('.btn');

		btn.mousemove(function (e) {
			var distance = e.pageX - $(this).offset().left;
			if ((distance > ($(this).width() / 2)) && (distance < $(this).width())) {
				distance = $(this).width() - distance;
			}
			$(this).css('transform', 'translateX(' + distance / 15 + 'px)');
			$(this).find('.icon, .btn__icon').css('transform', 'translateX(-' + distance / 15 + 'px)');
		});

		btn.on('mouseleave', function (e) {
			$(this).css('transform', 'translateX(0)');
			$(this).find('.icon, .btn__icon').css('transform', 'translateX(0)');
		});
	})();

	//lang
	(function () {
		var lang = $('.js-lang'),
			langSub = lang.find('.header__lang');

		if (lang.length) {
			lang.find('.active > a').on('click', function (e) {
				e.preventDefault();
			});
			lang.on('click', function () {
				$(this).toggleClass('is-active');
				langSub.slideToggle({
					duration: 300,
					easing: 'swing'
				});
			});
			$(document).on('click', function (e) {
				if ($(e.target).closest(lang).length != 0) {
					//code
				} else {
					langSub.slideUp({
						duration: 300,
						easing: 'swing'
					});
					lang.removeClass('is-active');
				}
			});
		}
	})();

	//map footer
	(function () {
		var mapWrap = $('.js-map-list'),
			mapEl = mapWrap.children();

		mapEl.on('click', function () {
			var _this = $(this);

			if (!_this.hasClass('is-active')) {
				mapEl.removeClass('is-active');
				_this.addClass('is-active');
			}
		});

		google.maps.event.addDomListener(window, 'load', init_map());

		function init_map() {
			var bounds1 = new google.maps.LatLngBounds();
			var bounds2 = new google.maps.LatLngBounds();
			var bounds3 = new google.maps.LatLngBounds();
			var center1 = new google.maps.LatLng(50.460321, 30.511742);
			var center2 = new google.maps.LatLng(50.460321, 30.511742);
			var center3 = new google.maps.LatLng(50.460321, 30.511742);
			bounds1.extend(center1);
			bounds2.extend(center2);
			bounds3.extend(center3);
			var loc1 = new google.maps.LatLng(50.460321, 30.511742);
			var loc2 = new google.maps.LatLng(50.460321, 30.511742);
			var loc3 = new google.maps.LatLng(50.460321, 30.511742);
			bounds1.extend(loc1);
			bounds2.extend(loc2);
			bounds3.extend(loc3);
			var mapOptions1 = {
				zoom: 17,
				scrollwheel: false,
				streetViewControl: false,
				panControl: false,
				panControlOptions: {
					position: google.maps.ControlPosition.TOP_RIGHT
				},
				mapTypeControl: false,
				zoomControl: false,
				zoomControlOptions: {
					position: google.maps.ControlPosition.LEFT_BOTTOM
				},
				center: center1
			};
			var mapOptions2 = {
				zoom: 17,
				scrollwheel: false,
				streetViewControl: false,
				panControl: false,
				panControlOptions: {
					position: google.maps.ControlPosition.TOP_RIGHT
				},
				mapTypeControl: false,
				zoomControl: false,
				zoomControlOptions: {
					position: google.maps.ControlPosition.LEFT_BOTTOM
				},
				center: center2
			};
			var mapOptions3 = {
				zoom: 17,
				scrollwheel: false,
				streetViewControl: false,
				panControl: false,
				panControlOptions: {
					position: google.maps.ControlPosition.TOP_RIGHT
				},
				mapTypeControl: false,
				zoomControl: false,
				zoomControlOptions: {
					position: google.maps.ControlPosition.LEFT_BOTTOM
				},
				center: center3
			};

			var mapElement1 = document.getElementById('map1');
			var mapElement2 = document.getElementById('map2');
			var mapElement3 = document.getElementById('map3');

			var map1 = new google.maps.Map(mapElement1, mapOptions1);
			var map2 = new google.maps.Map(mapElement2, mapOptions2);
			var map3 = new google.maps.Map(mapElement3, mapOptions3);

			google.maps.event.addListenerOnce(map2, 'idle', function () {
				$('#map2').hide();
			});

			google.maps.event.addListenerOnce(map3, 'idle', function () {
				$('#map3').hide();
			});

			var marker1 = new google.maps.Marker({
				position: loc1,
				map: map1,
				icon: {
					url: '/img/content/pin.svg',
					size: new google.maps.Size(30, 46),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(-13, -5)
				},
				title: 'Подол'
			});

			var marker2 = new google.maps.Marker({
				position: loc2,
				map: map2,
				icon: {
					url: '/img/content/pin.svg',
					size: new google.maps.Size(30, 46),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(-13, -5)
				},
				title: 'Татарка'
			});

			var marker3 = new google.maps.Marker({
				position: loc3,
				map: map3,
				icon: {
					url: '/img/content/pin.svg',
					size: new google.maps.Size(30, 46),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(-13, -5)
				},
				title: 'Печерск'
			});
		}
	})();

	//tabs
	(function () {
		var tabs = $('.js-tabs-for');
		if (tabs.length) {
			$(window).resize(function () {
				tabs.css({height: 'auto'});
			});
			var tabsItem = tabs.children(),
				tabsButton = $('.js-tabs-nav').children(),
				currentHeight;

			currentHeight = tabsItem.outerHeight();
			tabs.css({height: currentHeight});

			tabsButton.on('click', function () {
				var index = $(this).index(),
					tabsHeight = 0;
				tabsButton.removeClass('is-active');
				$(this).addClass('is-active');
				tabsItem.fadeOut('fast').promise().done(function () {
					tabsHeight = tabsItem.eq(index).outerHeight();
					tabs.css({height: tabsHeight});
					tabsItem.eq(index).fadeIn('fast');
				});
			});
		}
	})();

	(function () {
		var scrollBtn = $('.js-scroll-btn'),
			screenSlider = $('.js-screen-slider'),
			sliderVideo = screenSlider.find('video');
		playBtn = $('.js-play');

		playBtn.on('click', function () {
			$("html, body").animate({scrollTop: $(this).closest('.screen__item').offset().top}, 1500);
			$(this).closest('.screen__item').find(sliderVideo).addClass('is-active').get(0).play();
			$(this).closest(screenSlider).addClass('is-video');
			scrollBtn.addClass('is-video');
		});

		sliderVideo.on('click', function () {
			$(this).removeClass('is-active').get(0).pause();
			$(this).closest(screenSlider).removeClass('is-video');
			scrollBtn.removeClass('is-video');
		});

		scrollBtn.click(function (e) {
			e.preventDefault();
			$("html, body").animate({scrollTop: $($(this).data('href')).offset().top}, 1500);
		});

		screenSlider.on('init', function (slick) {
			setTimeout(function () {
				TweenMax.to($('.screen__play .icon'), 1, {opacity: 1, transform: 'translateX(0)', delay: 0.5});
				TweenMax.to($('.screen__play-text, .screen__scroll-text'), 1, {
					opacity: 1,
					transform: 'translateY(0)',
					delay: 0.5
				});
				TweenMax.to($('.screen__scroll-line'), 1, {
					opacity: 1, transform: 'translateY(0)', delay: 0.5, ease: Power1.easeInOut, onComplete: function () {
						$(this.target[0]).addClass('is-animated');
					}
				});
			}, 1000);
		});

		initSlickSlider(screenSlider);

		screenSlider.append('<div class="screen__dots"><div class="screen__dots-item" data-count="2">02</div><div class="screen__dots-item" data-count="3">03</div></div>');

		$(document).on('click', '.screen__dots-item', function (e) {
			e.preventDefault();
			screenSlider.slick('slickGoTo', ($(this).attr('data-count') - 1));
		});

		screenSlider.on('afterChange', function (event, slick, currentSlide) {
			var currentIndex = 0;
			if (currentSlide + 3 == screenSlider.children().length) {
				currentIndex = -2;
				$(this).find('.screen__dots-item').eq(1).attr('data-count', currentIndex + 3).html('0' + +(currentIndex + 3));
			} else if (currentSlide + 2 == screenSlider.children().length) {
				currentIndex = -1;
				$(this).find('.screen__dots-item').eq(1).attr('data-count', currentIndex + 3).html('0' + +(currentIndex + 3));
			} else {
				$(this).find('.screen__dots-item').eq(1).attr('data-count', currentIndex + 3).html('0' + +(currentIndex + 3));
			}

			if (currentSlide + 2 == screenSlider.children().length) {
				currentIndex = -1;
			} else {
				currentIndex = currentSlide;
			}
			$(this).find('.screen__dots-item').eq(0).attr('data-count', currentIndex + 2).html('0' + +(currentIndex + 2));
		});

		function initSlickSlider(slider) {
			slider.slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				cssEase: 'ease-in-out',
				speed: 750,
				prevArrow: '<button type="button" class="screen__prev"><svg class="icon icon-arrow-left"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-left"></use></svg></button>',
				nextArrow: '<button type="button" class="screen__next"><svg class="icon icon-arrow-right"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-right"></use></svg></button>'
			});
		}
	})();

	(function () {
		var innoDescItem = $('.js-inno-desc'),
			innoDescTitle = innoDescItem.find('.inno__desc-title'),
			innoItem = innoDescItem.closest('.inno__item'),
			innoVideo = innoItem.find('video'),
			timer,
			timerDelay = 150;

		innoDescTitle.on('mouseenter', function () {
			var _this = $(this),
				_thisVideo = _this.closest(innoItem).find(innoVideo);
			timer = setTimeout(function () {
				_this.closest(innoItem).toggleClass('is-active');
				_this.find('.icon').toggleClass('is-active');
				if (_thisVideo.length) {
					if (_thisVideo.get(0).paused) {
						_thisVideo.get(0).play();
					} else {
						_thisVideo.get(0).pause();
					}
				}
			}, timerDelay);
			_this.on('mouseleave', function () {
				clearTimeout(timer);
			});
		});
	})();

});