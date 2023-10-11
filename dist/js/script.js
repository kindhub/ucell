(function () {
	'use strict';

	function VSwiper() {
		let prefix = "tmpl-hh__";
		let defaultParams = {
			containerModifierClass: prefix + 'swiper-container-',
			slideClass: prefix + 'swiper-slide',
			slideActiveClass: prefix + 'swiper-slide-active',
			slideDuplicateActiveClass: prefix + 'swiper-slide-duplicate-active',
			slideVisibleClass: prefix + 'swiper-slide-visible',
			slideDuplicateClass: prefix + 'swiper-slide-duplicate',
			slideNextClass: prefix + 'swiper-slide-next',
			slideDuplicateNextClass: prefix + 'swiper-slide-duplicate-next',
			slidePrevClass: prefix + 'swiper-slide-prev',
			slideDuplicatePrevClass: prefix + 'swiper-slide-duplicate-prev',
			slideBlankClass: prefix + 'swiper-slide-invisible-blank',
			wrapperClass: prefix + 'swiper-wrapper',
			navigation: {
				disabledClass: prefix + 'swiper-button-disabled',
				hiddenClass: prefix + 'swiper-button-hidden',
				lockClass: prefix + 'swiper-button-lock'
			},
			pagination: {
				bulletClass: prefix + 'swiper-pagination-bullet',
				bulletActiveClass: prefix + 'swiper-pagination-bullet-active',
				modifierClass: prefix + 'swiper-pagination-',
				currentClass: prefix + 'swiper-pagination-current',
				totalClass: prefix + 'swiper-pagination-total',
				hiddenClass: prefix + 'swiper-pagination-hidden',
				progressbarFillClass: prefix + 'swiper-pagination-progressbar-fill',
				clickableClass: prefix + 'swiper-pagination-clickable',
				lockClass: prefix + 'swiper-pagination-lock',
				progressbarOppositeClass: prefix + 'swiper-pagination-progressbar-opposite',
			},
			scrollbar: {
				lockClass: prefix + 'swiper-scrollbar-lock',
				dragClass: prefix + 'swiper-scrollbar-drag',
			}
		};

		this.init = function (el, slierParams) {
			if (!slierParams) slierParams = {};

			let defaultParamsKeys = Object.keys(defaultParams);

			for(let i = 0; i < defaultParamsKeys.length; i++){
				let index = defaultParamsKeys[i],
					param = defaultParams[index];

				if(!slierParams[index]){
					slierParams[index] = param;
				}else if(param instanceof Object){
					let paramKeys = Object.keys(param);

					for(let i2 = 0; i2 < paramKeys.length; i2++){
						let index2 = paramKeys[i2],
							param2 = param[index2];

						if(!slierParams[index][index2]){
							slierParams[index][index2] = param2;
						}
					}
				}
			}

			return new Swiper(el, slierParams);
		};
	}

	// import VacancyBtn from "./modules/VacancyBtn";

	let citySelector = {
		classes: {
			base: "tmpl-hh__vacancies-map-select",
			active: "tmpl-hh__vacancies-map-select--active",
			noBordered: "tmpl-hh__vacancies-map-select--noborder",
			option: "tmpl-hh__vacancies-map-select__option",
			slider: {
				container: "tmpl-hh__vacancies-map-select__slider-container",
				label: "tmpl-hh__vacancies-map-select__label",
				labelActive: "tmpl-hh__vacancies-map-select__label--active"
			}
		},
		select: null,
		label: null,
		slider: null,
		sliderHeight: null,
		animationDur: 400,
		init: function () {
			this.select = document.querySelector('.' + this.classes.base);
			this.label = document.querySelector('.' + this.classes.slider.label);

			this.initSlider();
			this.listenOptionClick();
			this.listenSliderLabelClick();
		},
		initSlider: function(){
			let container = document.querySelector('.' + this.classes.slider.container);

			this.sliderHeight = getComputedStyle(container)['height'];
			this.slider       = new VSwiper(container, {
				scrollbar: {
					el: '.' + this.classes.base + ' .swiper-scrollbar',
					draggable: true,
					hide: false
				},
				direction: 'vertical',
				slidesPerView: 'auto',
				preventClicks: false,
				mousewheel: true,
				freeMode: true,
				observer: true,
				observeParents: true
			});
		},
		sliderHide: function(){
			let __self = this;

			this.label.classList.remove(this.classes.slider.labelActive);
			this.select.classList.remove(this.classes.active);

			setTimeout(function () {
				__self.select.classList.add(__self.classes.noBordered);
			}, this.animationDur);
		},
		sliderShow: function(){
			this.select.classList.add(this.classes.active);
			this.select.classList.remove(this.classes.noBordered);
			this.label.classList.add(this.classes.slider.labelActive);
		},
		listenSliderLabelClick: function () {
			let __self = this;
			let closeBtn = document.getElementById("closeBtn");
			closeBtn.addEventListener('click', ()=> {
				__self.sliderHide();
			});
			this.label.addEventListener('click', function () {
				if(__self.select.classList.contains(__self.classes.active)){
					__self.sliderHide();
				}else{
					__self.sliderShow();
				}
			});
		},
		listenOptionClick: function () {
			let options = document.getElementsByClassName(this.classes.option),
				__self  = this;

			let goToVacancies = function () {
				document.querySelector('#tmpl-hh__vacancies-block').scrollIntoView({
					behavior: "smooth"
				});
			};
			
			for (let i = 0; i < options.length; i++){
				options[i].addEventListener('click', function () {
					__self.sliderHide();
					setTimeout(goToVacancies, __self.animationDur);
				});
			}
		}
	};

	function VacancyBtn() {
		let goToVacancies = function () {
			document.querySelector('#tmpl-hh__vacancies-block').scrollIntoView({
				behavior: "smooth"
			});
		};
		let listenClick = function () {
			let vacanciesBtns = document.getElementsByClassName('tmpl-hh__vacancy-btn');

			for (let i = 0; i < vacanciesBtns.length; i++) {
				vacanciesBtns[i].addEventListener('click', function (event) {
					event.preventDefault();
					goToVacancies();
				});
			}
		};
		let init = function () {
			listenClick();
		};

		init();
	}

	function Content(callback) {
		let classes = {
			tab: 'tmpl-hh__content-tab',
			swiperContainer: 'tmpl-hh__swiper-container',
			tabActive: 'tmpl-hh__content-tab--active',
			content: 'tmpl-hh__content',
			contentActive: 'tmpl-hh__content--active',
			contentOpacity1: 'tmpl-hh__content--opacity-1',
		};

		let contents,
			tabs,
			classPrefix = 'tmpl-hh__content__';

		let updateActiveSwipers = function () {
			let contents = document.getElementsByClassName(classes.contentActive);

			for (let i = 0; i < contents.length; i++) {
				let swipers = contents[i].getElementsByClassName(classes.swiperContainer);
				for (let i2 = 0; i2 < swipers.length; i2++) {
					if(swipers[i2].swiper){
						swipers[i2].swiper.update();
					}
				}
			}
		};
		let change = function (contentTag) {
			let contents = document.getElementsByClassName(classPrefix + contentTag);

			hideAll(contentTag);
			deactivateAllTabs();

			if(callback){
				callback(contentTag);
			}

			setTimeout(function () {
				show(contents);
				setTimeout(updateActiveSwipers, 50);
			}, 400);

			let activeTabSelector = '.' + classes.tab + '[href="#' + contentTag + '"]',
				activeTabs = document.querySelectorAll(activeTabSelector);

			for (let i = 0; i < activeTabs.length; i++) {
				activeTabs[i]
					.classList
					.add(classes.tabActive);
			}

			if (window.location.hash.substr(1) !== contentTag) {
				window.location.hash = '#' + contentTag;
			}
		};
		let hideAll = function (exceptTag) {
			let exceptClass = classPrefix + exceptTag;
			for (let i = 0; i < contents.length; i++) {
				let content = contents[i];

				if (!content.classList.contains(exceptClass)) {
					content.classList.remove(classes.contentOpacity1);
					setTimeout(function () {
						content.classList.remove(classes.contentActive);
					}, 400);
				}
			}
		};
		let show = function (contents) {
			if (typeof contents !== "object") {
				contents = [contents];
			}

			for (let i = 0; i < contents.length; i++) {
				let content = contents[i];
				window.scrollTo({
					top: 0,
					left: 0,
					behavior: 'smooth'
				});
				content.classList.add(classes.contentActive);
				setTimeout(function () {
					content.classList.add(classes.contentOpacity1);
				}, 50);
			}
		};
		let deactivateAllTabs = function () {
			for (let i = 0; i < tabs.length; i++) {
				tabs[i].classList.remove(classes.tabActive);
			}
		};
		let listenTabClick = function () {
			for (let i = 0; i < tabs.length; i++) {
				tabs[i].addEventListener('click', function () {
					let content = this.getAttribute('href').replace('#', '');
					change(content);
				});
			}
		};
		let getCurrentTab = function () {
			return tabs[0] && tabs[0].getAttribute('href')
				? tabs[0].getAttribute('href')
				: "";
		};
		let init = function () {
			contents = document.getElementsByClassName(classes.content);
			tabs = document.getElementsByClassName(classes.tab);
			let hash = window.location.hash;
			if (hash !== '' && hash !== getCurrentTab()) {
				setTimeout(change, 200, hash.substr(1));
			}

			listenTabClick();
		};

		init();
	}

	function Video() {
		let classes = {
			item: 'tmpl-hh__video',
			itemPlaying: 'tmpl-hh__video--playing',
		};

		let getVideoFrame = function (videoId, source) {
			let iframe = document.createElement('iframe');
				iframe.frameBorder = "0";
				iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
				iframe.allowFullscreen = "";

			switch (source) {
				case "vimeo":
					iframe.src = 'https://player.vimeo.com/video/' + videoId + '?autoplay=1';
					break;
				default:
					iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0&controls=1&showinfo=0';
			}

			return iframe;
		};
		let play = function (item) {
			if (item.classList.contains(classes.itemPlaying)) {
				return false;
			}

			let videoId = item.getAttribute('data-video-id'),
				source = item.getAttribute('data-video-source'),
				iframe = getVideoFrame(videoId, source);

			item.classList.add(classes.itemPlaying);
			item.appendChild(iframe);
		};
		let listenPlayClick = function () {
			let items = document.getElementsByClassName(classes.item);

			for (let i = 0; i < items.length; i++) {
				let item = items[i];

				item.addEventListener('click', function () {
					play(item);
				});
			}
		};
		let init = function () {
			listenPlayClick();
		};

		this.destroy = function (item) {
			item.classList.remove(classes.itemPlaying);
			item.removeChild(item.querySelector('iframe'));
		};

		init();
	}

	function Anchor() {
		let init = function () {
			let anchors = document.querySelectorAll('.tmpl-hh__anchor[href^="#"]');
			for (let i = 0; i < anchors.length; i++) {
				const anchor = anchors[i];
				anchor.addEventListener('click', function (e) {
					e.preventDefault();
					document.querySelector(anchor.getAttribute("href")).scrollIntoView({
						behavior: 'smooth',
						block: 'start',
						inline: 'start',
					});
				});
			}
		};

		init();
	}

	function closest(element, selector) {
		if (element.closest) {
			return element.closest(selector);
		}
		function closest(parentElement, selector) {
			if (!parentElement) return null;
			if (parentElement.matches(selector)) return parentElement;
			if (!parentElement.parentElement) return null;
			return closest(element.parentElement, selector);
		}

		return closest(element.parentElement, selector);
	}

	/*
	available options:
	onInit: Function
	onBeforeShow: Function
	onAfterShow: Function
	onBeforeHide: Function
	onAfterHide: Function
	*/
	function Modal(modalSelector, options) {
		let classes = {
			pageWrapper: 'tmpl-hh__wrapper',
			modal: 'tmpl-hh__modal',
			modalShow: 'tmpl-hh__modal--show',
			window: 'tmpl-hh__modal__window',
			closeBtn: 'tmpl-hh__modal__close-btn',
		};
		let modal;
		let onInit = function (){},
			onBeforeShow = function (){},
			onAfterShow = function (){},
			onBeforeHide = function (){},
			onAfterHide = function (){};

		let hide = function(){
			onBeforeHide();
			modal.classList.remove(classes.modalShow);
			onAfterHide();
		};
		let show = function(){
			onBeforeShow();
			modal.classList.add(classes.modalShow);
			onAfterShow();
		};
		let center = function (){
			let wrapperPos = document.querySelector('.' + classes.pageWrapper).offsetTop,
				modalWindow = modal.querySelector('.' + classes.window),
				modalWindowHeight = parseInt(getComputedStyle(modalWindow)['height']);

			modalWindow.style.top = (window.pageYOffset - wrapperPos + (window.innerHeight / 2 - modalWindowHeight / 2)) + "px";
		};
		let listenModalOutClick = function (){
			document.addEventListener('mousedown', function (event) {
				if (!event.target) return;
				if (!event.target.classList.contains(classes.window) && !closest(event.target, '.' + classes.window)) {
					hide();
				}
			});
		};
		let listenCloseBtnClick = function (){
			const closeBtn = modal.querySelector('.' + classes.closeBtn);
			if (!closeBtn) return;
			closeBtn.addEventListener('click', hide);
		};
		let init = function(){
			modal = document.querySelector(modalSelector);
			if (!modal) {
				console.error('Modal with selector ' + modalSelector + ' not found');
				return;
			}
			if (options !== undefined && options instanceof Object) {
				if (options.onInit !== undefined && options.onInit instanceof Function) {
					onInit = options.onInit;
				}
				if (options.onBeforeShow !== undefined && options.onBeforeShow instanceof Function) {
					onBeforeShow = options.onBeforeShow;
				}
				if (options.onAfterShow !== undefined && options.onAfterShow instanceof Function) {
					onAfterShow = options.onAfterShow;
				}
				if (options.onBeforeHide !== undefined && options.onBeforeHide instanceof Function) {
					onBeforeHide = options.onBeforeHide;
				}
				if (options.onAfterHide !== undefined && options.onAfterHide instanceof Function) {
					onAfterHide = options.onAfterHide;
				}
			}
			listenModalOutClick();
			listenCloseBtnClick();
			onInit();
		};

		this.hide = hide;
		this.show = function(){
			center();
			show();
		};

		init();
	}

	function Nav() {
		let nav, btn, opened = false;
		let classes = {
			nav: {
				base: 'tmpl-hh__nav',
				opened: 'tmpl-hh__nav--opened'
			},
			btn: {
				base: 'tmpl-hh__nav-btn',
				active: 'tmpl-hh__nav-btn--active',
				closed: 'tmpl-hh__nav-btn--closed'
			}
		};

		let close = function () {
			opened = false;
			nav.classList.remove(classes.nav.opened);
			btn.classList.remove(classes.btn.active);
			btn.classList.add(classes.btn.closed);
		};
		let open = function () {
			opened = true;
			nav.classList.add(classes.nav.opened);
			btn.classList.remove(classes.btn.closed);
			btn.classList.add(classes.btn.active);
		};
		let toggle = function () {
			if(opened){
				close();
			}else{
				open();
			}
		};
		let listenBtnClick = function () {
			btn.addEventListener('click', toggle);
		};
		let listenOutClick = function (){
			document.addEventListener('mousedown', function (event) {
				if (!event.target) return;
				if(!opened) return;
				if(event.target !== btn && !closest(event.target, '.' + classes.btn.base)){
					close();
				}
			});
		};
		let init = function () {
			nav = document.querySelector('.' + classes.nav.base);
			btn = document.querySelector('.' + classes.btn.base);

			listenOutClick();
			listenBtnClick();
		};

		init();
	}

	/*
		--------------------------------------------
		--------------------------------------------
						SLIDERS
		--------------------------------------------
		--------------------------------------------
	 */

		function initAboutSlider() {
			swiper.init(".tmpl-hh__about-slider", {
				loop: true,
				slidesPerView: 1,
				// spaceBetween: 40,
				centeredSlides: true,
				bulletActiveClass: '.tmpl-hh__about-slider-pagination-active',
				pagination: {
					el: '.tmpl-hh__about-slider__pagination',
					clickable: true,
				},
				breakpoints: {
					530: {
						spaceBetween: 20,
					}
				}
			});
		}

		function initGallerySlider() {
			swiper.init(".tmpl-hh__gallery-slider", {
				loop: true,
				slidesPerView: 3,
				centeredSlides: true,
				bulletActiveClass: '.tmpl-hh__gallery-slider-pagination-active',
				autoplay: {
					delay: 3000,
					disableOnInteraction: false,
				},
				pagination: {
					el: '.tmpl-hh__gallery-slider__pagination',
					clickable: true,
				},
				breakpoints: {
					530: {
						spaceBetween: 20,
					}
				}
			});
		}

		function initAgeSlider() {
			swiper.init(".tmpl-hh__age-slider", {
				loop: true,
				slidesPerView: 3,
				centeredSlides: true,
				bulletActiveClass: '.tmpl-hh__age-slider-pagination-active',
				pagination: {
					el: '.tmpl-hh__age-slider__pagination',
					clickable: true,
				},
				breakpoints: {
					530: {
						spaceBetween: 20,
					}
				}
			});
		}

		function initRustamSlider() {
			swiper.init(".tmpl-hh__rustam-slider", {
				loop: true,
				slidesPerView: 1,
				centeredSlides: true,
				navigation: {
					prevEl: ".tmpl-hh__rustam-slider-arrow-prev",
					nextEl: ".tmpl-hh__rustam-slider-arrow-next",
				},
				breakpoints: {
					530: {
						spaceBetween: 20,
					}
				}
			});
		}

		function initOksSlider() {
			swiper.init(".tmpl-hh__oks-slider", {
				loop: true,
				slidesPerView: 1,
				centeredSlides: true,
				navigation: {
					prevEl: ".tmpl-hh__oks-slider-arrow-prev",
					nextEl: ".tmpl-hh__oks-slider-arrow-next",
				},
				breakpoints: {
					530: {
						spaceBetween: 20,
					}
				}
			});
		}

		function initMaxSlider() {
			swiper.init(".tmpl-hh__max-slider", {
				loop: true,
				slidesPerView: 1,
				centeredSlides: true,
				navigation: {
					prevEl: ".tmpl-hh__max-slider-arrow-prev",
					nextEl: ".tmpl-hh__max-slider-arrow-next",
				},
				breakpoints: {
					530: {
						spaceBetween: 20,
					}
				}
			});
		}

		function initTeamSlider() {
			swiper.init(".tmpl-hh__team-slider", {
				loop: true,
				slidesPerView: 3,
				centeredSlides: true,
				spaceBetween: 40,
				navigation: {
					prevEl: ".tmpl-hh__team-slider-arrow-prev",
					nextEl: ".tmpl-hh__team-slider-arrow-next",
				},
				breakpoints: {
					530: {
						spaceBetween: 20,
					}
				}
			});
		}

		function initTimeSlider() {
			swiper.init(".tmpl-hh__time-slider", {
				// loop: true,
				slidesPerView: 1,
				// centeredSlides: true,
				autoHeight: true,
				effect: "fade",
				autoplay: {
					delay: 2500,
					disableOnInteraction: false,
				},
			});
		}
	/*
		--------------------------------------------
		--------------------------------------------
						MODAL
		--------------------------------------------
		--------------------------------------------
	 */
		function listenTestModalBtnClick() {
			document.getElementById('lead1').addEventListener('click', function () {
				one.show();
			});
		}

		function listenTestModalBtnClickTwo() {
			document.getElementById('lead2').addEventListener('click', function () {
				two.show();
			});
		}

		function listenTestModalBtnClickThree() {
			document.getElementById('lead3').addEventListener('click', function () {
				three.show();
			});
		}

		function listenTestModalBtnClickFour() {
			document.getElementById('lead4').addEventListener('click', function () {
				four.show();
			});
		}

		function listenTestModalBtnClickGuestOne() {
			document.getElementById('guest1').addEventListener('click', function () {
				five.show();
			});
		}

		function listenTestModalBtnClickGuestTwo() {
			document.getElementById('guest2').addEventListener('click', function () {
				six.show();
			});
		}

		function listenTestModalBtnClickGuestThree() {
			document.getElementById('guest3').addEventListener('click', function () {
				seven.show();
			});
		}
	/*
		--------------------------------------------
		--------------------------------------------
							HISTORY-SLIDER
		--------------------------------------------
		--------------------------------------------
	 */

		let historyElemsContainer = document.querySelector(".tmpl-hh__history__elems"),
		historyElems = [].slice.call(document.querySelectorAll(".tmpl-hh__history__elem"));
		function initHistorySlider() {
			let tmplhh__slider_history = swiper.init(".tmpl-hh__swiper-container-history", {
				loop: !1,
				pagination: {
					el: ".tmpl-hh__swiper-pagination-history",
					type: "fraction",
					renderFraction: function (e, t) {
						return '<span class="' + e + '"></span> / <span class="' + t + '"></span>'
					}
				},
				navigation: {
					prevEl: ".tmpl-hh__history .tmpl-hh__arrow--prev",
					nextEl: ".tmpl-hh__history .tmpl-hh__arrow--next"
				},
				autoHeight: !0,
				spaceBetween: 40,
				on: {
					slideChange: function () {
						var l = this.realIndex;
						historyElemsContainer.className = "tmpl-hh__history__elems tmpl-hh__history__elems--active_slide" + (l + 1);
						historyElems.forEach(function (e, t) {
							t === l ? e.classList.add("tmpl-hh__active") : e.classList.remove("tmpl-hh__active");
						});
						let historyTitle = document.querySelector('.tmpl-hh__history__title');
						if(historyElemsContainer.classList.contains("tmpl-hh__history__elems--active_slide1")){
							historyTitle.innerHTML = 'Наша История';
						}
						else {
							historyTitle.innerHTML = 'Наши Успехи';
						}
					}
				}
			});
			historyElems.forEach(function (e, t) {
				return e.addEventListener("click", function () {
						tmplhh__slider_history.slideTo(t);
				})
			});
		}



		/*
		--------------------------------------------
		--------------------------------------------
							BTN
		--------------------------------------------
		--------------------------------------------
	 */

		let scrollBtns = document.querySelectorAll(".tmpl-hh__s-first-screen__btn");

		const scrollElements = document.querySelectorAll(".tmpl-hh__s-map");
		const elementInView = (el, dividend = 1) => {  
			const elementTop = el.getBoundingClientRect().top;  
			return (    
				elementTop <=    
				(window.innerHeight || document.documentElement.clientHeight) / dividend  );};
				const handleScrollAnimation = () => {  
					scrollElements.forEach((el) => {    
						if (elementInView(el, 2.25)) {
							scrollBtns.forEach(e => {
								e.classList.remove("tmpl-hh__s-first-screen__btn--active");
							});      
						}
						else{
							scrollBtns.forEach(e => {
								e.classList.add("tmpl-hh__s-first-screen__btn--active");
							});  
						}  
					});
				};
				window.addEventListener("scroll", () => {   handleScrollAnimation();});

		// function onScrollBtn(){
		// 	scrollBtn.classList.add("tmpl-hh__s-first-screen__btn--active")
		// }
		
		// window.addEventListener("scroll", onScrollBtn);


		

		// window.addEventListener("scroll", ()=>{
		// 	let gallerySlider = document.getElementById("gallerySlider");
		// 	console.log("bruh");
		// 	gallerySlider.swiper.update();
		// })
	/*
		--------------------------------------------
		--------------------------------------------
							COMMON
		--------------------------------------------
		--------------------------------------------
	 */
		const swiper = new VSwiper();
		
		new VacancyBtn();
		new Video();
		new Content();
		new Nav();
		new Anchor();
		const one = new Modal('#one');
		const two = new Modal('#two');
		const three = new Modal('#three');
		const four = new Modal('#four');
		const five = new Modal('#five');
		const six = new Modal('#six');
		const seven = new Modal('#seven');

		listenTestModalBtnClick();
		listenTestModalBtnClickTwo();
		listenTestModalBtnClickThree();
		listenTestModalBtnClickFour();
		listenTestModalBtnClickGuestOne();
		listenTestModalBtnClickGuestTwo();
		listenTestModalBtnClickGuestThree();
		initAboutSlider();
		initGallerySlider();
		initAgeSlider();
		initRustamSlider();
		initOksSlider();
		initMaxSlider();
		initTeamSlider();
		initTimeSlider();
		initHistorySlider();
		
		citySelector.init();

}());
