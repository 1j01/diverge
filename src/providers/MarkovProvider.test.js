import {Markov, MarkovProvider, MarkovSelfTextProvider} from "./MarkovProvider";

// TODO: maybe test actual randomness; keep histogram and check for occurrences

describe("Markov", ()=> {
	it("continues the corpus text in a loop", ()=> {
		const markov = new Markov(3);
		markov.train("hello ");
		expect(markov.continueText("hello", 18)).toBe("hello hello hello hello");
	});
	it.skip("handles input text smaller than the order", ()=> {
		const markov = new Markov(3);
		markov.train("hello ");
		expect(markov.continueText("h", 23)).toBe("hello hello hello hello");
	});
	it.skip("handles corpus text smaller than the order", ()=> {
		const markov = new Markov(3);
		markov.train("-=");
		expect(markov.continueText("-", 4)).toBe("--=--=-");
		expect(markov.continueText("-", 4)).toBe("-=-=-");
	});
	it.skip("handles corpus text 2 smaller than the order", ()=> {
		const markov = new Markov(4);
		markov.train("-=");
		expect(markov.continueText("-", 4)).toBe("-=-=-");
	});
	it("picks an ngram to start with an empty input", ()=> {
		const markov = new Markov(3);
		markov.train("aaaaaaaaaaaaaaaaa");
		expect(markov.continueText("", 5)).toBe("aaaaa");
	});
	it("picks an ngram to start when it runs into a dead end", ()=> {
		const markov = new Markov(3);
		markov.train("aaaaaaaaaaaaaaaaa");
		expect(markov.continueText("the end.", 3)).toBe("the end.aaa");
	});
	it.skip("gives part of an ngram when less than the order is desired (for length to add)", ()=> {
		const markov = new Markov(3);
		markov.train("aaaaaaaaaaaaaaaaa");
		expect(markov.continueText("the end.", 2)).toBe("the end.aa");
	});
	it.skip("handles ngrams like 'toString'", ()=> {
		const markov = new Markov("toString".length);
		markov.train("foo.toString()"); // "prototype constructor __proto__ hasOwnProperty"
		expect(markov.continueText("foo.toStri", 5)).toBe("foo.toString()");
	});
});

// const corpusText = "~!@#$%^&*()_+_)(*&^%$#@!~qwertyuiop";

// describe("MarkovProvider", ()=> {
// 	it("sdfgsdfgsdfg", ()=> {
// 		const provider = new MarkovProvider({
// 			order: 3,
// 			corpusText,
// 		});
// 		expect(provider.query("~!@", 3)).toBe("");
// 	});
// });
