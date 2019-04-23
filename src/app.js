import DatabaseProvider from "./providers/DatabaseProvider";
import MarkovProvider, {MarkovSelfTextProvider} from "./providers/MarkovProvider";
import OriginalJokeProvider from "./providers/OriginalJokeProvider";
import "./app.css";
/* eslint import/no-webpack-loader-syntax: off */
import corpusText from "!!raw-loader!./corpus.txt";

// FIXME: the Menu key opens a menu with the context of the canvas instead of the input in chrome
// chrome apparently triggers a secondary click at the focused element's location
// so it has to be on top and have pointer-events and everything
// TODO: we want the menu to open up in a reasonable location
// so we'll need to position the input
// and if we're positioning the input, maybe we can just use that
// and get pointer-based selection and other benefits

// const container = document.getElementById("root");
const input = document.getElementById("input");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const setTextKeepingUndoHistory = (text)=> {
	input.select();
	document.execCommand("insertText", false, text);
};

let paths = [];
let autocompletion_index = 0;

const cycleAutocompletePaths = (direction)=> {
	autocompletion_index += direction;
	if (autocompletion_index < 0) {
		autocompletion_index = paths.filter((path)=> path._visible).length - 1;
	}
	if (autocompletion_index > paths.filter((path)=> path._visible).length - 1) {
		autocompletion_index = 0;
	}
}
const getSelectedAutocompletePath = ()=>
	paths.filter((path)=> path._visible)[autocompletion_index];

const providers = [
	new DatabaseProvider(),
	new MarkovProvider({
		order: 5,
		corpusText,
	}),
	new MarkovSelfTextProvider({
		order: 3,
	}),
	new OriginalJokeProvider(),
];

const query_providers = ()=> {
	autocompletion_index = 0;

	let path_strings = [];
	for (let i = 0; i < providers.length; i++) {
		const provider = providers[i];
		const provider_name = provider.name || "Provider";
		let providerResults = provider.query(input.value, input.selectionStart);
		if (!providerResults) {
			console.error(`${provider_name} returned ${providerResults} instead of an array`);
		} else if (!providerResults instanceof Array) {
			console.error(`${provider_name} returned ${providerResults} instead of an array`);
		} else {
			providerResults = providerResults.filter((result)=> {
				if (typeof result !== "string") {
					console.error(`${provider_name} gave ${result} instead of a string for one of the paths`);
					return false;
				}
				// TODO: keep metadata for debug / understanding
				// result._provider_ = provider;
				return true;
			});
			path_strings = path_strings.concat(providerResults);
		}
	}

	let old_paths_left = paths;
	let path_strings_left = path_strings;
	paths = [];

	for (let j = 0; j < path_strings_left.length; j++) {
		let path_string = path_strings_left[j];
		for (let k = 0; k < old_paths_left.length; k++) {
			const old_path = old_paths_left[k];
			if (old_path.string === path_string) {
				paths.push(old_path);
				path_strings_left.splice(j, 1); j--;
				old_paths_left.splice(k, 1); k--;
				break;
			}
		}
	}

	for (let j = 0; j < path_strings_left.length; j++) {
		const path_string = path_strings_left[j];
		for (let k = 0; k < old_paths_left.length; k++) {
			const old_path = old_paths_left[k];
			if (old_path.string[0] === path_string[0]) {
				old_path.set_string(path_string);
				paths.push(old_path);
				path_strings_left.splice(j, 1); j--;
				old_paths_left.splice(k, 1); k--;
				break;
			}
		}
	}

	for (let j = 0; j < path_strings_left.length; j++) {
		const path_string = path_strings_left[j];
		const path = new Path(path_string);
		paths.push(path);
	}
};

let view_center_x = 0;

const font_size = 20;
const line_height = 25;

let cursor_blink_timer = 0;
let cursor_blink_on = true;

let previous_text = "";
let previous_selection_end = 0;

