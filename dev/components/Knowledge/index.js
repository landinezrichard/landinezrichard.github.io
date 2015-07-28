const Tooltips = require('../tooltips/tooltip.js');

//iniciamos los tooltips
Tooltips.init_tooltip();

let $Knowledge = document.querySelector('.Knowledge');

//cerramos los tooltips cuando hacemos click en la sección Knowledge
$Knowledge.addEventListener('click', Tooltips.removeSpecial_tooltip);