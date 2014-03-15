define(['despritz',], function(despritz) {
	var current_session = despritz.init_session();
	current_session.override('set_word', function(args, old) {
		var session = this;
		old.call(session, args);
	})

	var spritzify_random = function() {
		// get random text
		var test_div = document.getElementById('test');
		var random_index = test_div.children.length * Math.random();
		random_index = Math.floor(random_index);
		var random_text = test_div.children[random_index].innerHTML;

		console.log(random_text);
		// start the session
		current_session.set_text(random_text);
		current_session.start();
	};

	var stop_session = function() {
		current_session.stop();
	}

	// control
	document.getElementById('start').onclick=spritzify_random;
	document.getElementById('stop').onclick=stop_session;
	document.getElementById('speed').onchange=function(e) {
		var new_wpm
			= current_session.wpm
			= document.getElementById('speed_number').innerHTML
			= e.target.value;
	};
	document.getElementById('speed').value=200;
});