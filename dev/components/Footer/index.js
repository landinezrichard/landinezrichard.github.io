'use strict'

let $ = require('jquery');

require('../../lib/validate/jquery.validate.js');
require('../../lib/validate/additional-methods.js');

$('#contact_form').validate({
    rules :{
        email : {
            required : true, //para validar campo vacio
            email    : true  //para validar formato email
        },
        nombre : {
            required  : true,
            minlength : 3, //para validar campo con minimo 3 caracteres
            nowhitespace : true           
        },
        mensaje : {
            required     : true,
            minlength    : 5,
            nowhitespace : true
        }
    },
    messages : {
        email : {
            required : "Debe ingresar el email",
            email    : "Debe ingresar un email valido"
        },
        nombre : {
            required  : "Debe ingresar un nombre",
            minlength : "EL nombre debe tener un minimo de 3 caracteres",
            nowhitespace : "No se permiten espacios en blanco"
        },
        mensaje : {
            required    : "Debe ingresar un mensaje",
            minlength   : "EL mensaje debe tener un minimo de 5 caracteres",
            nowhitespace : "No se permiten espacios en blanco"
        }
    }
}); 

/*
Importante : 
 No olvidar agregar el atributo name a todos campos y combos del formulario.
Los combos deben tener una opción con el atributo value = “”


*/