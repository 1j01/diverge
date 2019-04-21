const sumWeights = (weights)=> 
	Object.values(weights).reduce(((sum, value)=> sum + value), 0);

const weightedSample = (weights, sumTotalWeight)=> {
	const n = Math.random() * sumTotalWeight;
	const keys = Object.keys(weights);
	if (keys.length === 0) {
		return;
	}
	let threshold = 0;
	for (let i = 0; i < keys.length; i++) {
		threshold += weights[keys[i]];
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
		if (corpusText.length > 0) {
			corpusText += corpusText.slice(0, this.order); // wrap around
			while (corpusText.length < this.order) { // handle too small training inputs
				corpusText += corpusText.slice(0, this.order);
			}
		}
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
		this.sum_total_weight = sumWeights(this.ngrams);
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
			current_text += weightedSample(this.ngrams, this.sum_total_weight);
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
				weightedSample(nextCharsToWeights, sumWeights(nextCharsToWeights)) ||
				weightedSample(this.ngrams, this.sum_total_weight)
			);
		}
		return current_text;
	}
}

export default class MarkovProvider {
	constructor({order, corpusText}) {
		this.markov = new Markov(order);
		this.markov.train(corpusText);
	}
	query(current_text, index) {
		// TODO: maybe continue from cursor (index)?
		// current_text = current_text.slice(0, index);
		return new Array(5).fill(0).map(()=> this.markov.continueText(current_text, 20));
	}
}

export class MarkovSelfTextProvider {
	constructor({order}) {
		this.order = order;
	}
	query(current_text, index) {
		const markov = new Markov(this.order);
		markov.train(current_text);
		// TODO: maybe continue from cursor (index)?
		// current_text = current_text.slice(0, index);
		return new Array(3).fill(0).map(()=> markov.continueText(current_text, 20));
	}
}