const glyph_canvas_map = new Map();
const get_glyph_canvas = (char)=> {
	if (glyph_canvas_map.has(char)) {
		return glyph_canvas_map.get(char);
	} else {
		const glyph_canvas = document.createElement("canvas");
		const glyph_ctx = glyph_canvas.getContext("2d");
		glyph_ctx.font = font_size + "px Arial";
		const width = glyph_ctx.measureText(char).width;
		// TODO: use width based the surrounding characters for kerning (ideally)
		// the +5 to width below is mainly for f
		glyph_canvas.glyph_width = width;
		glyph_canvas.width = width + 5;
		glyph_canvas.height = line_height + 5;

		glyph_ctx.font = font_size + "px Arial";
		glyph_ctx.textAlign = "left";
		glyph_ctx.textBaseline = "top";
		glyph_ctx.fillText(char, 0, 5);
		glyph_canvas_map.set(char, glyph_canvas);
		return glyph_canvas;
	}
};

function Path(string) {
	this.string = string;
	this.glyphs = [];
	for (let j = 0; j < string.length; j++) {
		const char = string[j];
		this.glyphs.push({
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
Path.prototype.set_string = function(new_string) {
	const old_glyphs = this.glyphs;
	const old_string = this.string;

	this.string = new_string;
	this.glyphs = [];

	let old_string_index = 0;
	for (let j = 0; j < new_string.length; j++) {
		const old_char = old_string[old_string_index];
		const char = new_string[j];
		if (char === old_char) {
			this.glyphs.push(old_glyphs[old_string_index]);
			old_string_index++;
		} else {
			const prev_glyph = this.glyphs[this.glyphs.length - 1];
			this.glyphs.push({
				char: char,
				glyph_canvas: get_glyph_canvas(char),
				x: prev_glyph ? prev_glyph.x + prev_glyph.glyph_canvas.glyph_width : 0,
				y: prev_glyph ? prev_glyph.y : 0,
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
}

// TODO: use Hirschberg's algorithm for sequence alignment
// https://en.wikipedia.org/wiki/Hirschberg%27s_algorithm

// Path.prototype.matchTo = function(string) {
// 	const dist = Levenshtein.get(this.string, string);
// 	return dist / (Math.max(this.string.length, string.length) + 1);
// }

const completely_faded_out_point = 30;
const fade_out_over = 20;

Path.prototype.simulate = function(matched, place_y, selection_end_pos) {
	let place_x = 0;
	for (let j = 0; j < this.glyphs.length; j++) {
		const glyph = this.glyphs[j];
		const prev_glyph = this.glyphs[j - 1];
		if (prev_glyph) {
			place_x = prev_glyph.x_to + prev_glyph.glyph_canvas.glyph_width;
			// this will give a squishy rollout, and works better with a faster transition
			// place_x = prev_glyph.x + prev_glyph.glyph_canvas.glyph_width;
		}
		glyph.x_to = place_x;
		// glyph.x_to = matched && place_x;
		glyph.y_to = place_y;// + Math.sin(place_x / 50) * 5;
		glyph.alpha_to = matched && Math.min(1, Math.max(0, (selection_end_pos - j + completely_faded_out_point) / fade_out_over));
		// glyph.x += (glyph.x_to - glyph.x) / 20;
		// // glyph.x += (glyph.x_to - glyph.x) / 5;
		// glyph.y += (glyph.y_to - glyph.y) / 15;
		// glyph.alpha += (glyph.alpha_to - glyph.alpha) / 10;
		glyph.alpha += (glyph.alpha_to - glyph.alpha) / 4;
		// place_x += glyph_canvas.glyph_width;

		// const force = 1/50;
		// const damping = 0.1;
		// const force = 1/20;
		// const damping = 0.2;
		// const force = 1/20;
		// const damping = 1;
		const force = 1/2;
		const damping = 2;
		glyph.x_vel += (glyph.x_to - glyph.x) * force;
		glyph.y_vel += (glyph.y_to - glyph.y) * force;
		glyph.x_vel /= 1 + damping;
		glyph.y_vel /= 1 + damping;
		glyph.x += glyph.x_vel;
		glyph.y += glyph.y_vel;
	}
}

function resize() {
	const width = window.innerWidth;
	const height = window.innerHeight;
	if (canvas.width !== width) canvas.width = width;
	if (canvas.height !== height) canvas.height = height;
}

function animate(t) {
	requestAnimationFrame(animate);
	resize();

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.font = font_size + "px/" + line_height + "px Arial";

	const text = input.value;

	const start_pos = input.selectionStart;
	const end_pos = input.selectionEnd;
	// NOTE: selectionStart amd selectionEnd are already min and max indexes
	// (NOT "where you started" and "where you're selecting to")
	// there's selectionDirection which can be "forward", "backward", or "none"

	const lower_pos = Math.min(start_pos, end_pos);
	const upper_pos = Math.max(start_pos, end_pos);

	const before = text.slice(0, lower_pos);
	const inside = text.slice(lower_pos, end_pos);
	const after = text.slice(end_pos);

	// const all_text_metrics = ctx.measureText(text);
	// console.log(all_text_metrics.fontBoundingBoxDescent);
	const before_width = ctx.measureText(before).width;
	const inside_width = ctx.measureText(inside).width;
	// const after_width = ctx.measureText(after).width;

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

	const input_focused = document.activeElement === input && document.hasFocus();
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

	let place_y = 0;
	for (let i = 0; i < paths.length; i++) {
		const path = paths[i];
		// let place_y = (1 + i) * line_height;
		// console.log(path.matchTo(text))
		// if (path.matchTo(text) > 0.9) {
		// 	place_y = innerHeight;
		// }

		// let str_dist = Levenshtein.get(path.string, text);

		// TODO: uniquify truncated strings,
		// and probably weigh paths higher if there are multiple results for it
		// and/or visually indicate that case specifically somehow
		// TODO: actually match paths together and show them branching off
		// if (path.string.toLowerCase().indexOf(text.toLowerCase()) === 0) {
		const matched = path.string.toLowerCase().indexOf(text.toLowerCase()) === 0 && path.string !== text;
		path._visible = matched;
		path.autoCompleteHilight = getSelectedAutocompletePath() === path;
		path.simulate(matched, place_y, upper_pos);
		// ctx.rotate(0.04);
		ctx.rotate(0.04 * (path.glyphs[0] && path.glyphs[0].alpha));
		for (let j = 0; j < path.glyphs.length; j++) {
			// ctx.rotate(0.001);
			// ctx.save();
			// ctx.rotate(-0.1);
			const glyph = path.glyphs[j];
			const glyph_canvas = glyph.glyph_canvas;
			ctx.globalAlpha = glyph.alpha;
			if (path.autoCompleteHilight) {
				ctx.save();
				ctx.fillStyle = "rgba(255, 255, 0, 0.5)";
				ctx.fillRect(glyph.x, glyph.y, glyph_canvas.glyph_width, line_height);
				ctx.restore();
			}
			// ctx.rotate(0.002 * glyph.alpha);
			// ctx.rotate(-0.002 * glyph.alpha * (1 + 0.1 * (i%10)));
			// ctx.rotate(0.002 * glyph.alpha * (1 + 0.1 * (i%10)));
			// ctx.rotate(0.002 * glyph.alpha * (1 + 10 * (i%10)));
			// ctx.rotate(0.002 * glyph.alpha * (1 + 10 * (j%10)));
			// ctx.rotate(0.002 * glyph.alpha * (1 + 100 * (j%10)));
			// FIXME: blurry text
			ctx.drawImage(glyph_canvas, glyph.x, glyph.y);
			// ctx.drawImage(glyph_canvas, ~~glyph.x, ~~glyph.y);
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

/*function fullscreen() {
	if (container.requestFullscreen) {
		container.requestFullscreen();
	} else if (container.msRequestFullscreen) {
		container.msRequestFullscreen();
	} else if (container.mozRequestFullScreen) {
		container.mozRequestFullScreen();
	} else if (container.webkitRequestFullscreen) {
		container.webkitRequestFullscreen();
	}
}*/

try{
	input.value = localStorage["diverge current path"] || "";
}catch(e){}
query_providers();

input.addEventListener("focus", ()=> {
	cursor_blink_timer = 0;
	cursor_blink_on = true;
});

input.addEventListener("input", ()=> {
	try{
		localStorage["diverge current path"] = input.value;
	}catch(e){}
	query_providers();
});

window.addEventListener("keydown", (e)=> {
	switch (e.key) {
		case "Tab":
			const path = getSelectedAutocompletePath();
			if (path) {
				setTextKeepingUndoHistory(path.string);
			}
			break;
		case "ArrowUp":
			cycleAutocompletePaths(-1);
			break;
		case "ArrowDown":
			cycleAutocompletePaths(+1);
			break;
		default:
			return; // don't prevent default
	}
	e.preventDefault();
}, false);

canvas.addEventListener("mousedown", (e)=> {
	e.preventDefault();
	input.focus();
}, false);

animate();
