class LayoutHandler {
	constructor() {
		this.init();
		this.handleDOM();
		this.handleEvents();
		this.initMap();
		this.progressBar();
		this.observer();
	}

	/**
	 * Declare global variables
	 */
	init() {}

	/**
	 * Handle DOM queries
	 */
	handleDOM() {
		// Header
		this.burgerButton = document.querySelector('.hamburger');
		this.listNav = document.querySelector('.main-nav');
		this.header = document.querySelector('.header');

		// Intro
		this.textContent = document.querySelectorAll('.more-content__text');

		// About
		this.numberCount = document.querySelectorAll('.count__number');
		this.aboutSection = document.querySelector('.about');

		// What we do
		// this.arrowsAccordion = document.getElementsByClassName('fa-angle-down');
		this.accordionHeader = document.querySelectorAll('.work__part2__content');
	}

	/**
	 * Listen for events
	 */
	handleEvents() {
		// Used for functions closures
		const self = this;

		// Toggle burger menu
		this.burgerButton.addEventListener('click', () => {
			this.burgerButton.classList.toggle('is-active');
			this.listNav.classList.toggle('active');
		});

		// Header scroll
		window.addEventListener('scroll', () => {
			if (window.scrollY > 0) {
				this.header.classList.add('scroll-background');
			} else {
				this.header.classList.remove('scroll-background');
			}
		});

		// Intro - progressBar
		this.progressBar = () => {
			const current = document.querySelector('.more-content__text--move');
			current.classList.remove('more-content__text--move');
			current.classList.remove('more-content__text--active');

			if (current.nextElementSibling) {
				current.nextElementSibling.classList.add('more-content__text--move');
				current.nextElementSibling.classList.add('more-content__text--active');
			} else {
				this.textContent[0].classList.add('more-content__text--move');
				this.textContent[0].classList.add('more-content__text--active');
			}

			setTimeout(this.progressBar, 2000);
		};

		// Accordion
		this.accordionHeader.forEach((header, index) => {
			if (index == 0) {
				header.classList.add('active');
			}
			header.addEventListener('click', () => {
				if (header.classList.contains('active')) {
					header.classList.remove('active');
				} else {
					const allHeaderText = document.querySelectorAll('.active');
					allHeaderText.forEach((text) => {
						text.classList.remove('active');
					});
					header.classList.add('active');
				}
			});
		});

		// Swiper library

		new Swiper('.mySwiper', {
			spaceBetween: 0,
			centeredSlides: true,

			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});

		new Swiper('.mySwiper2', {
			spaceBetween: 0,
			centeredSlides: true,

			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
	}

	/**
	 * Functions
	 */

	// Counter and Intersection Observer
	handleScroll(entries) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				document.querySelectorAll('.count__number').forEach((counter) => {
					const speed = 200;
					counter.textContent = '0';
					const updateCount = () => {
						const targetNumber = +counter.dataset.target;

						const initialNumber = +counter.innerText;
						const incrementCount = targetNumber / speed;

						if (initialNumber < targetNumber) {
							counter.textContent = Math.ceil(initialNumber + incrementCount);
							setInterval(updateCount, 100);
						} else {
							counter.textContent = initialNumber;
						}
					};
					updateCount();
				});
			}
		});
	}

	observer = () => {
		const observer = new IntersectionObserver(this.handleScroll, {
			threshold: 0.5,
		});
		observer.observe(this.aboutSection);
	};

	// Map
	initMap = () => {
		const map = new google.maps.Map(document.getElementById('map'), {
			center: { lat: -34.397, lng: 150.644 },
			zoom: 12,
			disableDefaultUI: true,
			styles: [
				{
					featureType: 'administrative',
					elementType: 'labels',
					stylers: [
						{
							visibility: 'off',
						},
					],
				},
				{
					featureType: 'administrative.country',
					elementType: 'geometry.stroke',
					stylers: [
						{
							visibility: 'off',
						},
					],
				},
				{
					featureType: 'administrative.province',
					elementType: 'geometry.stroke',
					stylers: [
						{
							visibility: 'off',
						},
					],
				},
				{
					featureType: 'landscape',
					elementType: 'geometry',
					stylers: [
						{
							visibility: '',
						},
						{
							color: '#e3e3e3',
						},
					],
				},
				{
					featureType: 'landscape.natural',
					elementType: 'labels',
					stylers: [
						{
							visibility: 'off',
						},
					],
				},
				{
					featureType: 'poi',
					elementType: 'all',
					stylers: [
						{
							visibility: 'off',
						},
					],
				},
				{
					featureType: 'road',
					elementType: 'all',
					stylers: [
						{
							color: '#cccccc',
						},
					],
				},
				{
					featureType: 'road',
					elementType: 'labels',
					stylers: [
						{
							visibility: 'off',
						},
					],
				},
				{
					featureType: 'transit',
					elementType: 'labels.icon',
					stylers: [
						{
							visibility: 'off',
						},
					],
				},
				{
					featureType: 'transit.line',
					elementType: 'geometry',
					stylers: [
						{
							visibility: 'off',
						},
					],
				},
				{
					featureType: 'transit.line',
					elementType: 'labels.text',
					stylers: [
						{
							visibility: 'off',
						},
					],
				},
				{
					featureType: 'transit.station.airport',
					elementType: 'geometry',
					stylers: [
						{
							visibility: 'off',
						},
					],
				},
				{
					featureType: 'transit.station.airport',
					elementType: 'labels',
					stylers: [
						{
							visibility: 'off',
						},
					],
				},
				{
					featureType: 'water',
					elementType: 'geometry',
					stylers: [
						{
							color: '#FFFFFF',
						},
					],
				},
				{
					featureType: 'water',
					elementType: 'labels',
					stylers: [
						{
							visibility: 'off',
						},
					],
				},
			],
		});
	};
}
