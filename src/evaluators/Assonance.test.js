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
	)).toBe(0.6); // or something
	expect(assonance.evaluate(
		"Hello there!"
	)).toBe(1/2); // or 2/3
});

it.skip("ignores assonance between words further apart than the maxDistance", ()=> {
	// TODO: get this working (come to think of it, it should probably give points for words that it matches from history retroactively)
	// (or it could look forwards, but that'd be less efficient)
	// TODO: test multiple window sizes
	expect(assonance.evaluate(
		"a i i i a"
	)).toBe(assonance.evaluate(
		"a i i i i"
	));
	expect(assonance.evaluate(
		"a i i i a"
	)).toBe(1);
	expect(assonance.evaluate(
		"a i i i i i i i i i i i i i i i i i i i i i a"
	)).toBeLessThan(assonance.evaluate(
		"a i i i i i i i i i i i i i i i i i i i i i i"
	));
});
it.skip("gives a higher score based on the locality of vowel sound matches", ()=> {
	expect(assonance.evaluate(
		"word at the the the right height of sentence" // um, this succs
	)).toBeGreaterThan(assonance.evaluate(
		"the right word at the height of the sentence"
	));
	expect(assonance.evaluate(
		"in a light white kite flight"
	)).toBeGreaterThan(assonance.evaluate(
		"a light white kite in flight"
	));
	// um so maybe the base window should be like, like so maybe it shouldn't be considered better to have things nearer than a minimum distance?
});

it("does something specific for an empty string", ()=> {
// it("gives a score of zero for an empty string", ()=> {
	expect(assonance.evaluate("")).toBe(0);
});
