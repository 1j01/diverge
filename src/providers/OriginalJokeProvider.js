
function OriginalJokeProvider(){
	// this.suffix = "...in bed";
	// this.suffix = "...Laaast Niiiiiight";
	this.suffix = "(no pun intended)"; // https://xkcd.com/559/
}

OriginalJokeProvider.prototype.query = function(current_text, index){
	return [current_text + " " + this.suffix];
};

export default  OriginalJokeProvider;
