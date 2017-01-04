/* Common JS */
$(document).ready(function () {

	(function () {
		var main = $('.js-main');

		main.children().each(function () {
			var $this = $(this);

			$this.css({
				position: 'relative',
				'z-index': 1
			})
				.prepend('<div class="line-vertical line-vertical_left"></div>')
				.prepend('<div class="line-vertical line-vertical_mid"></div>')
				.prepend('<div class="line-vertical line-vertical_right"></div>');
		});

		if ($('.screen').length) {
			$('.screen').find('.line-vertical_mid').remove();
		}
	})();

	$(window).on('load', function () {
		$('body').addClass('is-loaded');
		TweenMax.staggerTo($('.header .nav__item'), 1, {opacity: 1, transform: 'translateY(0)', delay: 0.5}, 0.1);

		(function () {
			var footerController = new ScrollMagic.Controller(),
				tween = new TimelineMax();

			tween
				.from('.footer', 1, {
					alpha: 0,
					y: 40,
					ease: Power1.easeInOut
				}, 0)
				.staggerFrom($('.footer .nav__item'), 1, {
					alpha: 0,
					y: -10,
					delay: 0.5
				}, 0.1, 0)
				.staggerFrom($('.footer .socials__item'), 1, {
					alpha: 0,
					y: -15,
					delay: 0.5
				}, 0.15, 0)
				.from($('.footer__bot'), 1, {
					alpha: 0,
					y: 40,
					ease: Power1.easeInOut
				}, 0);

			footerController.scene = new ScrollMagic.Scene({
				triggerElement: '.footer',
				offset: $(window).height() * 3 / (-5)
			})
				.setTween(tween)
				.addTo(footerController);

			footerController.scene.on('start', function () {
				this.remove();
			});
		})();

		(function () {
			var motionEl = $('.js-motion'),
				sceneEl = $('.js-scene');

			var Animation = function () {
				this.motion = false;
				this.mainDelay = 0;
				this.speedAlpha = 1;
				this.speedLine = 0.5;
				this.speedRect = 0.65;
				this.moveDown = 0;
				this.moveDelay = 0;
				this.moveDownSpeed = 0;
				this.moveUp = 0;
				this.moveUpSpeed = 1.5;
				this.offset = 0;
			};

			motionEl.each(function () {
				this.animation = new Animation();
				this.$el = $(this);
				this.animation.motion = this.$el.attr('data-motion') || this.animation.motion;
				this.animation.mainDelay = +this.$el.attr('data-main-delay') || +this.animation.mainDelay;
				this.animation.speedAlpha = this.$el.attr('data-speed-alpha') || this.animation.speedAlpha;
				this.animation.speedLine = this.$el.attr('data-speed-line') || this.animation.speedLine;
				this.animation.speedRect = this.$el.attr('data-speed-rect') || this.animation.speedRect;
				this.animation.moveDelay = this.$el.attr('data-move-delay') || this.animation.moveDelay;
				this.animation.moveDownSpeed = this.$el.attr('data-move-down-speed') || this.animation.moveDownSpeed;
				this.animation.moveUp = this.$el.attr('data-move-up') || this.animation.moveUp;
				this.animation.moveDown = this.$el.attr('data-move-down') || this.animation.moveUp;
				this.animation.moveUpSpeed = this.$el.attr('data-move-up-speed') || this.animation.moveUpSpeed;
				this.animation.width = this.$el.outerWidth();
				this.animation.height = this.$el.outerHeight();
				this.animation.bgColor = this.$el.css('backgroundColor');
				this.animation.offset = +this.$el.closest(sceneEl).attr('data-offset') || this.animation.offset;

				this.animation.offset = this.animation.offset / 100 * $(window).height();

				switch (this.animation.motion) {
					case 'motion1':
						this.animation.autoHeight = this.$el.attr('data-auto-height') || false;
						this.animation.advancedWidth = this.$el.attr('data-advanced-width') || 0;
						this.animation.width = +this.animation.width + +this.animation.advancedWidth;
						this.$el
							.css({
								'background-color': 'transparent'
							})
							.wrapInner('<div class="motion__inner"></div>')
							.wrapInner('<div class="motion"></div>')
							.find('.motion')
							.css({
								'background-color': this.animation.bgColor
							})
							.children()
							.css({
								width: this.animation.width + 'px',
								height: this.animation.height + 'px'
							});

						this.animation.tweenAnimation = new TimelineMax();

						this.animation.tweenAnimation
							.addLabel('start', 0.01)
							.set(this.$el.children(), {
								width: 20
							})
							.fromTo(this.$el.children(), this.animation.speedLine, {
								height: 0
							}, {
								height: this.animation.height,
								ease: Power3.easeInOut,
								delay: this.animation.mainDelay,
								onComplete: function () {
									TweenMax.to($(this.target), $(this.target).parent().get(0).animation.speedRect, {
										width: $(this.target).parent().get(0).animation.width,
										ease: Power3.easeInOut
									});
									if ($(this.target).parent().get(0).animation.autoHeight) {
										TweenMax.set($(this.target), {
											height: 'auto'
										});
										TweenMax.set($(this.target).children(), {
											height: 'auto'
										});
									}
								}
							}, 'start')
							.set(this.$el.children(), {
								y: this.animation.moveDown
							}, 'start')
							.fromTo(this.$el.children(), this.animation.moveDownSpeed, {
								y: this.animation.moveDown
							}, {
								y: this.animation.moveUp,
								ease: Power3.easeInOut,
								onComplete: function () {
									TweenMax.fromTo($(this.target), $(this.target).parent().get(0).animation.moveUpSpeed, {
										y: $(this.target).parent().get(0).animation.moveUp
									}, {
										y: 0,
										ease: Power3.easeInOut
									});
								}
							}, 'start+=' + (+this.animation.moveDelay + +this.animation.mainDelay));
						break;
					case 'motion2':
						this.$el
							.wrapInner('<div class="motion__inner"></div>')
							.wrapInner('<div class="motion"></div>');

						this.animation.tweenAnimation = new TimelineMax();

						this.animation.tweenAnimation
							.addLabel('start', 0.01)
							.fromTo(this.$el.children(), this.animation.speedAlpha, {
								alpha: 0
							}, {
								alpha: 1,
								ease: Power3.easeInOut,
								delay: this.animation.mainDelay
							}, 'start')
							.fromTo(this.$el.children(), this.animation.moveDownSpeed, {
								y: this.animation.moveDown
							}, {
								y: this.animation.moveUp,
								ease: Power3.easeInOut,
								onComplete: function () {
									TweenMax.fromTo($(this.target), $(this.target).parent().get(0).animation.moveUpSpeed, {
										y: $(this.target).parent().get(0).animation.moveUp
									}, {
										y: 0,
										ease: Power3.easeInOut
									});
								}
							}, 'start+=' + (+this.animation.moveDelay + +this.animation.mainDelay));
						break;
					case 'motion3':
						this.$el
							.wrapInner('<div class="motion__inner"></div>')
							.append('<div class="motion__element"></div>')
							.wrapInner('<div class="motion"></div>')
							.find('.motion')
							.children()
							.css({
								width: this.animation.width + 'px',
								height: this.animation.height + 'px'
							})
							.last()
							.css({
								'margin-left': '20px'
							});

						if (this.$el.find('video').length) {
							this.$el.find('video').get(0).play();
						}

						this.animation.tweenAnimation = new TimelineMax();

						this.animation.tweenAnimation
							.addLabel('start', 0.01)
							.set(this.$el.children().children().first(), {
								alpha: 0
							})
							.set(this.$el.children().children().last(), {
								x: '-100%'
							})
							.fromTo(this.$el.children().children().last(), this.animation.speedLine, {
								y: '-100%'
							}, {
								y: '0%',
								ease: Power3.easeInOut,
								delay: this.animation.mainDelay,
								onComplete: function () {
									TweenMax.to($(this.target), (2 * $(this.target).parent().parent().get(0).animation.speedRect), {
										x: '100%',
										ease: Power3.easeInOut
									});
								}
							}, 'start')
							.set(this.$el.children().children().first(), {
								alpha: 1
							}, (+this.animation.speedRect + +this.animation.speedLine + +this.animation.mainDelay + 0.001))
							.set(this.$el.children(), {
								y: this.animation.moveDown
							}, 0)
							.fromTo(this.$el.children(), this.animation.moveDownSpeed, {
								y: this.animation.moveDown
							}, {
								y: this.animation.moveUp,
								ease: Power3.easeInOut,
								onComplete: function () {
									TweenMax.fromTo($(this.target), $(this.target).parent().get(0).animation.moveUpSpeed, {
										y: $(this.target).parent().get(0).animation.moveUp
									}, {
										y: 0,
										ease: Power3.easeInOut
									});
								}
							}, 'start+=' + (+this.animation.moveDelay + +this.animation.mainDelay));
						if (this.$el.siblings('.js-inno-desc').length) {
							this.animation.tweenAnimation.fromTo(this.$el.next(), this.animation.moveDownSpeed, {
								y: this.animation.moveDown
							}, {
								y: this.animation.moveUp,
								ease: Power3.easeInOut,
								onComplete: function () {
									TweenMax.fromTo($(this.target), $(this.target).prev().get(0).animation.moveUpSpeed, {
										y: $(this.target).prev().get(0).animation.moveUp
									}, {
										y: 0,
										alpha: 1,
										ease: Power3.easeInOut,
										onComplete: function () {
											$(this.target).addClass('is-transition').css('transform', '');
										}
									});
								}
							}, 'start+=' + (+this.animation.moveDelay + +this.animation.mainDelay));
						}
						break;
					case 'motion4':
						this.$el
							.css({
								'background-color': 'transparent'
							})
							.wrapInner('<div class="motion__inner"></div>')
							.wrapInner('<div class="motion"></div>')
							.css({
								width: this.animation.width + 'px',
								height: this.animation.height + 'px'
							})
							.find('.motion')
							.css({
								position: 'absolute',
								top: 0,
								left: '50%',
								'background-color': this.animation.bgColor,
								width: '0%',
								height: this.animation.height + 'px'
							})
							.children()
							.css({
								position: 'absolute',
								top: 0,
								left: this.animation.width / 2 * (-1),
								width: this.animation.width + 'px',
								height: this.animation.height + 'px'
							});
						this.animation.tweenAnimation = new TimelineMax();
						this.animation.tweenAnimation
							.addLabel('start', 0.01)
							.to(this.$el.children(), this.animation.speedRect, {
								left: 0,
								width: '100%',
								ease: Power3.easeInOut
							}, 'start+=' + +this.animation.mainDelay)
							.to(this.$el.children().children(), this.animation.speedRect, {
								left: 0,
								ease: Power3.easeInOut
							}, 'start+=' + +this.animation.mainDelay);
					default:
						return true;
				}
			});

			var SceneModule = function (el) {
				this.container = el;
				this.element = el.find('.js-motion');
			};
			sceneEl.each(function () {
				var sceneModule = new SceneModule($(this));

				sceneModule.container.controller = new ScrollMagic.Controller();

				sceneModule.element.each(function () {
					sceneModule.container.scene = new ScrollMagic.Scene({
						triggerElement: this.closest('.js-scene'),
						offset: $(this).closest('.js-scene').attr('data-offset') / 100 * $(window).width()
					})
						.setTween(this.animation.tweenAnimation)
						.addTo(sceneModule.container.controller);

					sceneModule.container.scene.on('start', function () {
						this.remove();
					});
				});
			});
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
			sliderVideo = screenSlider.find('video'),
			playBtn = $('.js-play');

		playBtn.on('click', function () {
			$("html, body").animate({scrollTop: $(this).closest('.screen__item').offset().top}, 750);
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
			$("html, body").animate({scrollTop: $($(this).data('href')).offset().top}, 750);
		});

		screenSlider.on('init', function (slick) {
			setTimeout(function () {
				$('.screen__anime').addClass('is-loaded');
				TweenMax.to($('.screen__play .icon'), 1, {opacity: 1, delay: 0.5});
				TweenMax.to($('.screen__play-text, .screen__scroll-text'), 1, {
					opacity: 1,
					transform: 'translateY(0)',
					delay: 0.5
				});
				TweenMax.to($('.screen__scroll-line'), 1, {
					opacity: 1, transform: 'translateY(0)', delay: 0.5, ease: Power2.easeInOut, onComplete: function () {
						$(this.target[0]).addClass('is-animated');
					}
				});
			}, 1000);
		});

		for (var i = 0; i < screenSlider.children().length; i++) {
			screenSlider.children().eq(i).attr('data-count', i);
		}

		initSlickSlider(screenSlider);

		screenSlider.append('<div class="screen__dots"><div class="screen__dots-item" data-count="1">02</div><div class="screen__dots-item" data-count="2">03</div></div>');

		$(document).on('click', '.screen__dots-item', function (e) {
			e.preventDefault();
			screenSlider.slick('slickGoTo', $(this).attr('data-count'));
		});

		screenSlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
			'beforeChange';
			var currentIndex,
				nextIndex;

			currentIndex = nextSlide + 1;
			if (currentIndex == slick.$slides.length) {
				currentIndex = 0;
			}
			nextIndex = nextSlide + 2;
			if (nextIndex - 1 == slick.$slides.length) {
				nextIndex = 1;
			}
			if (nextIndex == slick.$slides.length) {
				nextIndex = 0;
			}

			$(this).find('.screen__dots-item').eq(0).attr('data-count', currentIndex).html('0' + (currentIndex + 1));
			$(this).find('.screen__dots-item').eq(1).attr('data-count', nextIndex).html('0' + (nextIndex + 1));
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
		var whySlider = $('.js-why-slider');

		toggleSlider(1280, whySlider);
		$(window).resize(function () {
			toggleSlider(1280, whySlider);
		});

		function toggleSlider(breakpoint, slider) {
			if ($(window).width() < breakpoint) {
				if (!slider.hasClass('slick-initialized')) {
					initSlickSlider(slider);
				}
			} else {
				if (slider.hasClass('slick-initialized')) {
					slider.slick('unslick');
				}
			}
		}

		function initSlickSlider(slider) {
			slider.slick({
				slidesToShow: 3,
				slidesToScroll: 1,
				infinite: true,
				cssEase: 'ease-in-out',
				speed: 750,
				prevArrow: '<button type="button" class="why__prev"><svg class="icon icon-arrow-slider"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-slider"></use></svg></button>',
				nextArrow: '<button type="button" class="why__next"><svg class="icon icon-arrow-slider"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-slider"></use></svg></button>'
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