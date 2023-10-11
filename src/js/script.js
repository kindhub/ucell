import citySelector from "./custom_modules/CitySelector";
import VSwiper from "./modules/VSwiper";
import VacancyBtn from "./modules/VacancyBtn";
import Content from "./modules/Content";
import Video from "./modules/Video";
import Anchor from "./modules/Anchor";
import Modal from "./modules/Modal";
import Nav from "./modules/Nav";

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
						t === l ? e.classList.add("tmpl-hh__active") : e.classList.remove("tmpl-hh__active")
					})
					let historyTitle = document.querySelector('.tmpl-hh__history__title');
					if(historyElemsContainer.classList.contains("tmpl-hh__history__elems--active_slide1")){
						historyTitle.innerHTML = 'Наша История'
					}
					else {
						historyTitle.innerHTML = 'Наши Успехи'
					}
				}
			}
		});
		historyElems.forEach(function (e, t) {
			return e.addEventListener("click", function () {
					tmplhh__slider_history.slideTo(t)
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

	let scrollBtns = document.querySelectorAll(".tmpl-hh__s-first-screen__btn")

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
							e.classList.remove("tmpl-hh__s-first-screen__btn--active")
						});      
					}
					else{
						scrollBtns.forEach(e => {
							e.classList.add("tmpl-hh__s-first-screen__btn--active")
						});  
					}  
				})
			}
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
