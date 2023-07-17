//youtube player
var player;
function onYouTubePlayerAPIReady() {
  player = new YT.Player('player', {
        events: {
            'onReady': onPlayerReady
        }
    });
}
function onPlayerReady(event) {
   body.addEventListener("click", function() {
       player.pauseVideo();
	   console.log("000");
    });
 }

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//ibg
function ibg(){
let ibg=document.querySelectorAll("._ibg"); 
for (let i = 0; i < ibg.length; i++) { 
	if(ibg[i].querySelector('img')){ 
		ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')'; } 
	}
}
ibg();

//burger
let header = document.querySelector(".header");
let menu = document.querySelector(".header-menu");
let burger = document.querySelector(".header-burger__burger");
let body = document.querySelector("body");

burger.addEventListener('click', openBurger);

function openBurger() {
	burger.classList.toggle("_active");
	menu.classList.toggle("_active");
	header.classList.toggle("_active");
	body.classList.toggle("_lock");
};

//main-slider
let mainSlider = new Swiper('.main-slider__container', {
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
		type: 'bullets',
	},
	keyboard: {
		enabled: true,
		onlyInViewport: true,
		pageUpDown: true,
	},
	autoHeight: false,
	slidesPerView: 1,
	loop: true,
	slideToClickedSlide: true,
	centeredSlides: true,
	effect: 'slide',
	breakpoints: {
		320: {
			spaceBetween: 0,
		},
		1400: {
			spaceBetween: -10,
		},
		1850: {
			spaceBetween: -20,
		},
	},
	autoplay: {
     disableOnInteraction: true,
    },
});

//popup
let popupOpeners = document.querySelectorAll('.popup__opener');
let popup = document.querySelectorAll('.popup');
let maps =  document.querySelectorAll('.map');
if (popupOpeners.length > 0) {
	for (let i =0; i < popupOpeners.length; i++) {
	popupOpeners[i].addEventListener('click', function(){
		this.parentElement.classList.toggle("_active");
		for (let i =0; i < maps.length; i++) {
			maps[i].classList.toggle('_lock'); //фикс конфликта z-index у popup и карт
		}
		body.classList.toggle("_lock");
	});
}}
document.addEventListener ('click', function() {
	if (!event.target.closest(".popup__opener") && !event.target.closest(".popup__body") && !event.target.closest("#calendar-window") && !event.target.closest(".magnify")) {
		for (let i =0; i < popup.length; i++) {
			popup[i].classList.remove('_active');
		}
		for (let i =0; i < maps.length; i++) {
			maps[i].classList.remove('_lock'); //фикс конфликта z-index у popup и карт
		}
		body.classList.remove("_lock");
		let calendarWindow = document.querySelector('#calendar-window');
		if (calendarWindow) {
			calendarWindow.style.display = "none";
		}
	}
})
document.onkeydown = function(e) {
	 if (e.keyCode == 27) {
	 	for (let i =0; i < popup.length; i++) {
			popup[i].classList.remove('_active');
		}
		for (let i =0; i < maps.length; i++) {
			maps[i].classList.remove('_lock'); //фикс конфликта z-index у popup и карт
		}
		body.classList.remove("_lock");
	 }
}

//routes-slider
let routesSlider = new Swiper('.slider-routes__container', {
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
		type: 'bullets',
	},
	keyboard: {
		enabled: true,
		onlyInViewport: true,
		pageUpDown: true,
	},
	slidesPerView: 'auto',
	loop: true,
	slideToClickedSlide: true,
	effect: 'slide',
	breakpoints: {
		768: {
			spaceBetween: 30,
		},
		320: {
			spaceBetween: 10,
		},
	},
});

//fotoblock-slider
let fotoblockSlider = new Swiper('.slider-fotoblock__container', {
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
		type: 'bullets',
	},
	keyboard: {
		enabled: true,
		onlyInViewport: true,
		pageUpDown: true,
	},
	slidesPerView: 'auto',
	loop: true,
	slideToClickedSlide: true,
	effect: 'slide',
	centeredSlides: true,
	zoom: {
		maxRatio: 1.5,
		minRatio: 1,
	},
	breakpoints: {
		768: {
			spaceBetween: 30,
		},
		320: {
			spaceBetween: 10,
		},
	},
});

