
let $ = require('jquery');

//para enviar el formulario por ajax
require('../../lib/jquery.form.js');

//para validar el formulario
require('../../lib/validate/jquery.validate.js');
require('../../lib/validate/additional-methods.js');

const ventanaModal = require('../../lib/ventanaModal.js');

let ajax_options = {     
    url : 'http://landinezrichard.tk/enviarCorreo.php',
    type: 'POST',
    success:    function() {
        // $('.remodal-bg').append( modal_template(modal_data.modal1) );
        // let modal = $('[data-remodal-id=modal1]').remodal();

        // /**
        //  * Opens the modal window
        //  */
        // modal.open();
        //alert('Thanks for your comment!');
        ventanaModal.modalOk();
        ventanaModal.openModal();
        $('#contact_form').resetForm();
    },
    error: function(){
        // $('.remodal-bg').append( modal_template(modal_data.modal2) );
        // let modal = $('[data-remodal-id=modal2]').remodal();
        // modal.open();
        ventanaModal.modalErr();
        ventanaModal.openModal();
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
		if(captcha()){
			$(form).ajaxSubmit(ajax_options); 
		}
		// $(form).ajaxSubmit(ajax_options);        
    }
}); 

/*
Importante : 
 No olvidar agregar el atributo name a todos campos y combos del formulario.
Los combos deben tener una opción con el atributo value = “”

*/

// let sub_button = `<button type="submit" class="Footer-button">
//                     Contactarme
//                 </button>`;

// var v = grecaptcha.getResponse();
// if(v.length != 0)
// {
// 	$('#contact_form').append(sub_button);
// }

function captcha () {	
    var captcha = $('#g-recaptcha-response').val();
    var mensaje = `<label id="captcha-error" class="error" for="g-recaptcha">Captcha requerido</label>`;

    if(typeof captcha !== "undefined" && captcha !== null){

		if (captcha.length <= 0) {
			//error
			// console.log("Captcha requerido");
			// $('.g-recaptcha').append(mensaje);
			return false;
		}
		if(captcha.length > 0){
			// console.log("Captcha OK!!!");
			// $('#captcha-error').remove();
			return true;			
		}
	}
}
