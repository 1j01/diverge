
// display diverging paths
// type to choose a path (creating one if it doesn't exist)
// could use italics/low opacity for text that doesn't exist yet
// could use chromaticity for path disambiguation where paths join/diverge, or for authorship
// there could actually be a useful tool somewhere in this idea space
// perhaps in examining/making drafts, maybe not of books but of smaller amounts of text

var input = document.getElementById("input");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var paths = [];
var current_path = [];

var view_center_x = 0;

var font_size = 20;
var line_height = 25;

var cursor_blink_timer = 0;
var cursor_blink_on = true;

var previous_text = "";
var previous_selection_end = 0;

var glyph_map = new Map;
var get_glyph = function(char) {
	if (glyph_map.has(char)) {
		return glyph_map.get(char);
	} else {
		var glyph_canvas = document.createElement("canvas");
		var glyph_ctx = glyph_canvas.getContext("2d");
		// ctx.font = font_size + "px/" + line_height + "px Arial";
		glyph_ctx.font = font_size + "px Arial";
		var width = glyph_ctx.measureText(char).width;
		// TODO: use width based the surrounding characters for kerning
		// the +5 to width below is mainly for f
		glyph_canvas.glyph_width = width;
		glyph_canvas.width = width + 5;
		glyph_canvas.height = line_height + 5;
		
		glyph_ctx.font = font_size + "px Arial";
		glyph_ctx.textAlign = "left";
		glyph_ctx.textBaseline = "top";
		// ctx.fillStyle = "red"
		glyph_ctx.fillText(char, 0, 5);
		glyph_map.set(char, glyph_canvas);
		return glyph_canvas;
	}
};

function Path(string) {
	this.string = string;
	this.chars = [];
	for (var j = 0; j < string.length; j++) {
		this.chars.push({
			char: string[j],
			x: 0,
			y: 0,
			alpha: 0,
			x_to: 0,
			y_to: 0,
			alpha_to: 0,
		});
	}
}

// TODO: use Hirschberg's algorithm for sequence alignment
// https://en.wikipedia.org/wiki/Hirschberg%27s_algorithm

// Path.prototype.matchTo = function(string) {
// 	var dist = Levenshtein.get(this.string, string);
// 	return dist / (Math.max(this.string.length, string.length) + 1);
// }

Path.prototype.simulate = function() {
	
}

function load() {
	input.value = localStorage["diverge current path"] || "";
	
	var data = {paths: [
		"That quick brown fox was jumping all around",
		"The quick brown fox was jumping all around",
		"The quick brown fox jumps over lazydawgs",
		"The quick brown fox jumps over a lazy dog",
		"Sphinx of black quartz, judge my vow.",
		"The previous pigeon tempers the crystal answer.",
		"Over the definite minimalist overlaps this grateful drama.",
		"A shortened analogue baffles the percentage on top of the acoustic client.",
		"An abbreviated analog confuses the rate on top of the acoustic customer.",
		"Will the client deduce the modern paint?",
		"An egg attacks?",
		"Does the outstanding immortal reach past the absolute?",
		"Our still-competitor lands the aircraft next to his opening taste.",
		"A capitalist forum pulses around the secret fame.",
		"Why won't an arithmetic diameter trash the gas?",
		"The ax hails the modest justice.",
		"A sushi-centric motif, but with so many pairs of chopsticks, and only one piece of sushi",
		"What is this trying to say? There are ways of thinking that don't exist yet",
		"What is this trying to say? There are ways of thinking that haven't been invented",
		"What is this trying to say? There are ways of thinking that haven't been discovered",
		"What is this trying to say? There are ways of thinking that haven't been thought of",
		"What is this trying to say? There are ways of thinking that haven't been thought of yet",
		"What are you trying to say?",
		"Who are *you*?",
		"This isn't trying to solve a problem.",
		"I want to explore.",
		"alphabeta-magneta",
		"alphabetic-magnetic",
		"alphabetically magnetic",
		"start from nothing",
		"start from nothing, end up with something",
		"start from nothing, end up somewhere you didn't expect",
		"start from something, end up somewhere you didn't expect",
		"It's a bit of a surprise to see you again for the first time.",
		"Once upon a time,",
		"]0301/134429.526:ERROR:exception_handler_server.cc(524)] ConnectNamedPipe: The pipe is being closed. (0xE8)"
	]};
	for (var i = 0; i < data.paths.length; i++) {
		var path_string = data.paths[i];
		paths.push(new Path(path_string));
	}
}

function resize() {
	var width = window.innerWidth;
	var height = window.innerHeight;
	if (canvas.width !== width) canvas.width = width;
	if (canvas.height !== height) canvas.height = height;
}

