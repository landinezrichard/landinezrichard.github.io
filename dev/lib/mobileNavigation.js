var mobileNavigation = (function () {
	/* Dependencias*/
	let $ = require('jquery');
	const Dragend = require('./dragend.js');	 

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

	//let menuLinks = document.querySelectorAll(".MainMenu-link");
	let menuLinks = document.querySelector(".MainMenu-list");

	//obtenemos el contenedor de las paginas para iniciar Dragend
	var $container = document.querySelector(".MainContainer");	

	let dragend;	

	function getSections(secciones,size){
		for(let i = 0; i < size; i++){
			secciones[i].elemento = document.querySelector(`#${secciones[i].id}`);		
		}	
	} 
	
	function menuNavigate(elements){
		$(elements).on("click","a",function (event) {
			//evitamos comportamiento por defecto, para que no viaje a los href=#id	    	
	        event.preventDefault();	        
	        //obtenemos el href, y eliminamos el "#"
	        let pos = this.getAttribute("href");
	        pos = pos.split("#").pop();
	        //obtenemos la posición de la seccion, buscando en el objeto secciones, luego dragend como las enumera desde la 1, le sumamos la unidad
	        let index = getIndex(pos)+1;
	        // fn();
	        //hacemos scroll hasta la seccion correspondiente 
	        dragend.scrollToPage(index);                 
		});	  
	}

	function getIndex(busqueda){
	  for(let i=0; i< sectionsSize;i++){
	    if(secciones[i].id === busqueda)
	        return i;
	  }
	}

	// function initialize (fn) {
	function initialize () {
		//le pasamos el objeto secciones, y por cada id, obtenemos el elemento del DOM, y se guarda en el mismo objeto.
		getSections(secciones, sectionsSize);
		
		dragend = new Dragend($container);
		//Nos encargamos de la navegacion "dragend" en el menu
		// menuNavigate(menuLinks,fn);
		menuNavigate(menuLinks);
	}

	function getDrag () {
		return dragend;
	}

	function removeDrag () {
		dragend.destroy();
	}

	return {
		init : function () {
			// function (fn) {
			// initialize(fn);
			initialize();
		},
		remove : removeDrag,
		getInstance : getDrag
	}

})();

module.exports = mobileNavigation;