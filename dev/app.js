'use strict'
/*Truco para ocultar la barra de URL en el iPhone, Android y otros dispositivos táctiles que tienen una barra de URL disponible para ocultar. 

Tener en cuenta que la página debe ser más larga que la pantalla para que este truco funcione.

	window.scrollTo(0, 1);
*/
window.scrollTo(0, 1);
const Hammer = require('hammerjs');
const mainMenu = require('./components/MainMenu');

let secciones = [
  {
    "id": "yo"    
  },
  {
    "id": "perfil"    
  },
  {
    "id": "trabajo"    
  },
  {
    "id": "contacto"    
  }
];

let sectionsSize = secciones.length; 

function getSections(secciones,size){
	for(let i = 0; i < size; i++){
		secciones[i].elemento = document.querySelector(`#${secciones[i].id}`);		
	}	
} 

getSections(secciones, sectionsSize);

// var $yo = document.querySelector("#yo");

// var $perfil = document.querySelector("#perfil");

// var $trabajo = document.querySelector("#trabajo");

// var $contacto = document.querySelector("#contacto");

var $body = document.querySelector('body');

var bodyTouch = new Hammer($body);

let state = 0;

bodyTouch.on("panleft",showNext);
bodyTouch.on("panright",showPrevious);


function showNext(){
	bodyTouch.off("panleft",showNext);
	//console.log(`A la izquierda- no visto seccion ${state}`);
	let sections = selectSectionRight();	
	if(state === 0){		
		sections[0].classList.add("is-inRight");
		state++;		
	}else{
				
		sections[0].classList.add("is-inLeft");
		sections[0].classList.remove("is-inRight");
		sections[0].classList.add("is-outLeft");
		sections[0].classList.remove("is-inLeft");

		sections[1].classList.add("is-inRight");
	
	}	
	//console.log(`Se muestra la seccion ${state}`);
	setTimeout(function() {
		bodyTouch.on("panleft",showNext);    
    }, 400);
}

function showPrevious(){
	bodyTouch.off("panright",showPrevious);
	//console.log(`A la derecha - no visto seccion ${state}`);
	var sections = selectSectionLeft();	
	if(state !== 0){		
		sections[1].classList.remove("is-inRight");
		
		sections[0].classList.add("is-inLeft");
		sections[0].classList.remove("is-outLeft");
		sections[0].classList.add("is-inRight");
		sections[0].classList.remove("is-inLeft");		
			
	}else{
		sections[0].classList.remove("is-inRight");		
	}	
	//console.log(`Se muestra la seccion ${state}`);
	setTimeout(function() {
		bodyTouch.on("panright",showPrevious);   
    }, 400);
}

// function selectSectionRight(){
// 	if(state === "yo"){
// 		state = "yo";			
// 		return [$perfil];
// 	}
// 	if(state === "perfil"){
// 		state = "trabajo";
// 		return [$perfil , $trabajo];
// 	}
// 	if(state === "trabajo"){
// 		state = "contacto";
// 		return [$trabajo , $contacto];
// 	}
// 	if(state === "contacto"){		
// 		return [$trabajo , $contacto];
// 	}

// }


function selectSectionRight(){
	if(state === 0){
		state = 0;			
		return [secciones[1].elemento];
	}
	if(state > 0 && state < sectionsSize-1){
		state++;
		return [ secciones[state-1].elemento , secciones[state].elemento ];
	}	
	if(state === sectionsSize-1){		
		return [ secciones[state-1].elemento , secciones[state].elemento ];
	}

}

function selectSectionLeft(){
	if(state === 0){					
		return [secciones[1].elemento];
	}
	if(state === 1){
		state--;		
		return [ secciones[1].elemento ];
	}	
	if(state > 1){
		state--;
		return [ secciones[state].elemento , secciones[state+1].elemento ];
	}	

}

// function selectSectionLeft(){
// 	if(state === "yo"){					
// 		return [$perfil];
// 	}
// 	if(state === "perfil"){
// 		state = "yo";
// 		return [$perfil];
// 	}
// 	if(state === "trabajo"){
// 		state = "perfil";
// 		return [$perfil , $trabajo];
// 	}
// 	if(state === "contacto"){
// 		state = "trabajo";		
// 		return [$trabajo , $contacto];
// 	}

// }

let $menuLinks = document.querySelectorAll(".MainMenu-link");

/*Esta funcion tiene el problema que al hacer clicl en el boton del menu, se muestra correctamente, pero al llegar a la seccion 0, y hacer pan para ver la siguiente sección, viaja hasta la ultima que se le hizo click y no a la siguiente.*/
function menuNavigate(elements){
    for(let i = 0; i < elements.length; i++){
        elements[i].addEventListener("click",function (event) {
        	
            event.preventDefault();
            let pos = this.getAttribute("href");
            pos = pos.split("#").pop();
            let index = getIndex(pos);           
            //si el indice es mayor que el estado mostrar siguiente
            //si el indice es menor que el estado mostrar anterior 
            while(index !== state){
            	if(index > state){
            		showNext();
            	}else{
            	    if(index < state){
            	    	showPrevious();            	     
            	    }
            	}
            }            
        });
    }
}

function getIndex(busqueda){
    for(let i=0; i< sectionsSize;i++){
        if(secciones[i].id === busqueda)
            return i;   
    }
}

menuNavigate($menuLinks);