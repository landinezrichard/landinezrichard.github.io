"use strict";
/*Truco para ocultar la barra de URL en el iPhone, Android y otros dispositivos táctiles que tienen una barra de URL disponible para ocultar. 

Tener en cuenta que la página debe ser más larga que la pantalla para que este truco funcione.

	window.scrollTo(0, 1);
*/
window.scrollTo(0, 1);
//const Hammer = require('hammerjs');
//const mainMenu = require('./components/MainMenu');
//const Dragend = require('./js/lib/dragend.js');

//le pasamos el objeto secciones, y por cada id, obtenemos el elemento del DOM, y se guarda en el mismo objeto.
function getSections(secciones, size) {
  for (var i = 0; i < size; i++) {
    secciones[i].elemento = document.querySelector("#" + secciones[i].id);
  }
}

function menuNavigate(elements) {
  for (var i = 0; i < elements.length; i++) {
    //asignamos el evento click a cada enlace del menu
    elements[i].addEventListener("click", function (event) {
      //evitamos comportamiento por defecto, para que no vieja a los href=#id  	
      event.preventDefault();
      //obtenemos el href, y eliminamos el "#"
      var pos = this.getAttribute("href");
      pos = pos.split("#").pop();
      //obtenemos la posición de la seccion, buscando en el objeto secciones, luego dragend como las enumera desde la 1, le sumamos la unidad
      var index = getIndex(pos) + 1;
      //hacemos scroll hasta la seccion correspondiente
      dragend.scrollToPage(index);
    });
  }
}

function getIndex(busqueda) {
  for (var i = 0; i < sectionsSize; i++) {
    if (secciones[i].id === busqueda) return i;
  }
}

function moveUp() {
  bodyTouch.off("pandown", moveUp);
  //hace scroll hasta arriba
  window.scrollTo(0, -10);
  setTimeout(function () {
    bodyTouch.on("pandown", moveUp);
  }, 400);
}

function moveDown() {
  bodyTouch.off("panup", moveDown);
  //console.log(window.innerHeight);
  //hace scroll de 100 px cada vez	
  window.scrollBy(0, 100);
  setTimeout(function () {
    bodyTouch.on("panup", moveDown);
  }, 400);
}

var secciones = [{
  "id": "yo"
}, {
  "id": "perfil"
}, {
  "id": "trabajo"
}, {
  "id": "contacto"
}];

//guardamos el tamaño del objeto secciones, para no estar calculandolo
var sectionsSize = secciones.length;

getSections(secciones, sectionsSize);

//Convertimos el body en un receptor de eventos touch
var $body = document.querySelector("body");
var bodyTouch = new Hammer($body);
//activamos el pan vertical
bodyTouch.get("pan").set({ direction: Hammer.DIRECTION_VERTICAL });

bodyTouch.on("panup", moveDown);
bodyTouch.on("pandown", moveUp);

var $menuLinks = document.querySelectorAll(".MainMenu-link");

var $container = document.querySelector(".MainContainer");
var dragend = new Dragend($container);

menuNavigate($menuLinks);