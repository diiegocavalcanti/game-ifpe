	// Cria um elemento DIV
	var nave = document.createElement('div'); 
	// Cria um atributo CLASS
	var classe = document.createAttribute('class');
	// Seta um valor ao atributo criado
	classe.value = 'nave';
	// Seta o atributo criado ao elemento criado
	nave.setAttributeNode(classe);
	// Posiciona o elemento pelo Bottom
	$(nave).css('bottom', '20px');
	// Posiciona o elemento pelo Left
	$(nave).css('left', $(window).width()/2 - 20 + 'px');
	// Adiciona o elemento ao container do jogo
	$(nave).css('background-image', 'url(images/nave.svg)');
	// Adiciona o elemento ao container do jogo
	$('#container').append(nave);

	var velocidade = 2000;
	var duracao = 5000;
	var pontos = 0;
	var estagio = 1;
	var naveBg = true;


	setInterval(function(){
		if(naveBg == true){
			$(nave).css('background-image', 'url(images/nave_2.svg)');
			naveBg = false;
		}else{
			$(nave).css('background-image', 'url(images/nave.svg)');
			naveBg = true;
		}
	}, 500);


	
	var time = function(){
	
		if(play != false){
			pontos = pontos + 10;

			if(pontos > (estagio*100)){
				estagio ++;
				
				if(velocidade > 1000){
					velocidade = velocidade - 100;
				}else{
					if(velocidade > 100){
						velocidade = velocidade - 10;
					}else{
						velocidade = velocidade - 1;
					}
				}
				if(duracao > 1000){
					duracao = duracao - 100;
				}else{
					if(duracao > 100){
						duracao = duracao - 10;
					}else{
						duracao = duracao - 1;
					}
				}
			}

			$('.pontos').html(pontos);
			$('.estagio').html(estagio);
			$('.velocidade').html(velocidade);
			$('.duracao').html(duracao);
			newPlanet();
			setTimeout(time, velocidade);
		}

	}


	
	var play = setTimeout(time(), velocidade);


function newPlanet(){

	var planet = document.createElement('div');
	var classePlanet = document.createAttribute('class');
	classePlanet.value = 'planets tam-'  + Math.floor(Math.random() * 3 + 1) +' planet-'+ Math.floor(Math.random() * 5 + 1);
	planet.setAttributeNode(classePlanet);
	var ppx = Math.floor(Math.random() * $(window).width());

	if(ppx < 200){
		ppx = 200;
	}else if(ppx > ($(window).width() - 200)){
		ppx = $(window).width() - 200;
	}

	$(planet).css('margin-left', ppx);

	$('#container').append(planet);

	movimentoPlanet(planet);

}

function movimentoPlanet(planet){
	$(planet).animate({
		'margin-top': $(window).height()
	}, {
			duration: duracao,
			easing: 'linear',
			complete: function(){
				$(planet).remove();
				
			},
			progress: function(){
				colisao(planet);
			}
	});
}

function colisao(planet){
	var posPlanetX = Math.round($(planet).offset().left);
	var posPlanetY = Math.round($(planet).offset().top);
	var tamPlanet = parseInt($(planet).css('height'));
	var posNaveX = $('.nave').offset().left;
	var posNaveY = $('.nave').offset().top;

	if(posNaveX >= (posPlanetX + 20 )&& posNaveX <= (posPlanetX + (tamPlanet - 20))){
		if(posNaveY >= (posPlanetY + 20)  && posNaveY <= (posPlanetY + (tamPlanet - 20))){
			stopGame();
			gameOver();
		}
	}
}

function stopGame(){
	$('.planets').remove();
	clearTimeout(play);
	play = false;
	$('#container').removeClass('bg-animation');
	
}

function gameOver(){
	$('.mensagem h2').html('Você perdeu :(');
	$('.mensagem h3').html('Sua pontuação: ' + pontos);	

	var l = parseInt($('.mensagem').css('width')) / 2;
	var t = parseInt($('.mensagem').css('hright')) / 2;
	$('.mensagem').css('margin-left', -l);
	$('.mensagem').css('margin-top', -t);
	$('.mensagem').fadeIn(400);
}



function getLeft(){
	var left = nave.style.marginLeft;
	return parseInt(left.replace(/[^0-9]/g,''));
}

function getBottom(){
	var bottom = nave.style.bottom;
	return parseInt(bottom.replace(/[^0-9]/g,''));
}


$(document).on('keypress', function(event){

	event.preventDefault();
	
	if(event.keyCode == 119){
		nave.style.bottom = getBottom() + 15 + 'px';
	}
	if(event.keyCode == 115){
		nave.style.bottom = getBottom() - 15 + 'px';
	}
	if(event.keyCode == 97){
		if($('.nave').offset().left >= 0){
			$('.nave').css('left', $('.nave').offset().left - 15 + 'px');
		}
	}
	if(event.keyCode == 100){
		if($('.nave').offset().left <= ($(window).width() - 40)){
			$('.nave').css('left', $('.nave').offset().left + 15 + 'px');
		}
		
		
	}
	if(event.keyCode == 32){
		window.location.reload();
	}
});

