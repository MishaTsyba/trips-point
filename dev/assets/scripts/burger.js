"use strict";
$(document).ready(function() {
	$(document).on('click', '.burger', function(){
		var nav = $('.menu');
		$('.burger').toggleClass('active');
		nav.toggleClass('show');
	});
});