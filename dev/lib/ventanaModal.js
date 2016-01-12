var ventanaModal = (function () {
	/* Dependencias*/
	let $ = require('jquery');
	//para la ventana modal
	require('remodal');

	const cajaModal = '.remodal-bg';
	let modal;
	//datos para hacer el html usando jade
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

	let modal_template = require('../components/modal/template.jade');

	function crearModal (datos) {
		$(cajaModal).append( modal_template(datos) );		
		modal = $('[data-remodal-id='+datos.id+']').remodal();
	}

	function abrirModal () {
		modal.open();
	}

	function crearSuccess () {
		crearModal(modal_data.modal1);
	}

	function crearError () {
		crearModal(modal_data.modal2);
	}

	return {
        modalOk   : crearSuccess,
        modalErr  : crearError,
        openModal : abrirModal
    };

})();

module.exports = ventanaModal;