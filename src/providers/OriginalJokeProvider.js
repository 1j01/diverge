export default class OriginalJokeProvider {
	constructor() {
		// this.suffix = "...in bed";
		// this.suffix = "...Laaast Niiiiiight";
		this.suffix = "(no pun intended)"; // https://xkcd.com/559/
	}
	query(current_text, index) {
		return [current_text + " " + this.suffix];
	}
}
