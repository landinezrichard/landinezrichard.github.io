'use strict';

const $ = require('jQuery');

let target  = false,
    tooltip = false,
    title   = false,
    tip     = '';

export function init_tooltip(){
    let targets = $( '[rel~=tooltip]' );
    //antes mouseenter    
    targets.bind( 'mouseover', function()
    {        
        target  = $( this );
        tip = target.attr( 'title' );
        tooltip = $( '<div id="tooltip"></div>' );
 
        if( !tip || tip === '' )
            return false;
 
        target.removeAttr( 'title' );
        tooltip.css( 'opacity', 0 )
               .html( tip )
               .appendTo( '.Knowledge-list' );        
 
        show_tooltip();
        $( window ).resize( function(){
            removeSpecial_tooltip();
            show_tooltip();
        } );        
 
        target.bind( 'mouseleave', remove_tooltip );
        //tooltip.bind( 'click', remove_tooltip );

        //bodyTouch.on( 'tap', remove_tooltip );
        //bodyTouch.on( 'panleft', remove_tooltip );
        //bodyTouch.on( 'panright', remove_tooltip )
    });
}  


function show_tooltip()
{
    if( $( window ).width() < tooltip.outerWidth() * 1.5 )
        tooltip.css( 'max-width', $( window ).width() / 2 );
    else
        tooltip.css( 'max-width', 340 );

    var pos_left = target.offset().left + ( target.outerWidth() / 2 ) - ( tooltip.outerWidth() / 2 ),
        pos_top  = target.offset().top - tooltip.outerHeight() - 20;

    if( pos_left < 0 )
    {
        pos_left = target.offset().left + target.outerWidth() / 2 - 20;
        tooltip.addClass( 'left' );
    }
    else
        tooltip.removeClass( 'left' );

    if( pos_left + tooltip.outerWidth() > $( window ).width() )
    {
        pos_left = target.offset().left - tooltip.outerWidth() + target.outerWidth() / 2 + 20;
        tooltip.addClass( 'right' );
    }
    else
        tooltip.removeClass( 'right' );

    if( pos_top < 0 )
    {
        var pos_top  = target.offset().top + target.outerHeight();
        tooltip.addClass( 'top' );
    }
    else
        tooltip.removeClass( 'top' );

    let animtop = pos_top+10;

    tooltip.css( { left: pos_left, top: pos_top } )
           .animate( { top: animtop, opacity: 1 }, 50 );         
}

export function remove_tooltip()
{
    let animtop = tooltip.css('top')-10;
    tooltip.animate( { top: animtop, opacity: 0 }, 50, function()
    {
        $( this ).remove();
    });

    target.attr( 'title', tip );
}

export function removeSpecial_tooltip()
{
    if(tooltip)
        remove_tooltip();
}