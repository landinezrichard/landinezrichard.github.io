var $MenuButton = document.querySelector(".MainMenu-button");
var $MenuButtonText = document.querySelector(".MainMenu-buttonText");

function showMenu(){
    var listaClases = $MenuButton.classList;
    var laTiene = 0;
    
    for(var i=0; i<listaClases.length; ++i){
        if(listaClases[i] === "is-active"){            
            laTiene = 1;      
            $MenuButton.classList.remove("is-active");
            $MenuButtonText.innerHTML = "Menu";
        }
    }

    if(laTiene === 0){
        $MenuButton.classList.add("is-active");   
        $MenuButtonText.innerHTML = "Close Menu";
    }
}

$MenuButton.addEventListener("click",showMenu);