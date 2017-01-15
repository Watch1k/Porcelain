/* Common JS */
$(document).ready(function () {

	(function () {
		var main = $('.js-main'),
			mainChild = main.children();

		mainChild.each(function () {
			var $this = $(this);

				$this.css({
					position: 'relative',
					'z-index': 1
				})
					.prepend('<div class="line-vertical line-vertical_left"></div>')
					.prepend('<div class="line-vertical line-vertical_mid"></div>')
					.prepend('<div class="line-vertical line-vertical_right"></div>');
		});

		if (mainChild.length == 1) {
			mainChild.find('.line-vertical')
				.css({
					'min-height': '100vh'
			});
		}

		if ($('.screen').length) {
			$('.screen').find('.line-vertical_mid').remove();
		}
	})();

	$(window).on('load', function () {
		setTimeout(function () {
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
					var $thisAnimation = this.animation;
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
					this.animation.autoHeight = this.$el.attr('data-auto-height') || false;

					if ($(window).width() < 768) {
						if (this.animation.motion == 'motion1') {
							this.animation.motion = 'motion3';
							this.animation.bgColor = '';
						}
					}

					switch (this.animation.motion) {
						case 'motion1':
							if ($(window).width() > 1279) {
								this.animation.advancedWidth = this.$el.attr('data-advanced-width') || 0;
							} else {
								this.animation.advancedWidth = 0;
							}
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
											ease: Power3.easeInOut,
											onComplete: function () {
												TweenMax.set($(this.target), {
													height: '100%',
													width: 'calc(100% + ' + $(this.target).parent().get(0).advancedWidth + 'px)'
												});
												TweenMax.set($(this.target).children(), {
													height: '100%',
													width: '100%'
												});
											}
										});
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
											ease: Power3.easeInOut,
											onComplete: function () {
												$(this.target).css({
													height: '100%',
													width: '100%'
												});
												$(this.target).children().first().css({
													height: '100%',
													width: '100%'
												});
												$(this.target).children().last().css({
													height: '100%',
													width: '100%'
												});
											}
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
					this.element = el.hasClass('js-motion') ? el : el.find('.js-motion');
				};
				sceneEl.each(function () {
					var sceneModule = new SceneModule($(this));

					sceneModule.container.controller = new ScrollMagic.Controller();

					sceneModule.element.each(function () {
						var sceneItem = $(this).hasClass('js-scene') ? this : $(this).get(0).closest('.js-scene');
						var sceneOffset = $(this).hasClass('js-scene') ? $(this).attr('data-offset') / 100 * $(window).height() : $(this).closest('.js-scene').attr('data-offset') / 100 * $(window).height();

						sceneModule.container.scene = new ScrollMagic.Scene({
							triggerElement: sceneItem,
							offset: sceneOffset
						})
							.setTween(this.animation.tweenAnimation)
							.addTo(sceneModule.container.controller);

						sceneModule.container.scene.on('start', function () {
							this.remove();
						});
					});
				});
			})();
		}, 1500);
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

		if (mapWrap.length) {

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
						url: 'img/content/pin.svg',
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
						url: 'img/content/pin.svg',
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
						url: 'img/content/pin.svg',
						size: new google.maps.Size(30, 46),
						origin: new google.maps.Point(0, 0),
						anchor: new google.maps.Point(-13, -5)
					},
					title: 'Печерск'
				});
			}
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
				tabsItem.filter(':visible').fadeOut('fast', function () {
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
			sliderWrap = $('.screen__slider'),
			sliderVideo = sliderWrap.find('video'),
			playBtn = $('.js-play');

		playBtn.on('click', function () {
			$("html, body").animate({scrollTop: $(this).closest('.screen__item').offset().top}, 750);
			$(this).closest('.screen__item').find(sliderVideo).addClass('is-active').get(0).play();
			$(this).closest(sliderWrap).addClass('is-video');
			scrollBtn.addClass('is-video');
		});

		sliderVideo.on('click', function () {
			$(this).removeClass('is-active').get(0).pause();
			$(this).closest(sliderWrap).removeClass('is-video');
			scrollBtn.removeClass('is-video');
		});

		scrollBtn.click(function (e) {
			e.preventDefault();
			$("html, body").animate({scrollTop: $($(this).data('href')).offset().top}, 750);
		});

		if (screenSlider.length) {
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
				}, 2750);
			});
		} else {
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
			}, 2750);
		}

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
				nextArrow: '<button type="button" class="screen__next"><svg class="icon icon-arrow-right"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-right"></use></svg></button>',
				responsive: [
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							prevArrow: '<button type="button" class="screen__prev"><svg class="icon icon-arrow-slider"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-slider"></use></svg></button>',
							nextArrow: '<button type="button" class="screen__next"><svg class="icon icon-arrow-slider"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-slider"></use></svg></button>'
						}
					}
				]
			});
		}

	})();

	(function () {
		var whySlider = $('.js-why-slider'),
			serviceSlider = $('.js-service-slider');

		toggleWhySlider(1280, whySlider);
		toggleServiceSlider(768, serviceSlider);
		$(window).resize(function () {
			toggleWhySlider(1280, whySlider);
			toggleServiceSlider(768, serviceSlider);
		});

		function toggleWhySlider(breakpoint, slider) {
			if ($(window).width() < breakpoint) {
				if (!slider.hasClass('slick-initialized')) {
					initWhySlider(slider);
				}
			} else {
				if (slider.hasClass('slick-initialized')) {
					slider.slick('unslick');
				}
			}
		}

		function initWhySlider(slider) {
			slider.slick({
				slidesToShow: 3,
				slidesToScroll: 1,
				infinite: true,
				cssEase: 'ease-in-out',
				speed: 750,
				prevArrow: '<button type="button" class="why__prev"><svg class="icon icon-arrow-slider"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-slider"></use></svg></button>',
				nextArrow: '<button type="button" class="why__next"><svg class="icon icon-arrow-slider"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-slider"></use></svg></button>',
				responsive: [
					{
						breakpoint: 768,
						settings: 'unslick'
					}
				]
			});
		}

		function toggleServiceSlider(breakpoint, slider) {
			if ($(window).width() < breakpoint) {
				if (!slider.hasClass('slick-initialized')) {
					initServiceSlider(slider);
				}
			} else {
				if (slider.hasClass('slick-initialized')) {
					slider.slick('unslick');
				}
			}
		}

		function initServiceSlider(slider) {
			slider.slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				cssEase: 'ease-in-out',
				speed: 750,
				prevArrow: '<button type="button" class="service__prev"><svg class="icon icon-arrow-slider"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-slider"></use></svg></button>',
				nextArrow: '<button type="button" class="service__next"><svg class="icon icon-arrow-slider"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-slider"></use></svg></button>'
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

		if ($(window).width() > 767) {
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
		} else {
			innoDescTitle.on('click', function () {
				var _this = $(this),
					_thisVideo = _this.closest(innoItem).find(innoVideo);

				_this.closest(innoItem).toggleClass('is-active');
				_this.find('.icon').toggleClass('is-active');
				if (_thisVideo.length) {
					if (_thisVideo.get(0).paused) {
						_thisVideo.get(0).play();
					} else {
						_thisVideo.get(0).pause();
					}
				}
			});
		}

	})();

	(function () {
		var hamburger = $('.js-hamburger'),
			nav = $('.js-nav'),
			speedNav = 1.5;

		hamburger.on('click', function () {
			var _this = $(this);

			$('body').toggleClass('is-overflow');

			if (!_this.hasClass('is-active')) {
				_this.addClass('is-active');
				animateNav();
			} else {
				_this.removeClass('is-active');
				animateNav();
			}
			function animateNav() {
				var navTl = new TimelineMax(),
					navHeight = $(window).height() - 38;

				if ($(window).width() < 768) {
					navHeight = 540 - 38;
				} else {
					navHeight = $(window).height() - 38;
				}
				$(window).on('resize', function () {
					if ($(window).width() < 768) {
						navHeight = 540 - 38;
					} else {
						navHeight = $(window).height() - 38;
					}
				});

				$('<div class="nav-anime"></div>').insertAfter(_this);
				_this.siblings('.nav-anime').css({
					position: 'absolute',
					'z-index': 102,
					top: -14,
					left: 0,
					right: 0,
					height: navHeight,
					'background-color': '#a70a3f'
				});
				navTl.fromTo(_this.siblings('.nav-anime'), speedNav, {
					x: '-100%'
				}, {
					x: '100%',
					ease: Power3.easeInOut,
					onComplete: function () {
						$(this.target).remove();
					}
				})
					.set(nav, {
						onComplete: function () {
							$(this.target).toggleClass('is-active');
						}
					}, (speedNav / 2));
			}
		})
	})();

	(function () {

		if ($(window).width() < 768) {
			(function () {
				if ($('.service__item_title').length) {
					var _el = $('.service__item_title'),
						_str = _el.find('p').text();

					_str = _str.replace(/ в деталях/g, '');
					_el.find('p').text(_str);
				}
			})();
		}

	})();

	(function () {

		var mapSvg = $('.js-map-svg'),
			mapPath = mapSvg.find('path'),
			navFor = $('.js-nav-for'),
			navForItem = navFor.children(),
			navList = $('.js-nav-list'),
			navListItem = navList.find('.js-doctor-slider'),
			navListEl = navList.find('.doctor'),
			doctorSlider = $('.js-doctor-slider'),
			indInit = false;

		doctorSlider.each(function () {
			initDoctorSlider($(this));
		});

		var doctorMapController = new ScrollMagic.Controller(),
			tweenTimeline = new TimelineMax();

		tweenTimeline
			.staggerFromTo('.js-doctor-slider.is-active .slick-slide', 1, {
				y: -30,
				alpha: 0
			}, {
				y: 0,
				alpha: 1,
				ease: Power1.easeInOut,
				delay: 1
			}, 0.15);

		doctorMapController.scene = new ScrollMagic.Scene({
			triggerElement: '.js-doctor-slider.is-active',
			offset: $(window).height() * 3 / (-5)
		})
			.setTween(tweenTimeline)
			.addTo(doctorMapController);

		doctorMapController.scene.on('start', function () {
			this.remove();
		});

		navForItem.on('click', function () {
			if ($(this).hasClass('is-active')) return false;

			mapPath.removeClass('is-active');

			var doctorClone = $('.js-doctor-clone');

			if (doctorClone.length) {
				var doctorCloneItem = doctorClone.find('.slick-slide'),
					doctorTl = new TimelineMax();
				doctorTl
					.staggerFromTo(doctorCloneItem, 1, {
						y: 0,
						alpha: 1
					}, {
						y: 30,
						alpha: 0,
						ease: Power1.easeInOut
					}, 0.15)
					.set(doctorClone, {
						onComplete: function () {
							doctorClone.remove();
						}
					});
			}

			var _this = $(this),
				_thisIndex = _this.index(),
				_thisDataCountry = _this.attr('data-country'),
				_thisCountryList = _thisDataCountry.split(' '),
				_thisDataMapPosition = _this.attr('data-map-position'),
				_thisMapPosition = _thisDataMapPosition.split(' ');

			if (indInit) {
				var tweenEl1 = navListItem.filter('.is-active').find('.slick-slide');

				TweenMax.staggerFromTo(tweenEl1, 1, {
					y: 0,
					alpha: 1
				}, {
					y: 30,
					alpha: 0,
					ease: Power1.easeInOut
				}, 0.15);

				navListItem.removeClass('is-active').eq(_thisIndex).addClass('is-active');

				var tweenEl2 = navListItem.filter('.is-active').find('.slick-slide');

				TweenMax.staggerFromTo(tweenEl2, 1, {
					y: -30,
					alpha: 0
				}, {
					y: 0,
					alpha: 1,
					delay: 0.75,
					ease: Power1.easeInOut
				}, 0.15);
			}

			_this.siblings().removeClass('is-active');
			_this.addClass('is-active');

			mapSvg.children().removeClass('is-current');
			mapSvg.nextAll().filter('.skill__map-mark').remove();

			TweenMax.to(mapSvg, 1, {
					x: _thisMapPosition[0] + '%',
					y: _thisMapPosition[1] + '%',
					ease: Power1.easeInOut,
					onComplete: function () {
						var _itemCounter = 0;
						for (var i = 0; i < _thisCountryList.length; i++) {
							mapSvg.find('#' + _thisCountryList[i]).addClass('is-current');

							var _thisCountry = mapSvg.find('#' + _thisCountryList[i]),
								_thisCountryOffset = _thisCountry.offset(),
								_thisParentOffset = _thisCountry.parent().offset(),
								_thisMarkPositionX = _thisCountryOffset.left - _thisParentOffset.left,
								_thisMarkPositionY = _thisCountryOffset.top - _thisParentOffset.top;

							_thisMarkPositionX += 2 * mapSvg.width() * _thisMapPosition[0] / 100 + _thisCountry[0].getBBox().width;
							_thisMarkPositionY += 2 * mapSvg.height() * _thisMapPosition[1] / 100 + _thisCountry[0].getBBox().height;

							navListItem.eq(_thisIndex).find(navListEl).each(function () {
								var _el = $(this),
									_elDomen = _el.find('.js-doctor-domen').text(),
									_elCountry = _el.find('.js-doctor-country').text(),
									_elCity = _el.find('.js-doctor-city').text(),
									_elDataPosition = _el.find('.js-doctor-position').text(),
									_elPosition = _elDataPosition.split(' ');

								if (_elDomen == _thisCountryList[i]) {
									if ($('.js-map-mark').filter('[data-city="' + _elCity + '"]').length) {
										_el.attr('data-counter', $('.js-map-mark').filter('[data-city="' + _elCity + '"]').attr('data-counter')).attr('data-city', _elCity).attr('data-domen', _elDomen);
									} else {
										$('' +
											'<div class="skill__map-mark js-map-mark">' +
											'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 16">' +
											'<path d="M0,16V0H13Z"/>' +
											'</svg>' +
											'<div class="skill__map-mark-tooltip">' +
											'<div class="skill__map-mark-tooltip-inner">' + _elCity + ', ' + _elCountry + '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 16"><path d="M0,16V0H13Z"/></svg>' +
											'</div>' +
											'</div>' +
											'</div>').insertAfter(mapSvg);
										if ($(window).width() < 1280) {
											var n = 4;
										} else {
											n = 2
										}
										mapSvg.next().css({
											left: (_thisMarkPositionX + +_elPosition[0]) / n,
											top: (_thisMarkPositionY + +_elPosition[1]) / n,
											width: mapSvg.next().children().last().children().outerWidth(),
											height: mapSvg.next().children().last().children().outerHeight(),
											opacity: 0
										}).children().last().css({
											width: 0,
											height: mapSvg.next().children().last().children().outerHeight()
										});

										TweenMax.to(mapSvg.next(), 1, {
											opacity: 1,
											ease: Power3.easeInOut
										});

										mapSvg.next().attr('data-counter', _itemCounter).attr('data-city', _elCity);
										_el.attr('data-counter', _itemCounter).attr('data-city', _elCity).attr('data-domen', _elDomen);
										_itemCounter++;
									}
								}
							});
						}
					}
				}
			);
			indInit = true;
		});

		navForItem.eq(0).trigger('click');

		mapPath.on('click', function () {
			var _thisPath = $(this),
				_sliderArray = [];

			if (_thisPath.hasClass('is-current')) {
				if (!_thisPath.hasClass('is-active')) {
					var doctorClone = $('.js-doctor-clone');

					if (doctorClone.length) {
						var doctorCloneItem = doctorClone.find('.slick-slide'),
							doctorTl = new TimelineMax();
						doctorTl
							.staggerFromTo(doctorCloneItem, 1, {
								y: 0,
								alpha: 1
							}, {
								y: 30,
								alpha: 0,
								ease: Power1.easeInOut
							}, 0.15)
							.set(doctorClone, {
								onComplete: function () {
									doctorClone.remove();
								}
							});
					}

					var _hideEl = mapSvg.parent().find('.js-map-mark').filter('.is-active');

					_hideEl.removeClass('is-active').parent().removeClass('is-active');
					TweenMax.set(_hideEl.children().last().children().children(), {
						y: '-100%',
						ease: Power1.easeInOut,
						onComplete: function () {
							TweenMax.to($(this.target).parent().parent(), 1, {
								overflow: 'hidden',
								width: 0,
								ease: Power1.easeInOut
							});
						}
					});

					mapPath.removeClass('is-active');
					_thisPath.addClass('is-active');
					navForItem.removeClass('is-active');

					navList.append('<div class="skill__top-nav-list-item js-doctor-slider"></div>');
					var tempSlider = $('.js-doctor-slider').last().addClass('js-doctor-clone is-active');

					navListEl.filter('[data-domen="' + _thisPath.attr('id') + '"]').each(function () {
						_sliderArray.push($(this).html());
					});

					for (var i = 0; i < _sliderArray.length; i++) {
						tempSlider.append('<div class="skill__top-nav-list-inner doctor"></div>');
						tempSlider.find('.doctor').last().append(_sliderArray[i]);
					}

					initDoctorSlider(tempSlider);

					var tweenEl1 = navListItem.filter('.is-active').find('.slick-slide');

					TweenMax.staggerFromTo(tweenEl1, 1, {
						y: 0,
						alpha: 1
					}, {
						y: 30,
						alpha: 0,
						ease: Power1.easeInOut
					}, 0.15);

					navListItem.removeClass('is-active').last().next().addClass('is-active');

					var tweenEl2 = tempSlider.find('.slick-slide');

					TweenMax.staggerFromTo(tweenEl2, 1, {
						y: -30,
						alpha: 0
					}, {
						y: 0,
						alpha: 1,
						delay: 0.75,
						ease: Power1.easeInOut
					}, 0.15);
				}
			}
		});

		if (doctorSlider.length) {
			$(document).on('click', '.js-map-mark', function () {
				var _thisMark = $(this),
					_sliderArray = [];

				navForItem.removeClass('is-active');
				mapPath.removeClass('is-active');

				var doctorClone = $('.js-doctor-clone');

				if (doctorClone.length) {
					var doctorCloneItem = doctorClone.find('.slick-slide'),
						doctorTl = new TimelineMax();
					doctorTl
						.staggerFromTo(doctorCloneItem, 1, {
							y: 0,
							alpha: 1
						}, {
							y: 30,
							alpha: 0,
							ease: Power1.easeInOut
						}, 0.15)
						.set(doctorClone, {
							onComplete: function () {
								doctorClone.remove();
							}
						});
				}

				if (!_thisMark.hasClass('is-active')) {
					var _hideEl = mapSvg.parent().find('.js-map-mark').filter('.is-active');

					_hideEl.removeClass('is-active').parent().removeClass('is-active');
					TweenMax.set(_hideEl.children().last().children().children(), {
						y: '-100%',
						ease: Power1.easeInOut,
						onComplete: function () {
							TweenMax.to($(this.target).parent().parent(), 1, {
								overflow: 'hidden',
								width: 0,
								ease: Power1.easeInOut
							});
						}
					});

					_thisMark.addClass('is-active').parent().addClass('is-active');
					TweenMax.to(_thisMark.children().last(), 1, {
						width: _thisMark.children().last().children().outerWidth(),
						ease: Power1.easeInOut,
						onComplete: function () {
							TweenMax.set($(this.target), {
								overflow: 'visible'
							});
							TweenMax.to($(this.target).children().children(), 0.5, {
								y: '0%',
								ease: Power1.easeInOut
							});
						}
					});
				}

				navList.append('<div class="skill__top-nav-list-item js-doctor-slider"></div>');
				var tempSlider = $('.js-doctor-slider').last().addClass('js-doctor-clone is-active');

				navListEl.filter('[data-city="' + _thisMark.attr('data-city') + '"]').each(function () {
					_sliderArray.push($(this).html());
				});

				for (var i = 0; i < _sliderArray.length; i++) {
					tempSlider.append('<div class="skill__top-nav-list-inner doctor"></div>');
					tempSlider.find('.doctor').last().append(_sliderArray[i]);
				}

				initDoctorSlider(tempSlider);

				var tweenEl1 = navListItem.filter('.is-active').find('.slick-slide');

				TweenMax.staggerFromTo(tweenEl1, 1, {
					y: 0,
					alpha: 1
				}, {
					y: 30,
					alpha: 0,
					ease: Power1.easeInOut
				}, 0.15);

				navListItem.removeClass('is-active').last().next().addClass('is-active');

				var tweenEl2 = tempSlider.find('.slick-slide');

				TweenMax.staggerFromTo(tweenEl2, 1, {
					y: -30,
					alpha: 0
				}, {
					y: 0,
					alpha: 1,
					delay: 0.75,
					ease: Power1.easeInOut
				}, 0.15);
			});
		}

		function initDoctorSlider(slider) {
			slider.slick({
				variableWidth: true,
				slidesToScroll: 1,
				cssEase: 'ease-in-out',
				speed: 750,
				infinite: false,
				prevArrow: '<button type="button" class="skill__prev"><svg class="icon icon-arrow-left"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-left"></use></svg></button>',
				nextArrow: '<button type="button" class="skill__next"><svg class="icon icon-arrow-right"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-right"></use></svg></button>',
				responsive: [
					{
						breakpoint: 768,
						settings: {
							prevArrow: '<button type="button" class="skill__prev"><svg class="icon icon-arrow-slider"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-slider"></use></svg></button>',
							nextArrow: '<button type="button" class="skill__next"><svg class="icon icon-arrow-slider"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-slider"></use></svg></button>'
						}
					}
				]
			});
		}

	})();

});