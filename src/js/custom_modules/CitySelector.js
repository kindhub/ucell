import VSwiper from "../modules/VSwiper";
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
		let closeBtn = document.getElementById("closeBtn")
		closeBtn.addEventListener('click', ()=> {
			__self.sliderHide();
		})
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
export default citySelector;