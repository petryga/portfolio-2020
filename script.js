// @ts-nocheck
const myApp = {};

myApp.init = () => {
	particlesJS('particles-js', 'particles.json');

	//google analytics
	window.dataLayer = window.dataLayer || [];
	function gtag() {
		dataLayer.push(arguments);
	}
	gtag('js', new Date());
	gtag('config', 'G-J83V2J66Q1');

	//scroll down button homepage

	$('.scroll-down').click(function () {
		$('html, body').animate({ scrollTop: $('main').offset().top }, 'slow');
		return false;
	});

	//scroll up button + nav

	$(window).on('scroll', function () {
		if ($(this).scrollTop() > 550) {
			$('.scroll-up').fadeIn();
			$('.scroll-up').attr('tabindex', '1');
			$('#nav').fadeIn();
		} else {
			$('.scroll-up').fadeOut();
			$('#nav').fadeOut();
		}
	});

	$('.scroll-up').on('click', function () {
		$('html, body').animate(
			{
				scrollTop: 0,
			},
			800
		);
		return false;
	});

	//highlight nav item on scroll

	const $navigationLinks = $('#navigation > ul > li > a');
	const $sections = $($('section').get().reverse());
	const sectionIdTonavigationLink = {};
	$sections.each(function () {
		const id = $(this).attr('id');
		sectionIdTonavigationLink[id] = $('#navigation > ul > li > a[href=\\#' + id + ']');
	});

	function throttle(fn, interval) {
		let lastCall, timeoutId;
		return function () {
			const now = new Date().getTime();
			if (lastCall && now < lastCall + interval) {
				clearTimeout(timeoutId);
				timeoutId = setTimeout(function () {
					lastCall = now;
					fn.call();
				}, interval - (now - lastCall));
			} else {
				lastCall = now;
				fn.call();
			}
		};
	}

	function highlightNavigation() {
		const scrollPosition = $(window).scrollTop();
		$sections.each(function () {
			const currentSection = $(this);
			const sectionTop = currentSection.offset().top;
			if (scrollPosition >= sectionTop) {
				const id = currentSection.attr('id');
				const $navigationLink = sectionIdTonavigationLink[id];
				if (!$navigationLink.hasClass('active')) {
					$navigationLinks.removeClass('active');
					$navigationLink.addClass('active');
				}
				return false;
			}
		});
	}

	$(window).scroll(throttle(highlightNavigation, 100));

	// change project images order on resize

	$(window).resize(function () {
		if ($(window).width() <= 870) {
			$('#travel-from-home-img').remove().insertAfter($('#travel-from-home-text'));
			$('#skyline-img').remove().insertAfter($('#skyline-text'));
		} else {
			return false;
		}
	});
};

$(function () {
	myApp.init();
	AOS.init();
});
