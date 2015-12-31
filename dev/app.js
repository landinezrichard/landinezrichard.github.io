(function () {    
    /* Dependencias*/

    let $ = require('jquery');
    const showMenu         = require('./components/MainMenu');    
    const mobileNavigation = require('./lib/mobileNavigation.js');
    const touchVertical    = require('./lib/touchVertical.js');
    const slides           = require('./lib/slides.js'); 

    document.addEventListener('DOMContentLoaded', onDOMload);
   

    /*Añadimos un media query para que la funcionalidad touch y la paginación esten disponibles solo en moviles.

    */

    function media_query(){
      // if(bodyTouch || dragend){
      //   bodyTouch.destroy();
      //   dragend.destroy();
      // }
      if(window.matchMedia("(max-width: 32.438em)").matches) {
          console.log("Dispositivo movil!!!");

          window.scrollTo(0, 1);          

          
          endOfPage();
      }else{
        //menu sticky
        // require('./components/MainMenu/sticky.js');

        // let $menuLinks = document.querySelectorAll(".MainMenu-link");

        // for(let i = 0; i < $menuLinks.length; i++){
        //   $( $menuLinks[i]).unbind( "click" );
        // }
        endOfPage();
      }
    }

    media_query();
    

    /*requerimos las funcionalidades del footer:

      - Validar Formulario
      - Enviar formulario por ajax
      - Slider captcha
      - Ventana modal

    */
    require('./components/Footer');

    function endOfPage(){  
      

      /*requerimos las funcionalidades del footer:

        - Validar Formulario
        - Enviar formulario por ajax
        - Slider captcha
        - Ventana modal

      */
      require('./components/Footer');
    }

    $( window ).resize(media_query);

	function onDOMload() {
		showMenu.init();
		//mobileNavigation.init(showMenu.close);
    //touchVertical.init();	
    slides.init();
	}

}())