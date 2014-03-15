define(['findpivot'], function(pivot) {
	Session = function() {
		var self = this;
		self.set_text = function(t) {
			self.words = t.split(' ');
		};
	};

	Session.prototype = {
		index: 0,
		wpm: 200,
		next_timeout: undefined,
		words: undefined,
		running: true,

		update: function() {
			var session = this,
			word = session.words[session.index];

			if (word == undefined) {
				return stop();
			}

			session.set_word(word);

			next_timeout = setTimeout(function() {
				session.index = session.index + 1;
				if (session.running) {
					session.update();
				}
			}, 60000/session.wpm);
		},

		start: function() {
			this.update();
		},

		elements: {
			box: document.getElementById('box'),
			reticle: document.getElementById('reticle'),
		}, 

		generate_letter_element: function(c, pivot) {
			var letter = document.createElement('span');
			letter.className = pivot ? 'pivot letter' : 'letter';
			letter.innerHTML = c;
			return letter
		},

		set_word: function(word) {
			var pivot_index = pivot(word),
			session = this,
			pivot_char = word.charAt(pivot_index);

			session.elements.box.innerHTML = ''; // clear the box

			word.split('').forEach(function(character, index) {
				var child = session.generate_letter_element(character, 
						index == pivot_index);

				session.elements.box.appendChild(child);
			});
		},

		stop: function() {
			var session = this;
			session.running = false;
			clearTimeout(session.next_timeout);
			console.log("SESSION STOPPED")
		},


	};

	var can_override = ['set_word', 'generate_letter_element'];

	return {
		/* Client calls this to begin a session on a specified text. */
		init_session: function() {
			session = new Session();
			return session;
		}
	};

});
