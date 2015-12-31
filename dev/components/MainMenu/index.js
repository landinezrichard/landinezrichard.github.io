var showMenu = (function () {

    const btnMenu = document.querySelector(".MainMenu-button");
    const menuText = document.querySelector(".MainMenu-buttonText");

    function suscribeEvents () {
        btnMenu.addEventListener('click',onClickMenu);
    }

    function onClickMenu () {
        btnMenu.classList.toggle('is-active');        
    }

    return {
        init : function () {
            suscribeEvents();
        },
        close : onClickMenu
    };

})();

module.exports = showMenu;