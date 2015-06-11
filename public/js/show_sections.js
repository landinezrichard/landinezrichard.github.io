var $yo = document.querySelector("#yo");

var $perfil = document.querySelector("#perfil");

var $trabajo = document.querySelector("#trabajo");

var $contacto = document.querySelector("#contacto");

var $body = document.querySelector('body');

var bodyTouch = new Hammer($body);

var state = "yo";

bodyTouch.on("panleft",showNext);
bodyTouch.on("panright",showPrevious);


function showNext(){
	bodyTouch.off("panleft",showNext);
	var sections = selectSectionRight();	
	if(state === "yo"){		
		sections[0].classList.add("is-inRight");
		state = "perfil";		
	}else{
				
		sections[0].classList.add("is-inLeft");
		sections[0].classList.remove("is-inRight");
		sections[0].classList.add("is-outLeft");
		sections[0].classList.remove("is-inLeft");

		sections[1].classList.add("is-inRight");
	
	}
	setTimeout(function() {
		bodyTouch.on("panleft",showNext);    
    }, 400);
}

function showPrevious(){
	bodyTouch.off("panright",showPrevious);
	var sections = selectSectionLeft();
	//console.log(state);
	if(state !== "yo"){
		//debugger
		sections[1].classList.remove("is-inRight");
		
		sections[0].classList.add("is-inLeft");
		sections[0].classList.remove("is-outLeft");
		sections[0].classList.add("is-inRight");
		sections[0].classList.remove("is-inLeft");		
			
	}else{
		sections[0].classList.remove("is-inRight");		
	}
	setTimeout(function() {
		bodyTouch.on("panright",showPrevious);   
    }, 400);
}

function selectSectionRight(){
	if(state === "yo"){
		state = "yo";			
		return [$perfil];
	}
	if(state === "perfil"){
		state = "trabajo";
		return [$perfil , $trabajo];
	}
	if(state === "trabajo"){
		state = "contacto";
		return [$trabajo , $contacto];
	}
	if(state === "contacto"){		
		return [$trabajo , $contacto];
	}

}

function selectSectionLeft(){
	if(state === "yo"){					
		return [$perfil];
	}
	if(state === "perfil"){
		state = "yo";
		return [$perfil];
	}
	if(state === "trabajo"){
		state = "perfil";
		return [$perfil , $trabajo];
	}
	if(state === "contacto"){
		state = "trabajo";		
		return [$trabajo , $contacto];
	}

}