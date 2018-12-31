(function ($) {
	// Init ScrollMagic
	var controller = new ScrollMagic.Controller();

	// pin the intro
	var pinIntroScene = new ScrollMagic.Scene({
			triggerElement: '.bcg',
			triggerHook: 0,
			duration: '30%'
		})
		.setPin('.bcg', {
			pushFollowers: false
		})
		.addTo(controller);

	// pin again
	var pinIntroScene2 = new ScrollMagic.Scene({
			triggerElement: '#main',
			triggerHook: 0.4
		})
		.setPin('.bcg', {
			pushFollowers: false
		})
		.addTo(controller);




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

		// Update text on the page with the current mouse position
		$(".bottom strong").text(event.pageX + ", " + event.pageY);
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

			// go to the next slide timeline
			tl
				// move the new slide (the one about to enter viewport) out of the viewport and add class active
				.set(slideIn, {
					x: '100%',
					autoAlpha: 1,
					className: '+=active'
				})
				// remove class active from the currently active slide (slideOut)
				.set(slideOut, {
					className: '-=active',
				})
				// .to(slideOut, 0.3, {
				// 	x: '-=15px',
				// 	autoAlpha: 0,
				// 	ease: Power3.easeInOut
				// }, 0)
				// animate active slide up (out of the viewport)
				.to(slideOut, 0.5, {
					x: '-100%',
					ease: Power3.easeInOut
				}, .2)
				// animate new slide up (from out of the viewport)
				.to(slideIn, 0.5, {
					x: '-=100%',
					ease: Power3.easeInOut
				}, .2)
			// .fromTo([slideIn, slideOut], 2, {
			// 	x: -1
			// }, {
			// 	x: "-100px",
			// 	ease: Linear.easeNone,
			// 	force3D: true
			// })
			// .fromTo(slideIn, 0.3, {
			// 	x: '+=20px',
			// 	autoAlpha: 0
			// }, {
			// 	autoAlpha: 1,
			// 	x: 0,
			// 	ease: Power1.easeInOut
			// }, 0.3);

		}

		// Fade out arrow up and fade in arrow down 

		// Fade in arrow down
		TweenLite.set($slideNavPrev, {
			autoAlpha: 1
		});

		// Fade out arrow up on last slide
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

			// go to the previous slide timeline
			tl
				// move the new slide (the one about to enter viewport) out of the viewport (to the top)
				.set(slideIn, {
					x: '-100%',
					autoAlpha: 1,
					className: '+=active'
				})
				// remove class active from the currently active slide (slideOut)
				.set(slideOut, {
					className: '-=active'
				})
				// animate H1 and p of the active slide down and fade them out

				// animate active slide down (out of the viewport)
				.to(slideOut, 0.5, {
					x: '100%',
					ease: Power3.easeInOut
				}, 0)
				// animate new slide down (from out of the viewport)
				.to(slideIn, 0.5, {
					x: '+=100%',
					ease: Power3.easeInOut
				}, '-=0.5');

		}

		// Fade out arrow down and fade in arrow up 

		// Fade in arrow up
		TweenLite.set($slideNavNext, {
			autoAlpha: 1
		});

		// Fade out arrow down on first slide
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