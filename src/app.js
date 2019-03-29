
// TODO: actually display diverging paths

// FIXME: the Menu key opens a menu with the context of the canvas instead of the input in chrome
// chrome apparently triggers a secondary click at the focused element's location
// so it has to be on top and have pointer-events and everything
// TODO: we want the menu to open up in a reasonable location
// so we'll need to position the input
// and if we're positioning the input, maybe we can just use that
// and get pointer-based selection and other benefits

var input = document.getElementById("input");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var paths = [];
var current_path = [];

var providers = [
	new DatabaseProvider(),
	// new MarkovProvider(),
	// new OriginalJokeProvider(),
];

var query_providers = function(){
	var old_paths = paths;
	paths = [];
	for (var i = 0; i < providers.length; i++) {
		var provider = providers[i];
		var path_strings = provider.query(input.value, input.selectionStart);
		for (var j = 0; j < path_strings.length; j++) {
			var path_string = path_strings[j];
			// TODO: diff paths based on visual differences
			// i.e. for when there are multiple paths shown as one since it branches off out of the view
			// or just for when there are branches in general
			var path = undefined; // yes we need to *reset it* to undefined
			for (var k = 0; k < old_paths.length; k++) {
				var old_path = old_paths[k];
				if(old_path.string == path_string){
					path = old_path;
				}
			}
			path = path || new Path(path_string);
			paths.push(path);
		}
	}
};

var view_center_x = 0;

var font_size = 20;
var line_height = 25;

var cursor_blink_timer = 0;
var cursor_blink_on = true;

var previous_text = "";
var previous_selection_end = 0;

var glyph_canvas_map = new Map;
var get_glyph_canvas = function(char) {
	if (glyph_canvas_map.has(char)) {
		return glyph_canvas_map.get(char);
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
		glyph_canvas_map.set(char, glyph_canvas);
		return glyph_canvas;
	}
};

function Path(string) {
	this.string = string;
	this.chars = [];
	for (var j = 0; j < string.length; j++) {
		var char = string[j];
		this.chars.push({
			char: char,
			glyph_canvas: get_glyph_canvas(char),
			x: 0,
			y: 0,
			rot: 0,
			alpha: 0,
			// x_to: 0,
			// y_to: 0,
			// rot_to: 0,
			x_vel: 0,
			y_vel: 0,
			rot_vel: 0,
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

const completely_faded_out_point = 30;
const fade_out_over = 20;

Path.prototype.simulate = function(matched, place_y, selection_end_pos) {
	var place_x = 0;
	for (var j = 0; j < this.chars.length; j++) {
		var char = this.chars[j];
		var prev_char = this.chars[j - 1];
		var glyph_canvas = char.glyph_canvas
		if(prev_char){
			// either of these will work normally as before
			// place_x = place_x + prev_char.glyph_canvas.glyph_width;
			place_x = prev_char.x_to + prev_char.glyph_canvas.glyph_width;
			// this will give a squishy rollout, and works better with a faster transition
			// place_x = prev_char.x + prev_char.glyph_canvas.glyph_width;
		}
		char.x_to = place_x;
		// char.x_to = matched && place_x;
		char.y_to = place_y;// + Math.sin(place_x / 50) * 5;
		char.alpha_to = matched && Math.min(1, Math.max(0, (selection_end_pos - j + completely_faded_out_point) / fade_out_over));
		// char.x += (char.x_to - char.x) / 20;
		// // char.x += (char.x_to - char.x) / 5;
		// char.y += (char.y_to - char.y) / 15;
		char.alpha += (char.alpha_to - char.alpha) / 10;
		// place_x += glyph_canvas.glyph_width;
		
		// const force = 1/50;
		// const damping = 0.1;
		// const force = 1/20;
		// const damping = 0.2;
		const force = 1/20;
		const damping = 0.9999;
		char.x_vel += (char.x_to - char.x) * force;
		char.y_vel += (char.y_to - char.y) * force;
		char.x_vel /= 1 + damping;
		char.y_vel /= 1 + damping;
		char.x += char.x_vel;
		char.y += char.y_vel;
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
		// var place_y = (1 + i) * line_height;
		// console.log(path.matchTo(text))
		// if (path.matchTo(text) > 0.9) {
		// 	place_y = innerHeight;
		// }
		
		// var str_dist = Levenshtein.get(path.string, text);
		
		// TODO: uniquify truncated strings,
		// and probably weigh paths higher if there are multiple results for it
		// and/or visually indicate that case specifically somehow
		// TODO: actually match paths together and show them branching off
		// if (path.string.toLowerCase().indexOf(text.toLowerCase()) === 0) {
		var matched = path.string.toLowerCase().indexOf(text.toLowerCase()) === 0;
		path.simulate(matched, place_y, upper_pos);
		// ctx.rotate(0.04);
		for (var j = 0; j < path.chars.length; j++) {
			// ctx.rotate(0.001);
			// ctx.save();
			// ctx.rotate(-0.1);
			var char = path.chars[j];
			var glyph_canvas = char.glyph_canvas;
			ctx.globalAlpha = char.alpha;
			ctx.rotate(0.003 * char.alpha * j);
			// FIXME: blurry text
			ctx.drawImage(glyph_canvas, char.x, char.y);
			// ctx.drawImage(glyph_canvas, ~~char.x, ~~char.y);
			// ctx.restore();
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

try{
	input.value = localStorage["diverge current path"] || "";
}catch(e){}
query_providers();

input.addEventListener("focus", function(){
	cursor_blink_timer = 0;
	cursor_blink_on = true;
});

input.addEventListener("input", function(){
	try{
		localStorage["diverge current path"] = input.value;
	}catch(e){}
	query_providers();
});

canvas.addEventListener("mousedown", function(e) {
	e.preventDefault();
	input.focus();
}, false);

animate();
