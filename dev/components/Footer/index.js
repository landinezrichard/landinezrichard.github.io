'use strict'

let $ = require('jquery');

//para enviar el formulario por ajax
require('../../lib/jquery.form.js');

//para validar el formulario
require('../../lib/validate/jquery.validate.js');
require('../../lib/validate/additional-methods.js');

//para el slider captcha
const Dragdealer = require('dragdealer').Dragdealer;

//para la ventana modal
require('remodal');

let modal_data = {
    "modal1": {
        "id"     : "modal1",
        "titulo" : "Enviado!!!",
        "mensaje": "Tu mensaje ha sido enviado, en poco tiempo me pondré en contacto contigo."
    },
    "modal2": {
        "id"     : "modal2",
        "titulo" : "Ups!!!",
        "mensaje": "Parece que algo ha salido mal… Intenta enviar tu mensaje nuevamente."
    }
};

let modal_template = require('../modal/template.jade');

let ajax_options = {     
    url : 'http://landinezrichard.tk/enviarCorreo.php',
    type: 'POST',
    success:    function() {
        $('.remodal-bg').append( modal_template(modal_data.modal1) );
        let modal = $('[data-remodal-id=modal1]').remodal();

        /**
         * Opens the modal window
         */
        modal.open();
        //alert('Thanks for your comment!');
        $('#contact_form').resetForm();
    },
    error: function(){
        $('.remodal-bg').append( modal_template(modal_data.modal2) );
        let modal = $('[data-remodal-id=modal2]').remodal();
        modal.open();
    }
};

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
    },
    submitHandler: function(form) {
        $(form).ajaxSubmit(ajax_options);        
    }
}); 

/*
Importante : 
 No olvidar agregar el atributo name a todos campos y combos del formulario.
Los combos deben tener una opción con el atributo value = “”


*/

let sub_button = `<button type="submit" class="Footer-button">
                    Contactarme
                </button>`;

new Dragdealer('iPhone-slider',{
    steps : 2,
    callback: function(x, y) {
        // Only 0 and 1 are the possible values because of "steps: 2"
        //desaparecemos el slider y aparecemos el boton para enviar el formulario
        if (x) {
            this.disable();
            $('.iphone-slider').fadeOut();
            $('#contact_form').append(sub_button);
        }
    }
});