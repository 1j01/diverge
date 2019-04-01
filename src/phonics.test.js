import wordsToPhonemes from "cmu-pronouncing-dictionary";
import {stripStressor} from "phoneme-types";
import {guessPhonemesForWord, findOrGuessPhonemesForWord} from "./phonics";

describe("findOrGuessPhonemesForWord", ()=> {
	it("gets pronunciations from the CMU dictionary (including stresses)", ()=> {
		expect(findOrGuessPhonemesForWord("Hey")).toEqual(["HH", "EY1"]);
		expect(findOrGuessPhonemesForWord("Aardvark")).toEqual(["AA1", "R", "D", "V", "AA2", "R", "K"]);
	});
	it("defaults to guessing if the word is not in the CMU dictionary (which currently just gives placeholders)", ()=> {
		expect(findOrGuessPhonemesForWord("boi")).toEqual(["$", "@"]);
	});
});

describe("guessPhonemesForWord", ()=> {
	it("currently just finds consonant/vowel clusters but doesn't identify phonemes", ()=> {
		expect(guessPhonemesForWord("Hey")).toEqual(["$", "@"]);
		expect(guessPhonemesForWord("Aardvark")).toEqual(["@", "$", "@", "$"]);
	});

	it.skip("guesses pronunciations of words not in the CMU dictionary", ()=> {
		expect(guessPhonemesForWord("boi")).toEqual(["B", "OY"]);
		expect(guessPhonemesForWord("ookypalooky")).toEqual(["UW", "K", "IY", "P", "AH", "L", "UW", "K", "IY"]);
		expect(guessPhonemesForWord("antiquasinoncool")).toEqual(["AE", "N", "T", "IY", "K", "W", "AA", "Z", "IY", "N", "", "N"]);
		expect(guessPhonemesForWord("coolisitude")).toEqual(["K", "UW", "L", "IH", "S", "IH", "T", "UW", "D"]);
	});

	it.skip("could guess a good number of pronunciations the same as the CMU dictionary (ignoring stress)", ()=> {
		const same = [];
		const different = [];
		const differences = [];
		const wordsToTest = Object.keys(wordsToPhonemes)
			.filter((word)=> !word.match(/\(\d+\)/));
		// this could be a filter instead
		wordsToTest.forEach((word)=> {
			const cmuPhonemes = wordsToPhonemes[word].split(" ").map(stripStressor).join(" ");
			const guessedPhonemes = guessPhonemesForWord(word).join(" ");
			const matches = cmuPhonemes === guessedPhonemes;
			(matches ? same : different).push(word);
			if (!matches) {
				differences.push({word, cmu: cmuPhonemes, guessed: guessedPhonemes});
			}
		});
		console.log("Differences:", differences);
		expect(same.length / wordsToTest.length).toBeGreaterThan(0.2);
	});
});
