'use strict'
const Hammer = require('hammerjs');
const Dragend = require('./lib/dragend.js');
require('./components/MainMenu');
let $ = require('jquery');

let dragend,
    bodyTouch;

let secciones = [
  {
    "id": "yo"    
  },
  {
    "id": "perfil"    
  },
  {
    "id": "conocimientos"    
  },
  {
    "id": "trabajo"    
  },
  {
    "id": "contacto"    
  }
];

//guardamos el tamaño del objeto secciones, para no estar calculandolo
let sectionsSize = secciones.length;

function getSections(secciones,size){
	for(let i = 0; i < size; i++){
		secciones[i].elemento = document.querySelector(`#${secciones[i].id}`);		
	}	
} 

function menuNavigate(elements){
  for(let i = 0; i < elements.length; i++){
    //asignamos el evento click a cada enlace del menu
    $(elements[i]).bind("click",function (event) {
    //elements[i].addEventListener("click",function (event) {
        //evitamos comportamiento por defecto, para que no viaje a los href=#id  	
        event.preventDefault();
        //obtenemos el href, y eliminamos el "#"
        let pos = this.getAttribute("href");
        pos = pos.split("#").pop();
        //obtenemos la posición de la seccion, buscando en el objeto secciones, luego dragend como las enumera desde la 1, le sumamos la unidad
        let index = getIndex(pos)+1;
        //hacemos scroll hasta la seccion correspondiente 
        dragend.scrollToPage(index);                 
    });
  }
}

function getIndex(busqueda){
  for(let i=0; i< sectionsSize;i++){
    if(secciones[i].id === busqueda)
        return i;
  }
}

function moveUp(){
	bodyTouch.off("pandown",moveUp);
  //hace scroll hasta arriba
	window.scrollTo(0, -10);
	setTimeout(function() {
		bodyTouch.on("pandown",moveUp);    
	}, 400);
}

function moveDown(){
	bodyTouch.off("panup",moveDown);
	//console.log(window.innerHeight);
  //hace scroll de 100 px cada vez	
	window.scrollBy(0, 100);
	setTimeout(function() {
		bodyTouch.on("panup",moveDown);    
	}, 400);
}

/*Añadimos un media query para que la funcionalidad touch y la paginación esten disponibles solo en moviles.

*/

function media_query(){
  if(bodyTouch || dragend){
    bodyTouch.destroy();
    dragend.destroy();
  }
  if(window.matchMedia("(max-width: 32.438em)").matches) {
      console.log("Dispositivo movil!!!");

      window.scrollTo(0, 1);

      //le pasamos el objeto secciones, y por cada id, obtenemos el elemento del DOM, y se guarda en el mismo objeto.
      getSections(secciones, sectionsSize);

      //Convertimos el body en un receptor de eventos touch
      var $body = document.querySelector('body');
      bodyTouch = new Hammer($body);
      //activamos el pan vertical
      bodyTouch.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });

      bodyTouch.on("panup",moveDown);
      bodyTouch.on("pandown",moveUp);

      let $menuLinks = document.querySelectorAll(".MainMenu-link");

      //obtenemos el contenedor de las paginas para iniciar Dragend
      var $container = document.querySelector(".MainContainer");
      dragend = new Dragend($container);

      //Nos encargamos de la navegacion "dragend" en el menu
      menuNavigate($menuLinks);
      endOfPage();
  }else{
    //menu sticky
    require('./components/MainMenu/sticky.js');

    let $menuLinks = document.querySelectorAll(".MainMenu-link");

    for(let i = 0; i < $menuLinks.length; i++){
      $( $menuLinks[i]).unbind( "click" );
    }
    endOfPage();
  }
}

media_query();


/*Requerimos e iniciamos los slides responsive*/


require('./components/slides/responsiveslides.js');
$(".rslides").responsiveSlides({maxwidth: 460});

/*requerimos las funcionalidades del footer:

  - Validar Formulario
  - Enviar formulario por ajax
  - Slider captcha
  - Ventana modal

*/
require('./components/Footer');

function endOfPage(){  

  /*Requerimos e iniciamos los slides responsive*/

  require('./components/slides/responsiveslides.js');
  $(".rslides").responsiveSlides({maxwidth: 460});

  /*requerimos las funcionalidades del footer:

    - Validar Formulario
    - Enviar formulario por ajax
    - Slider captcha
    - Ventana modal

  */
  require('./components/Footer');
}

$( window ).resize(media_query);