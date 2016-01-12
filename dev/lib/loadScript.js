var loadScript = function (url) {
	var elem = document.createElement('script');
	elem.src = url;
	elem.href = url;
	document.head.appendChild(elem);
}

module.exports = loadScript;