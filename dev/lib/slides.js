var slides = (function () {
	/* Dependencias*/
	let $ = require('jquery');
	const rs = require('../components/slides/responsiveslides.js');

	function initialize () {
		$(".rslides").responsiveSlides({maxwidth: 460});
	}

	return {
        init : function () {
            initialize();   
        }
    };

})();

module.exports = slides;