// import markov from "markov";
import {pick} from "deck";

function MarkovProvider({order, corpusText}){
	this.order = order; // the n in "ngrams:; 2 = digraphs, 3 = trigraphs
	// this.ngrams = new Map(); // ngrams to counts
	this.ngrams = {}; // ngrams to counts - TODO: test with words like "prototype" and "constructor"
	const length = corpusText.length;

	for (let index = 0; index < length - this.order; index++) {
		const ngram = corpusText.slice(index, index + this.order);
		// if (!this.ngrams.has(ngram)) {
		// 	this.ngrams.set(ngram, 0);
		// }
		// this.ngrams.set(ngram, this.ngrams.get(ngram) + 1);
		this.ngrams[ngram] = (this.ngrams[ngram] || 0) + 1;
	}
	this.ngram_keys = Object.keys(this.ngrams);
}

MarkovProvider.prototype.continueText = function(current_text, length_to_add){
	// const key = this.markov.search(current_text.slice(-this.order));
	// const key = this.markov.search(current_text);
	// const key = current_text.slice(-this.order);
	// const key = current_text.split(/\s+/).slice(-this.order).join(" ");
	// console.log(key);
	// if (!key) {
	// 	return "??? no key";
	// }
	// return current_text + (this.markov.next(key) || []).join(" ");
	const target_length = current_text.length + length_to_add;
	if (current_text.length < this.order) {
		// TOmaybeDO: could find ngrams that start with part of the end of current_text
		// also maybe don't go over the target length
		current_text += pick(this.ngrams);
	}
	for (let i = 0; i < length_to_add && current_text.length < target_length; i++) {
		const lastChars = current_text.slice(current_text.length - this.order + 1);
		const nextCharsToWeights = {};
		this.ngram_keys
			.filter((ngram)=> lastChars === ngram.slice(0, this.order - 1))
			.forEach((ngram)=> {
				// nextCharsToWeights[ngram.slice(this.order - 1)] = this.ngrams.get(ngram);
				nextCharsToWeights[ngram.slice(this.order - 1)] = this.ngrams[ngram];
			});
		current_text += (
			pick(nextCharsToWeights) ||
			pick(this.ngrams)
		);
	}
	return current_text;
}

MarkovProvider.prototype.query = function(current_text, index){
	// TODO: maybe continue from cursor (index)?
	return new Array(50).fill(0).map(()=> this.continueText(current_text, 20));
};

export default MarkovProvider;
