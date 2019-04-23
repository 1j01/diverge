import wordsToPhonemes from "cmu-pronouncing-dictionary";

export function guessPhonemesForWord(word) {
	word = word.toLowerCase();
	// research actual letter-to-sound (LtoS) rules
	// ideally find a module for this
	// actually, a speech synth's rules would be good
	const phonemes = [];
	let inVowels = false;
	for (let i = 0; i < word.length; i++) {
		let isVowel = false;
		if (word[i].match(/[aeiou]/)) {
			isVowel = true;
		} else if(word[i] === "y") {
			if (inVowels) {
				// "hey"
				isVowel = true;
			} else if (word[i + 1] && word[i + 1].match(/[aeiou]/)) {
				//	"yes"
				isVowel = false;
			} else {
				// "yttrium"
				isVowel = true;
			}
		} else {
			isVowel = false;
		}
		if (isVowel && (!inVowels || i === 0)) {
			phonemes.push("@");
		}
		if (!isVowel && (inVowels || i === 0)) {
			phonemes.push("$");
		}
		inVowels = isVowel;
	}
	return phonemes;
}

export function findOrGuessPhonemesForWord(word) {
	word = word.toLowerCase();
	// TODO: maybe handle alternate phoneme expansions/possibilities like a(1) = EY1
	// (and give the benefit of the doubt as to things being matches)
	const phonemesString = wordsToPhonemes[word];
	if (phonemesString) {
		return phonemesString.split(" ");
	}
	// console.log(`not found in pronunciation dictionary: '${word}' (going to guess)`);
	return guessPhonemesForWord(word);
}

export function toPhonemes(text) {
	const words = text.toLowerCase().split(/[\s,./;:"\\[\]!.\-_+|?]+/) // TODO: better tokenizer/splitter
		.filter((word)=> word);
	// return words.flatMap(getPhonemesForWord);
	let phonemes = [];
	words.forEach((word)=> {
		phonemes = phonemes.concat(findOrGuessPhonemesForWord(word));
	});
	return phonemes;
}
