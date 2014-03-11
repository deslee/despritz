define(['findpivot'], function(pivot) {
	String.prototype.replaceAt=function(index, text) {
    	return this.substr(0, index) + text + this.substr(index+1);
	}

	var options = {
		box: document.getElementById('box'),
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
