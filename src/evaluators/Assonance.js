import wordsToPhonemes from "cmu-pronouncing-dictionary";
import {isVowelish, stripStressor} from "phoneme-types";

function getPhonemesForWord(word) {
	// TODO: handle alternate phoneme expansions/possibilities like a(1) = EY1
	const phonemesString = wordsToPhonemes[word];
	if (phonemesString) {
		return phonemesString.split(" ");
	}
	// TODO: guess phonemes based on general rules, using another module
	console.log(`idk phonemes for '${word}'`);
	return [];
}

function toPhonemes(text) {
	const words = text.toLowerCase().split(/[\s,./;:"\\\[\]!.\-_+|?]+/) // TODO: better
		.filter((word)=> word);
	// return words.flatMap(getPhonemesForWord);
	let phonemes = [];
	words.map((word)=> {
		phonemes = phonemes.concat(getPhonemesForWord(word));
	});
	return phonemes;
}

function testVowelAssonance(phoneme1, phoneme2) {
	// TODO: actually look and see and decide which sounds should be considered similar
	const normalize = (phoneme)=> {
		// make the similar the same
		phoneme = stripStressor(phoneme);
		phoneme = phoneme.replace(/R/, "H");
		phoneme = phoneme.replace(/W/, "");
		if (phoneme === "AH") phoneme = "EH"; // should this be here?
		return phoneme;
	}
	return normalize(phoneme1) === normalize(phoneme2);
}

export default class Assonance {
	constructor({maxDistance, minDistanceBeforeCloserIsBetter, closerIsBetterFactor}) {
		this.windowSize = maxDistance; // TODO: decide off-by-one-ish-ness(es), whatever makes sense
		this.minDistanceBeforeCloserIsBetter = minDistanceBeforeCloserIsBetter;
		this.closerIsBetterFactor = closerIsBetterFactor;
	}
	evaluate(text) {
		const phonemes = toPhonemes(text);
		const vowelHistory = [];
		const pointsHistory = [];
		// const vowelHistogram = {};
		let points = 0;
		let totalVowels = 0;
		phonemes.forEach((phoneme)=> {
			if (isVowelish(stripStressor(phoneme))) {
				if (vowelHistory.length > this.windowSize) {
					vowelHistory.shift();
					pointsHistory.shift();
				}
				const matchIndex = vowelHistory.findIndex((recentVowel)=> {
					return testVowelAssonance(recentVowel, phoneme);
				});
				const matchedRecentVowel = matchIndex > -1;
				totalVowels += 1;
				if (matchedRecentVowel) {
					points += 1;
					if (!pointsHistory[matchIndex]) {
						points += 1;
						pointsHistory[matchIndex] = true;
					}
				}
				vowelHistory.push(phoneme);
				pointsHistory.push(matchedRecentVowel);
				// vowelHistogram[phoneme] = (vowelHistogram[phoneme] || 0) + 1;
			}
		});
		// console.log(`score: ${points} / (${totalVowels} || 1)`, vowelHistogram);
		return points / Math.max(totalVowels, 1);
	}
}
