var mediaQuery = (function () {
	/* Dependencias*/
	
	const mobileNavigation = require('./mobileNavigation.js');
	const touchVertical    = require('./touchVertical.js');
	const media = "(max-width: 767px)";

	/*
	*	Añadimos un media query para que la funcionalidad touch y la paginación esten disponibles solo en moviles.
	*/

	function media_query () {
		// if(bodyTouch || dragend){
		//	bodyTouch.destroy();
		//	dragend.destroy();
		// }
		// if( mobileNavigation.getInstance() || touchVertical.getInstance() ){
		// 	mobileNavigation.remove();
		// 	touchVertical.remove();
		// }
		if(window.matchMedia(media).matches) {
			//console.log("Dispositivo movil!!!");

			//mobileNavigation.init(showMenu.close);
			mobileNavigation.init();
			touchVertical.init();
			//window.scrollTo(0, 1);         
		}
		// else{
		
		// }
	}	

	return {
		init : function () {
			media_query();
		}
	};

})();

module.exports = mediaQuery;