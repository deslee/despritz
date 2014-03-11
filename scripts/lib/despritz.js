define(function() {
	String.prototype.replaceAt=function(index, text) {
    	return this.substr(0, index) + text + this.substr(index+1);
	}

	var options = {
		box: document.getElementById('box'),
		reticle: document.getElementById('reticle')
	}

	var pivot = function(word) {
		var bestLetter = 1;
		var wordLength = word.length;

		switch (wordLength) {
		case 1:
			bestLetter = 0; // first
			break;
		case 2:
		case 3:
		case 4:
		case 5:
			bestLetter = 1; // second
			break;
		case 6:
		case 7:
		case 8:
		case 9:
			bestLetter = 2; // third
			break;
		case 10:
		case 11:
		case 12:
		case 13:
			bestLetter = 3; // fourth
			break;
		default:
			bestLetter = 4; // fifth
		};

		// maybe: make correction in case of space
		if (word.charAt(bestLetter) == ' ') {
			bestLetter--;
		}

		return bestLetter;
	};

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
			if (recurse) {
				update(session);
			}
		}, 60000/session.wpm);
	}

	var stop = function() {
		console.log('stopped!');
	}

	return {
		initialize: function(opts) {
			options.box.className = options.box.className + ' despritz box';
		},
		set_word: set_word,
		spritzify: function(text) {
			var session = {
				words: text.split(' '),
				index: 0,
				wpm: 300,
				next_timeout: undefined,
			}
			update(session);
			return session;
		},
	};
});