var changeHeader = (function () {
	/*Dependencia*/
	require('./optimizedScroll.js')

	const header = document.querySelector('.Header');
	const clase  = 'Header--light';	
		
	function suscribeEvents () {		
		window.addEventListener("optimizedScroll", onScroll);
	}

	function onScroll () {
		let listaClases = header.classList;		

		if(window.scrollY >= 200){
			if(!hasClass(header, clase)){
				listaClases.add(clase);
			}			
		} else{
			if(hasClass(header, clase)){
				listaClases.remove(clase);				
			}
		}
	}

	function hasClass(element, cls) {
    	return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
	}

	return {
		init : function () {
			suscribeEvents();	
		} 
	};	
})();

module.exports = changeHeader;