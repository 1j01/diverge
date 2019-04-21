const normalizeWeights = (weights)=> {
	const keys = Object.keys(weights);
	
	const total = keys.reduce((sum, key)=> {
		const x = weights[key];
		// if (x < 0) {
		// 	throw new Error('Negative weight encountered at key ' + key);
		// } else if (typeof x !== 'number') {
		// 	throw new TypeError('Number expected, got ' + typeof x);
		// } else {
		return sum + x;
		// }
	}, 0);
	
	const normalizedWeights = {};
	keys.forEach((key)=> {
		normalizedWeights[key] = weights[key] / total;
	});
	return normalizedWeights;
};

const weightedSample = (normalizedWeights)=> {
	var n = Math.random();
	var threshold = 0;
	var keys = Object.keys(normalizedWeights);
	if (keys.length === 0) {
		return;
	}

	for (var i = 0; i < keys.length; i++) {
		threshold += normalizedWeights[keys[i]];
		if (n < threshold) {
			return keys[i];
		}
	}
	throw new Error('Exceeded threshold. Something is very wrong.');
};
 
class Markov {
	constructor(order) {
		this.order = order; // the n in "ngrams"; 2 = digraphs, 3 = trigraphs
		// this.ngrams = new Map(); // ngrams to counts
		this.ngrams = {}; // ngrams to counts - TODO: test with words like "prototype" and "constructor"
	}

	train(corpusText) {
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
		this.default_weights = normalizeWeights(this.ngrams);
	}

	continueText(current_text, length_to_add) {
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
			current_text += weightedSample(this.default_weights);
		}
		for (let i = 0; i < length_to_add && current_text.length < target_length; i++) {
			const lastChars = current_text.slice(current_text.length - this.order + 1);
			const nextCharsToWeights = {};
			this.ngram_keys
				.filter((ngram)=> {
					return lastChars === ngram.slice(0, this.order - 1);
					// attempt at optimization:
					// for (let ci = 0, end = this.order - 1; ci < end; ci++) {
					// 	if (lastChars.charCodeAt(ci) !== ngram.charCodeAt(ci)) {
					// 		return false
					// 	}
					// }
					// return true;
				})
				.forEach((ngram)=> {
					// nextCharsToWeights[ngram.slice(this.order - 1)] = this.ngrams.get(ngram);
					nextCharsToWeights[ngram.slice(this.order - 1)] = this.ngrams[ngram];
				});
			current_text += (
				weightedSample(normalizeWeights(nextCharsToWeights)) ||
				weightedSample(this.default_weights)
			);
		}
		return current_text;
	}
}

function MarkovProvider({order, corpusText}){
	this.markov = new Markov(order);
	this.markov.train(corpusText);
}

MarkovProvider.prototype.query = function(current_text, index){
	// TODO: maybe continue from cursor (index)?
	// current_text = current_text.slice(0, index);
	return new Array(5).fill(0).map(()=> this.markov.continueText(current_text, 20));
};

export default MarkovProvider;

export function MarkovSelfTextProvider({order}){
	this.order = order;
}

MarkovSelfTextProvider.prototype.query = function(current_text, index){
	// TODO: maybe continue from cursor (index)?
	// current_text = current_text.slice(0, index);
	const markov = new Markov(this.order);
	markov.train(current_text);
	return new Array(3).fill(0).map(()=> markov.continueText(current_text, 20));
};
