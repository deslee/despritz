define(['despritz'], function(despritz) {
	var session = despritz.init_session(),
		reticle = document.getElementById('reticle'),
		before = document.getElementById('before'),
		after = document.getElementById('after'),
		seeker = document.getElementById('seeker');

	s = session;
	document.getElementById('start').onclick = function(e) {
		e.preventDefault();
		session.start();
	}
	document.getElementById('stop').onclick = function(e) {
		e.preventDefault();
		session.stop();
	}

	session.override('set_word', function(args, old) {
		var session = this;
		old.call(session, args);

		var pivot_text = session.get_pivot_letter();

		session.elements.box.style.left =
			reticle.offsetLeft - pivot_text.offsetLeft - pivot_text.offsetWidth/2 + 'px'

		seeker.value = session.index;

		before.innerHTML = session.get_text_before();
		after.innerHTML = session.get_text_after();
	});

	seeker.onchange = function(e) {
		session.set_index(e.target.value);
	}

	document.getElementById('speed').onchange=function(e) {
		session.wpm 
			= document.getElementById('speed_number').innerHTML
			= e.target.value;
	};

	session.elements.box = document.getElementById('box');

	session.set_text(document.getElementById('text').innerHTML)
	seeker.max = session.words.length;
	session.start();
});