function animate(t) {
	requestAnimationFrame(animate);
	resize();
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.font = font_size + "px/" + line_height + "px Arial";
	
	var text = input.value;
	// if(localStorage["diverge current path"] != text){
	localStorage["diverge current path"] = text;
	// }
	
	var start_pos = input.selectionStart;
	var end_pos = input.selectionEnd;
	// NOTE: these are already min and max;
	// there's selectionDirection which can be "forward", "backward", or "none"
	
	var lower_pos = Math.min(start_pos, end_pos);
	var upper_pos = Math.max(start_pos, end_pos);
	
	var before = text.slice(0, lower_pos);
	var inside = text.slice(lower_pos, end_pos);
	var after = text.slice(end_pos);
	
	// var all_text_metrics = ctx.measureText(text);
	// console.log(all_text_metrics.fontBoundingBoxDescent);
	var before_width = ctx.measureText(before).width;
	var inside_width = ctx.measureText(inside).width;
	var after_width = ctx.measureText(after).width;
	
	if (text !== previous_text || end_pos !== previous_selection_end || end_pos !== start_pos) {
		cursor_blink_on = true;
		cursor_blink_timer = 0; // could be negative
	}
	cursor_blink_timer += 1;
	if (cursor_blink_timer > 40) {
		cursor_blink_on = !cursor_blink_on;
		cursor_blink_timer = 0;
	}
	
	// TODO: center the controlled end of the selection (need to check input.selectionDirection)
	view_center_x += (before_width - view_center_x) / 20;
	
	ctx.save();
	ctx.translate(canvas.width/2, canvas.height/2);
	ctx.translate(-view_center_x, 0);
	ctx.fillStyle = "rgba(0, 120, 255, 0.56)";
	ctx.fillRect(before_width, -font_size, inside_width, line_height);
	ctx.fillStyle = "black";
	ctx.fillText(before, 0, 0);
	ctx.fillStyle = "white";
	ctx.fillText(inside, before_width, 0);
	ctx.fillStyle = "black";
	ctx.fillText(after, before_width + inside_width, 0);
	
	var input_focused = document.activeElement === input && document.hasFocus();
	if (cursor_blink_on && input_focused) {
		if (end_pos === start_pos) {
			ctx.fillRect(before_width, -font_size, 2, line_height);
		}
		// if (input.selectionDirection === "backward") {
		// 	ctx.fillRect(before_width, -font_size, 2, line_height);
		// } else if (input.selectionDirection === "forward") {
		// 	ctx.fillRect(before_width + inside_width, -font_size, 2, line_height);
		// }
	}
	// for (var i = 0; i < paths.length; i++) {
	// 	var path = paths[i];
	// 	ctx.translate(0, line_height);
	// 	ctx.fillText(path.str, 0, 0);
	// }
	
	var place_y = 0;
	for (var i = 0; i < paths.length; i++) {
		var path = paths[i];
		var place_x = 0;
		// var place_y = (1 + i) * line_height;
		// console.log(path.matchTo(text))
		// if (path.matchTo(text) > 0.9) {
		// 	place_y = innerHeight;
		// }
		
		// var str_dist = Levenshtein.get(path.string, text);
		
		// TODO: uniquify truncated strings
		// TODO: actually branch off
		// if (path.string.toLowerCase().indexOf(text.toLowerCase()) === 0) {
		var matched = path.string.toLowerCase().indexOf(text.toLowerCase()) === 0;
		
		for (var j = 0; j < path.chars.length; j++) {
			var char = path.chars[j];
			var glyph_canvas = get_glyph(char.char);
			char.x_to = place_x;
			char.y_to = place_y;
			char.alpha_to = matched && Math.min(1, Math.max(0, (upper_pos - j + 30) / 20));
			char.x += (char.x_to - char.x) / 20;
			char.y += (char.y_to - char.y) / 20;
			char.alpha += (char.alpha_to - char.alpha) / 10;
			ctx.globalAlpha = char.alpha;
			ctx.drawImage(glyph_canvas, char.x, char.y);
			place_x += glyph_canvas.glyph_width;
		}
		if (matched) {
			place_y += line_height;
		}
	}
	ctx.globalAlpha = 1;
	
	ctx.restore();
	
	
	previous_text = text;
	previous_selection_end = end_pos;
	
}

function fullscreen() {
	if (container.requestFullscreen) {
		container.requestFullscreen();
	} else if (container.msRequestFullscreen) {
		container.msRequestFullscreen();
	} else if (container.mozRequestFullScreen) {
		container.mozRequestFullScreen();
	} else if (container.webkitRequestFullscreen) {
		container.webkitRequestFullscreen();
	}
}

load();
animate();
canvas.addEventListener("mousedown", function(e) {
	e.preventDefault();
	input.focus();
}, false);
