define(function() {
	String.prototype.replaceAt=function(index, text) {
    	return this.substr(0, index) + text + this.substr(index+1);
	}

	var options = {
		box: document.getElementById('box'),
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
		options.box.innerHTML = '';
		word.split('').forEach(function(character, index) {
			options.box.appendChild(generate_letter_element(character, index == pivot_index));
		});
	}

	var next_timeout, ms_per_word;

	var start = function(words, index) {
		var word = words[index];
		if (word == undefined) {
			return stop();
		}
		set_word(word);
		next_timeout = setTimeout(function() {
			start(words, index + 1);
		}, ms_per_word);
	}

	var stop = function() {
		console.log('stopped!');
	}

	return {
		initialize: function(opts) {
		},
		spritzify: function(text) {
			var words = text.split(' ');
			var wpm = 500;
			ms_per_word = 60000/wpm;
			start(words, 0);
		},
	};
});