//spoiler
const spoilersArray = document.querySelectorAll('[data-spoilers]');
if (spoilersArray.length > 0) {
	const spoilersRegular = Array.from(spoilersArray).filter(function (item, index, self) {
		return !item.dataset.spoilers.split(",")[0];
	});
	if (spoilersRegular.length > 0) {
		initSpoilers(spoilersRegular);
	}
	function initSpoilers(spoilersArray, matchMedia = false) {
		spoilersArray.forEach(spoilersBlock => {
			spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;
			if (matchMedia.matches || !matchMedia) {
				spoilersBlock.classList.add('_init');
				initSpoilerBody(spoilersBlock);
				spoilersBlock.addEventListener("click", setSpoilerAction);
			} else {
				spoilersBlock.classList.remove('_init');
				initSpoilerBody(spoilersBlock, false);
				spoilersBlock.removeEventListener("click", setSpoilerAction);
			}
		});
	}

	function initSpoilerBody(spoilerBlock, hideSpoilerBody = true) {
		const spoilerTitles = spoilerBlock.querySelectorAll('[data-spoiler]');
		if (spoilerTitles.length > 0) {
			spoilerTitles.forEach(spoilerTitle => {
				if (hideSpoilerBody) {
					spoilerTitle.removeAttribute('tabindex');
					if (!spoilerTitle.classList.contains('_active')) {
						spoilerTitle.nextElementSibling.hidden = true;
					}
				} else {
					spoilerTitle.setAttribute('tabindex', '-1');
					spoilerTitle.nextElementSibling.hidden = false;
				}
			});
		}
	}

	function setSpoilerAction(e) {
		const el = e.target;
		if (el.hasAttribute('data-spoiler') || el.closest('[data-spoiler]')) {
			const spoilerTitle = el.hasAttribute('data-spoiler') ? el : el.closest('[data-spoiler]');
			const spoilersBlock = spoilerTitle.closest('[data-spoilers]');
			const oneSpoiler = spoilersBlock.hasAttribute('data-one-spoiler') ? true : false;
			if (!spoilersBlock.querySelectorAll('._slide').length) {
				if (oneSpoiler && !spoilerTitle.classList.contains('_active')) {
					hideSpoilersBody(spoilersBlock);
				}
				spoilerTitle.classList.toggle('_active');
				spoilerTitle.parentElement.classList.toggle('_active');
				_slideToggle(spoilerTitle.nextElementSibling, 300);
			}
			e.preventDefault();
		}
	}

	function hideSpoilersBody(spoilersBlock) {
		const spoilerActiveTitle = spoilersBlock.querySelector('[data-spoiler]._active');
		if (spoilerActiveTitle) {
			spoilerActiveTitle.classList.remove('_active');
			spoilerActiveTitle.parentElement.classList.remove('_active');
			_slideUp(spoilerActiveTitle.nextElementSibling, 300);
		}
	}
}

let _slideUp = (target, duration = 300) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = true;
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}

let _slideDown = (target, duration = 300) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (target.hidden) {
			target.hidden = false;
		}
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}

let _slideToggle = (target, duration = 300) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}

//info cards
let infoTriggers = document.querySelectorAll('.cover-popup__label');
for (let i=0; i<infoTriggers.length; i++) {
	let trigger = infoTriggers[i];
	trigger.addEventListener('click', openCover);
}

function openCover() {
	this.parentElement.classList.toggle('_active');
	let infoCloser = this.parentElement.querySelector('.cover-popup__close-btn');
	infoCloser.addEventListener('click', closeCover);

	function closeCover() {
		this.parentElement.parentElement.parentElement.classList.remove('_active');
	}
}

//calendar
let calendars = document.querySelectorAll('._calendar');
for (let i=0; i <calendars.length; i++) {
	let calendar = calendars[i];
	let check = calendar.querySelector('._check');
	let area = calendar.querySelector('._area');
	area.addEventListener('click', function() {
		check.classList.add('_active');
		xCal.all("datepicker");
	});
	area.addEventListener ('blur', function() {
		check.classList.remove('_active');
	});
	check.addEventListener ('click', function() {
		event.preventDefault();
		check.classList.remove('_active');
	});
}

//counter
let increases = document.querySelectorAll('.counter__increase');
let decreases = document.querySelectorAll('.counter__decrease');
if (increases.length > 0) {
	initCounters();
}
function initCounters() {
	let field; 
	for (let i=0; i <increases.length; i++) {
		let increase = increases[i];
		increase.addEventListener('click', function() {
			field = increase.parentElement.querySelector('.counter__field');
			field.value ++;
		});
	}
	for (let i=0; i <decreases.length; i++) {
		let decrease = decreases[i];
		decrease.addEventListener('click', function() {
			field = decrease.parentElement.querySelector('.counter__field');
			if (field.value > 0) {
				field.value --;
			} else {
				return false;
			}
		});
	}
}

//pics zoom
$(function(){
  $('.minimized').click(function(event) {
    var i_path = $(this).attr('src');
    $('body').append('<div class="overlay"></div><div class="magnify"><img src="'+i_path+'"><div class="close-popup"><i></i></div></div>');
    $('.magnify').css({
     left: ($(document).width() - $('.magnify').outerWidth())/2,
     top: ($(window).height() - $('.magnify').outerHeight())/2
   });
    $('.overlay, .magnify').fadeIn('fast');
  });
  
  $('body').on('click', '.close-popup, .overlay .magnify', function(event) {
    event.preventDefault();
    $('.overlay, .magnify').fadeOut('fast', function() {
      $('.close-popup, .magnify, .overlay').remove();
    });
  });
});

