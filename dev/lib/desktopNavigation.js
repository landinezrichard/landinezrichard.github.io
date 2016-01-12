var desktopNavigation = (function () {
	/* Dependencias*/

	const menuList = document.querySelector(".MainMenu-list");

	function suscribeEvents () {
		menuList.addEventListener('click',onClickMenu, false);
	}

	function onClickMenu (event) {
		event.preventDefault();
						
		let item   = event.target;
		let attr   = item.getAttribute("href");
		let itemId = '';

		if(typeof attr !== "undefined" && attr !== null){
			itemId = attr.split("#").pop();
		}
		else{
			itemId = item.parentNode.parentNode.getAttribute("href").split("#").pop();
		}
		if( itemId === "yo" || itemId === "perfil" ){
			window.scrollTo(0, -10);
		}
		if( itemId === "conocimientos"){
			window.scrollTo(0, 363);
		}
		if( itemId === "trabajo"){
			window.scrollTo(0, 952);
		}
		if( itemId === "contacto"){
			window.scrollTo(0, 2500);
		}
		console.log(itemId);		
    }

    return {
		init : function () {
			suscribeEvents();
		}
	};

})();

module.exports = desktopNavigation;