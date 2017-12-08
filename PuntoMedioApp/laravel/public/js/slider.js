//almacenar slider en una variable
var slider = $('#slider');
//almacenar botones
var siguiente = $('#btn-next');
var anterior = $('#btn-prev');

//mover ultima imagen al primer lugar
$('#slider .slider-section:last').insertBefore('#slider .slider-section:first');
//mostrar la primera imagen conw un margen de -100%
slider.css('margin-left', '-' + 100 + '%');

function moverD() {
	slider.animate({
		marginLeft: '-' + 200 + '%'
	} ,700, function(){
		$('#slider .slider-section:first').insertAfter('#slider .slider-section:last');
		slider.css('margin-left', '-' + 100 +'%');
	});
}

function moverI() {
	slider.animate({
		marginLeft:0
	} ,700, function(){
		$('#slider .slider-section:last').insertBefore('#slider .slider-section:first');
		slider.css('margin-left', '-'+100+'%');
	});
}

function autoplay() {
	interval = setInterval(function(){
		moverD();
	}, 5000000);
}
siguiente.on('click',function() {
	moverD();
	clearInterval(interval);
	autoplay();
});

anterior.on('click',function() {
	moverI();
	clearInterval(interval);
	autoplay();
});


autoplay();