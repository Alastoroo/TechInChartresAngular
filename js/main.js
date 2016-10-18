function redirectToMeetUp() {
    window.location.href = "https://secure.meetup.com/oauth2/authorize?client_id=ejmd7jeh2q0f6no4iutmhijrui&response_type=code&redirect_uri=http://rxdesign.io";
}

var countDown_animation_duration = 500;
// Fonction jQuery qui sert à savoir QUAND un élement n'est plus visible dans la fenêtre.
// Ici, on s'en sert pour savoir QUAND, le div avec le compte a rebours central n'est plus
// visible, c'est à dire QUAND on scroll et que le div est remonté, on ne le voit plus
// ducoup on affiche le compte a rebours dans la navbar.
// (Cette fonction est "complexe" à lire, si vous ne la comprenez pas, c'est légitime. Moi non plus.)
jQuery.expr.filters.offscreen = function(el) {
  var rect = el.getBoundingClientRect();
  return (
           (rect.left + rect.width) < 0
             || (rect.top + rect.height) < 0
             || (rect.left > window.innerWidth || rect.top > window.innerHeight)
         );
  	// En faite, elle créée un nouveau filtre jQuery qui retourne true ou false si un élement
  	// est caché ou pas en fonction de ses coordonnées.
};




// Ici on vient choper l'EVENEMENT scroll de la fenêtre "WINDOW".
// C'est à dire qu'a chaque ligne de pixels affichés en descendant ou montant
// dans la fenêtre, le code qu'on met en dessous sera exécuté.
$(window).on("scroll touchmove mousewheel", function(e){
	// Si par exemple je mettais un "console.log('test');" ici, le mot "test" serait affiché plein
	// de fois, a chaque scroll sur la page.

	// Ici on a une condition, on regarde si le compte a rebours centrale est
	// Caché, c'est à dire si on a scrollé et qu'il n'est plus visible.


	if($('#countDown').is(':offscreen')) { // SI le compte a rebours et caché, ALORS :

		//if(!$('#countDown_navbar').is(':animated')) {
    		e.preventDefault();
    		e.stopPropagation();
    		$('#countDown_navbar').animate({
				'right': '0px'
			}, {duration: countDown_animation_duration, queue: false});
			// Du faite que le compte a rebours de la navbar vienne, on décale les boutons de la
			// navbar, sinon ils seraient en dessous le compte a rebours (le bloc vert)
			// On anime une marge sur le div qui contient nos boutons
			$('#navbar_button_container').animate({
				'margin-right': '245px'
			}, {duration: countDown_animation_duration, queue: false});
  		// }
			// Ici on dit que le compte a rebours de la navbar doit s'animer et venir de la gauche


	}
	else {
		// Dans le else (sinon), on a le cas OÙ le compte a rebours central est affiché
		// Si par exemple on était en bas de page et qu'on remonte; Ducoup on va faire l'inverse
		// du if (SI) en haut, on va cacher le compte a rebours de la navbar et remettre les boutons
		// en place.
		// if(!$('#countDown_navbar').is(':animated')) {
			e.preventDefault();
    		e.stopPropagation();
			$('#countDown_navbar').animate({
				'right': '-245px'
			}, {duration: countDown_animation_duration, queue: false});

			$('#navbar_button_container').animate({
				'margin-right': '0px'
			}, {duration: countDown_animation_duration, queue: false});
		// }
	}
});
