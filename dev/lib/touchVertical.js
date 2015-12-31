var touchVertical = (function () {
	const Hammer = require('hammerjs');
	let bodyTouch;	
	let body = document.querySelector('body');	

	function suscribeEvents () {
		bodyTouch.on("panup",moveDown);
		bodyTouch.on("pandown",moveUp);
	}

	function moveUp () {
		bodyTouch.off("pandown",moveUp);
		//hace scroll hasta arriba
		window.scrollTo(0, -10);
		setTimeout(function() {
			bodyTouch.on("pandown",moveUp);    
		}, 400);
	}

	function moveDown () {
		bodyTouch.off("panup",moveDown);        
		//hace scroll de 100 px cada vez  
		window.scrollBy(0, 100);
		setTimeout(function() {
			bodyTouch.on("panup",moveDown);    
		}, 400);
	}

	function initialize () {
		//Convertimos el body en un receptor de eventos touch
		bodyTouch = new Hammer(body);
		//activamos el pan vertical
		bodyTouch.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });
	}

	function removeTouch () {
		bodyTouch.destroy();
	}

	function getTouchElement () {
		return bodyTouch;
	}

	return {
		init : function () {
			initialize();
			suscribeEvents();
		},
		remove : removeTouch,
		getInstance : getTouchElement
	}	

})();

module.exports = touchVertical;