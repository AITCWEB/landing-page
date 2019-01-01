(function ($) {

	// $(".wrapper h1").on('click mouseover', function () {
	// 	$(".wrapper").toggleClass("hover");
	// });

	// Init ScrollMagic
	// var controller = new ScrollMagic.Controller();

	// pin the intro
	// var pinIntroScene = new ScrollMagic.Scene({
	// 		triggerElement: '.bcg',
	// 		triggerHook: 0,
	// 		duration: '30%'
	// 	})
	// 	.setPin('.bcg', {
	// 		pushFollowers: false
	// 	})
	// 	.addTo(controller);

	// // pin again
	// var pinIntroScene2 = new ScrollMagic.Scene({
	// 		triggerElement: '#main',
	// 		triggerHook: 0.4
	// 	})
	// 	.setPin('.bcg', {
	// 		pushFollowers: false
	// 	})
	// 	.addTo(controller);




	// Set variables
	var $activeSlide = $(".active"),
		$homeSlide = $(".homeSlide"),
		$slideNavPrev = $(".slideNavPrev"),
		$slideNavNext = $(".slideNavNext")
	$slideNavPrevA = $(".slideNavPrev a"),
		$slideNavNextA = $(".slideNavNext a"),
		$hero = $(".homeSlide");

	// Mouse move tilt effect
	$(document).mousemove(function (event) {

		// Detect mouse position
		var xPos = (event.clientX / $(window).width()) - 0.5;
		var yPos = (event.clientY / $(window).height()) - 0.5;

		// Tilt the hero container
		TweenLite.to($hero, .6, {
			rotationY: 5 * xPos,
			rotationX: 5 * yPos,
			ease: Power1.easeOut,
			transformPerspective: 900,
			transformOrigin: "center"
		});
	});


	// Init function that run on page load
	function init() {

		// Hide all slides apart from the active one
		TweenLite.set($homeSlide.not($activeSlide), {
			autoAlpha: 0
		});

		// Disable arrow down on page load
		TweenLite.set($slideNavPrev, {
			autoAlpha: 0.2
		});

	}

	// Run Init function
	init();

	// Go to next slide - pass 2 parameters - slideOut and slideIn
	function goToNextSlide(slideOut, slideIn) {
		var tl = new TimelineLite(),
			index = slideIn.index(),
			size = $('.top .homeSlide').length;

		if (slideIn.length !== 0) {

			tl
				.set(slideIn, {
					x: '100%',
					autoAlpha: 1,
					className: '+=active'
				})
				.set(slideOut, {
					className: '-=active',
				})
				.to(slideOut, 0.5, {
					x: '-100%',
					ease: Power3.easeInOut
				}, .2)
				.to(slideIn, 0.5, {
					x: '-=100%',
					ease: Power3.easeInOut
				}, .2)

		}
		TweenLite.set($slideNavPrev, {
			autoAlpha: 1
		});

		if (index === size) {
			TweenLite.to($slideNavNext, 0.3, {
				autoAlpha: 0.2,
				ease: Linear.easeNone
			});
		}

	}

	// Navigation click - go to the Next Slide
	$slideNavNext.click(function (e) {
		e.preventDefault();

		var slideOut = $('.homeSlide.active'),
			slideIn = $('.homeSlide.active').next('.homeSlide');

		goToNextSlide(slideOut, slideIn);

	});

	// Go to previous slide - pass 2 parameters - slideOut and slideIn
	function goToPreviousSlide(slideOut, slideIn) {

		var tl = new TimelineLite(),
			index = slideIn.index(),
			size = $('.top .homeSlide').length;

		if (slideIn.length !== 0) {

			tl
				.set(slideIn, {
					x: '-100%',
					autoAlpha: 1,
					className: '+=active'
				})
				.set(slideOut, {
					className: '-=active'
				})

				.to(slideOut, 0.5, {
					x: '100%',
					ease: Power3.easeInOut
				}, 0)
				.to(slideIn, 0.5, {
					x: '+=100%',
					ease: Power3.easeInOut
				}, '-=0.5');

		}


		TweenLite.set($slideNavNext, {
			autoAlpha: 1
		});

		if (index === 1) {
			TweenLite.to($slideNavPrev, 0.3, {
				autoAlpha: 0.2,
				ease: Linear.easeNone
			});
		}

	}

	// Navigation click - go to the Prev Slide
	$slideNavPrev.click(function (e) {
		e.preventDefault();

		var slideOut = $('.homeSlide.active'),
			slideIn = $('.homeSlide.active').prev('.homeSlide');

		goToPreviousSlide(slideOut, slideIn);

	});

})(jQuery);