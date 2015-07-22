'use strict'
const Hammer = require('hammerjs');
const mainMenu = require('./components/MainMenu');
const Tooltips = require('./components/tooltips/tooltip.js');    
const Dragend = require('./lib/dragend.js');

/*Truco para ocultar la barra de URL en el iPhone, Android y otros dispositivos táctiles que tienen una barra de URL disponible para ocultar. 

Tener en cuenta que la página debe ser más larga que la pantalla para que este truco funcione.

	window.scrollTo(0, 1);
*/
window.scrollTo(0, 1);

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

getSections(secciones, sectionsSize);

//Convertimos el body en un receptor de eventos touch
var $body = document.querySelector('body');
let bodyTouch = new Hammer($body);
//activamos el pan vertical
bodyTouch.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });

bodyTouch.on("panup",moveDown);
bodyTouch.on("pandown",moveUp);

let $menuLinks = document.querySelectorAll(".MainMenu-link");

var $container = document.querySelector(".MainContainer");
let dragend = new Dragend($container); 

Tooltips.init_tooltip();
var $Knowledge = document.querySelector('.Knowledge');
$Knowledge.addEventListener('click', Tooltips.removeSpecial_tooltip);

menuNavigate($menuLinks);

//le pasamos el objeto secciones, y por cada id, obtenemos el elemento del DOM, y se guarda en el mismo objeto.
function getSections(secciones,size){
	for(let i = 0; i < size; i++){
		secciones[i].elemento = document.querySelector(`#${secciones[i].id}`);		
	}	
} 

function menuNavigate(elements){
  for(let i = 0; i < elements.length; i++){
    //asignamos el evento click a cada enlace del menu
    elements[i].addEventListener("click",function (event) {
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