import {isVowelish, stripStressor} from "phoneme-types";
import {toPhonemes} from "../phonics"

// TODO: generalize to alliteration
export default class Assonance {
	constructor({maxDistance, minDistanceBeforeCloserIsBetter, closerIsBetterFactor}) {
		// TODO: decide off-by-one-ish-ness-es for distance params, whatever makes sense
		this.windowSize = maxDistance;
		this.minDistanceBeforeCloserIsBetter = minDistanceBeforeCloserIsBetter;
		this.closerIsBetterFactor = closerIsBetterFactor;
	}
	// or vowelsAreAssonant
	static testVowelAssonance(phoneme1, phoneme2) {
		// TODO: actually critically decide which sounds should be considered similar
		const normalize = (phoneme)=> {
			// make the similar the same
			phoneme = stripStressor(phoneme);
			phoneme = phoneme.replace(/R/, "H");
			phoneme = phoneme.replace(/W/, "");
			if (phoneme === "AH") phoneme = "EH"; // should this be here?
			return phoneme;
		}
		if (phoneme1.match(/[@$?]/) || phoneme2.match(/[@$?]/)) {
			return false;
		}
		return normalize(phoneme1) === normalize(phoneme2);
	}
	evaluate(text) {
		const phonemes = toPhonemes(text);
		const vowelHistory = [];
		const pointsHistory = [];
		let points = 0;
		let totalVowels = 0;
		phonemes.forEach((phoneme)=> {
			if (isVowelish(stripStressor(phoneme)) || phoneme === "@") {
				if (vowelHistory.length > this.windowSize) {
					vowelHistory.shift();
					pointsHistory.shift();
				}
				const matchIndex = vowelHistory.findIndex((recentVowel)=> {
					return Assonance.testVowelAssonance(recentVowel, phoneme);
				});
				const matchedRecentVowel = matchIndex > -1 && phoneme !== "@";
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
			}
		});
		return points / Math.max(totalVowels, 1);
	}
}
