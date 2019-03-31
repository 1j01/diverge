import Assonance from "./Assonance";

const assonance = new Assonance({
	maxDistance: 10,
	minDistanceBeforeCloserIsBetter: 4,
	closerIsBetterFactor: 1.5,
});

it("gives a score of zero when all vowel sounds are unique", ()=> {
	expect(assonance.evaluate(
		"Hey! Hi! Me? Oh, you!"
	)).toBe(0);
});

it("gives a score of one when all vowel sounds are the same", ()=> {
	expect(assonance.evaluate(
		"Oh bro, no tho, don't..."
	)).toBe(1);
	expect(assonance.evaluate(
		"Excellent preference"
	)).toBe(1);
	expect(assonance.evaluate(
		"light white kite flight"
	)).toBe(1);
});

it("gives a score inbetween for sentences with some alliteration", ()=> {
	expect(assonance.evaluate(
		"I can actually add alliteration to anything."
	)).toBe(0.875); // or similar
	expect(assonance.evaluate(
		"Hello there!"
	)).toBe(2/3);
});

it("ignores assonance between words further apart than the maxDistance", ()=> {
	// TODO: test multiple window sizes
	// expect(assonance.evaluate(
	// 	"a i i i a"
	// )).toBe(1);
	// expect(assonance.evaluate(
	// 	"a i i i i"
	// )).toBe(4/5);
	expect(assonance.evaluate(
		"a i i i a"
	)).toBeGreaterThan(assonance.evaluate(
		"a i i i i"
	));
	expect(assonance.evaluate(
		"a i i i i i i i i i i i i i i i i i a"
	)).toBeLessThan(assonance.evaluate(
		"a i i i i i i i i i i i i i i i i i i"
	));
});
it.skip("gives a higher score based on the locality of vowel sound matches", ()=> {
	expect(assonance.evaluate(
		"word at the the the right height of sentence"
	)).toBeGreaterThan(assonance.evaluate(
		"the right word at the height of the sentence"
	));
	expect(assonance.evaluate(
		"in a light white kite flight"
	)).toBeGreaterThan(assonance.evaluate(
		"a light white kite in flight"
	));
});

it("does something specific for an empty string", ()=> {
// it("gives a score of zero for an empty string", ()=> {
	expect(assonance.evaluate("")).toBe(0);
});
