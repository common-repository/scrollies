/*!  
    Scrollies  
    Copyright (C) 2020 Roman Flossler - SSG is Licensed under GPLv3  
*/


var scrollies = {}

scrollies.scrollPos = window.pageYOffset;
scrollies.noRunning = false;
scrollies.speedUpCounter = 0;
scrollies.speedDownCounter = 0;
scrollies.firstRun = true;


scrollies.runAnimation = function() {
    if (scrollies.noRunning) return;
    window.isScrolling && window.clearTimeout( window.isScrolling );

    scrollies.firstRun && jQuery('.leg').addClass('play');
    scrollies.firstRun = false;
    
    // direction of the sheep
    if ( window.pageYOffset > scrollies.scrollPos ) {
            jQuery('.scrollies').removeClass('runningUp');
    } else {
            jQuery('.scrollies').addClass('runningUp');
    }

    // Speed of the sheep
    if ( Math.abs(window.pageYOffset - scrollies.scrollPos)  > 9 ) {
            scrollies.speedUpCounter++;
            scrollies.speedDownCounter = 0;
    }  else {
            scrollies.speedDownCounter++;
            scrollies.speedUpCounter=0;
    }
    if ( scrollies.speedDownCounter > 3 ) {
        jQuery('.leg').addClass('speedDown');
    } else if ( scrollies.speedUpCounter > 3 )  {
        jQuery('.leg').removeClass('speedDown');
    }

    
    scrollies.scrollPos = window.pageYOffset;
    window.isScrolling = setTimeout(function() {
        jQuery('.leg').removeClass('play');
        jQuery('.leg').addClass('stop');
        scrollies.firstRun = true;
        setTimeout(function () {jQuery('.leg').removeClass('stop');}, 50);
    }, 333 );
}

scrollies.runaway = function(event) {
    var actualPos = ( parseInt( jQuery(this).css('top')) / window.innerHeight ) * 100;
    var delta =  ( ( Math.random() * 5 + 8 ) * ( Math.random() < 0.5 ? -1 : 1 ) );
    var newPos = actualPos + delta;
    if (newPos > 90) {
        newPos = newPos - 24;
        delta = -1
    } else if (newPos < 10) {
        newPos = newPos + 24;
        delta = 1
    }	
	
	jQuery('#' + event.currentTarget.id + ' .leg').removeClass('speedDown');	
	jQuery(this).css('top', newPos + 'vh');
	jQuery('#' + event.currentTarget.id + ' .leg').addClass('play');	
    if ( delta > 0 ) {
        jQuery(this).removeClass('runningUp');
    } else {
        jQuery(this).addClass('runningUp');
	}
	
	
	if ( event.type == 'click' ) stopRunning(event);
}

scrollies.stopRunning = function(event) {
    setTimeout( function() {
		jQuery('#' + event.currentTarget.id + ' .leg').removeClass('play'); 
        jQuery('#' + event.currentTarget.id + ' .leg').addClass('stop'); 
    }, 666);
    setTimeout( function() {
        jQuery('#' + event.currentTarget.id + ' .leg').removeClass('stop'); 
    }, 681);
}


