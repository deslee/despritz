define(['findpivot'], function(pivot) {
	Session = function() {
		var self = this;
		self.set_text = function(t) {
			self.words = t.split(' ');
			self.index = 0;
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

			session.set_word({word:word});

			console.log(session.running);

			session.next_timeout = setTimeout(function() {
				session.index = session.index + 1;
				if (session.running) {
					session.update();
				}
			}, 60000/session.wpm);
		},

		/* begins a new session or resumes the current one */
		start: function() {
			this.stop();

			this.running = true;
			this.update();
		},

		elements: {
			box: document.getElementById('box'),
		}, 

		generate_letter_element: function(args) {
			var letter = document.createElement('span');
			letter.className = args.is_pivot ? 'pivot letter' : 'letter';
			letter.innerHTML = args.character;
			return letter
		},

		set_word: function(args) {
			console.log(this);
			var session = this,
				pivot_index = pivot(args.word),
				pivot_char = args.word.charAt(pivot_index);

			session.elements.box.innerHTML = ''; // clear the box

			args.word.split('').forEach(function(character, index) {
				var child = session.generate_letter_element({
					character: character, 
					is_pivot: index == pivot_index
				});

				session.elements.box.appendChild(child);
			});
		},

		stop: function() {
			var session = this;
			session.running = false;
			clearTimeout(session.next_timeout);
			console.log("SESSION STOPPED")
		},

		override: function(name, new_function) {
			console.log(this);

			var session = this
			old_function = session[name]
			session[name] = function(args) {
				new_function.call(session, args, old_function);
			}
		}
	};

	return {
		/* Client calls this to begin a session on a specified text. */
		init_session: function() {
			session = new Session();
			return session;
		}
	};

});
