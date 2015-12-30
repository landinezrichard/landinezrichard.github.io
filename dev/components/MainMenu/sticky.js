const $ = require('jQuery');

var  mn = $(".MainMenu"),
    mns = "MainMenu-sticky",
    hdr = $('header').height();

$(window).scroll(function() {
  if( $(this).scrollTop() > hdr ) {
    mn.addClass(mns);
  } else {
    mn.removeClass(mns);
  }
});

// var  mn = $(".MainMenu"),
// 	btn = $(".MainMenu-button"),
//     mns = "MainMenu-sticky",
//     hdr = $('header').height(),
//     onCanvas = "oncanvas",
//     offCanvas = "offcanvas";

// $(window).scroll(function() {
//   if( $(this).scrollTop() > hdr ) {
//     mn.addClass(mns);
//     setTimeout(function(){
//     	mn.addClass(offCanvas);
//     }, 500);
//   } else {
//     mn.removeClass(offCanvas);
//     mn.removeClass(mns);
//   }
// });