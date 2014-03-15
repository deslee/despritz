define(['despritz',], function(despritz) {
	var session = despritz.init_session(),
		reticle = document.getElementById('reticle');

	session.override('set_word', function(args, old) {
		var session = this;
		old.call(session, args);

		var pivot_text = session.get_pivot_letter();

		session.elements.box.style.left =
			reticle.offsetLeft - pivot_text.offsetLeft - pivot_text.offsetWidth/2 + 'px'
	})

	session.elements.box = document.getElementById('box');

	session.set_text(document.getElementById('text').innerHTML)
	session.start();
});