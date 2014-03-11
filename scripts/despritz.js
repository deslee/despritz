define(['findpivot'], function(pivot) {
	String.prototype.replaceAt=function(index, text) {
    	return this.substr(0, index) + text + this.substr(index+1);
	}

	var options = {
		box: document.getElementById('box'),
		reticle: document.getElementById('reticle'),
	}


	Session = function(text) {
		this.words = text.split(' ');
	}
	var current_session = {};

	Session.prototype = {
		index: 0,
		wpm: 200,
		next_timeout: undefined,
		running: true,
	}

	var generate_letter_element = function(c, pivot) {
		var letter = document.createElement('span');
		letter.className = pivot ? 'pivot' : 'letter';
		letter.innerHTML = c;
		return letter
	}

	var set_word = function(word) {
		var pivot_index = pivot(word);
		var pivot_char = word.charAt(pivot_index);
		var pivot_elem;
		options.box.innerHTML = '';
		word.split('').forEach(function(character, index) {
			var child = 
				options.box.appendChild
					(generate_letter_element(character, index == pivot_index));
			if (index == pivot_index) {
				pivot_elem = child;
			}
		});

		var pivot_width = pivot_elem.offsetWidth;
		var pivot_offset = pivot_elem.offsetLeft;
		var span_offset = options.reticle.offsetLeft;
		document.getElementById('box').style.left =
			span_offset - pivot_offset - pivot_width/2 + 'px'

		options.box.style.left = + 'px'
	}

	var update = function(session, recurse) {
		var word = session.words[session.index];
		if (recurse === undefined) {
			recurse = true;
		}
		if (word == undefined) {
			return stop();
		}
		set_word(word);
		next_timeout = setTimeout(function() {
			session.index = session.index + 1;
			if (recurse && session.running) {
				update(session);
			}
		}, 60000/session.wpm);
	}

	var stop = function() {
		if (current_session !== undefined) {
			current_session.running = false;
			clearTimeout(current_session.next_timeout);
		}
	}

	return {
		initialize: function(opts) {
			options.box.className = options.box.className + ' despritz box';
		},
		set_word: set_word,
		stop: stop,
		default_session: Session.prototype,
		spritzify: function(session, text) {
			stop();
			current_session = new Session(text);
			update(current_session);
			return current_session;
		},
	};
});
