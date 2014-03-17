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
	session.update();

	var body = document.getElementsByTagName('body')[0],
	killEvents = function(evt) {
		evt.stopPropagation();
		evt.preventDefault();
	}, fileSelect = document.getElementById('file');

	['draginit','dragstart','dragover','dragleave','dragenter','dragend','drag','drop'].forEach(function(e){
  		body.addEventListener(e, killEvents);
  	})

  	body.addEventListener('dragenter', function(e) {
  	}, false);

  	body.addEventListener('drop', function(e) {
  		var file = e.dataTransfer.files[0],
  		reader = new FileReader();

  		var text = reader.readAsText(file);
  		reader.onloadend = function(e) {
  			var text = e.target.result;
  			session.set_text(text);
  			session.set_index(0);
  			session.start();
  		}
  	}, false);

});