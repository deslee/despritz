define(['despritz',], function(despritz) {
	despritz.initialize();

	var current_session;

	var spritzify_random = function() {
		var test_div = document.getElementById('test');
		var random_index = test_div.children.length * Math.random();
		random_index = Math.floor(random_index);

		var random_text = test_div.children[random_index].innerHTML;
		current_session = despritz.spritzify({}, random_text);
	};

	despritz.default_session.wpm = document.getElementById('speed').value;

	document.getElementById('start').onclick=spritzify_random;
	document.getElementById('stop').onclick=despritz.stop;
	document.getElementById('speed').onchange=function(e) {
		var new_wpm
			= despritz.default_session.wpm
			= document.getElementById('speed_number').innerHTML
			= e.target.value;
		if(current_session) {
			current_session.wpm = new_wpm;
		}
	};
});