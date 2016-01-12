(function () {
	/* Dependencias*/

	let $ = require('jquery');
	const showMenu         = require('./components/MainMenu');	
	const slides           = require('./lib/slides.js');
	const mediaQuery       = require('./lib/mediaQuery.js');
	const loadScript       = require('./lib/loadScript.js');

	document.addEventListener('DOMContentLoaded', onDOMload);

	function endOfPage(){  
	
		/*requerimos las funcionalidades del footer:

		- Validar Formulario
		- Enviar formulario por ajax
		- Slider captcha
		- Ventana modal

		*/
		require('./components/Footer');
	}

	function recarga () {
		if(screen.width >= 769){
			document.location.reload(false);			
		}
	}

	function onDOMload() {
		showMenu.init();
		mediaQuery.init();
		slides.init();
		$( window ).resize(recarga);

		
		loadScript('https://www.google.com/recaptcha/api.js');
		require('./components/Footer');		
	}

}())