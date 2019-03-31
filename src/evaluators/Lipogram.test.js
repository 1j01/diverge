import Lipogram from "./Lipogram";

describe("tacit that taboo on fifthglyphs", ()=> {
	let lipogram;
	beforeEach(()=> {
		lipogram = new Lipogram("e");
	});
	it("awards points for wording without such fifthglyphs", ()=> {
		expect(lipogram.evaluate(
			"This is only a trial. Analysis should bring approval, owing to following our fascinating linguistic law."
		)).toBe(1);
		expect(lipogram.evaluate(
			"You know which glyph I'm talking about. " +
			"I posit that it is totally functional to talk without it and, um, good to do so, uh... duh obviously, c'mon. " +
			"Good diction can only grow from constraining your words, a fact which is indisputably right. " +
			"Yup, if you wanna try and apply any old words anyhow you want, you'll run out of grammatical flavor fast. " +
			"Your words as an organic dish won't last, so cast out that which can stand for Atomic No. 99"
		)).toBe(1);
	});
	it("fails you on fifthglyphs", ()=> {
		expect(lipogram.evaluate(
			"Eeek! What is that?? What did I just type?--ack!!"
		)).toBe(0);
		expect(lipogram.evaluate(
			"You know which glyph I'm talking about. " +
			"I posit that it is totally functional to talk without it and, um, good to do so, uh... duh obviously, c'mon. " +
			"Good diction can only grow from constraining your words, a fact which is indisputably right. " +
			"Yup, if you wanna try and apply any old words anyhow you want, you'll run out of grammatical flavor fast. " +
			"Your words as an organic dish won't last, so cast out that which can stand for Atomic No. 99, and you'll do fine."
		)).toBe(0);
	});
	it("faults you for capital fifthglyphs too", ()=> {
		expect(lipogram.evaluate(
			"What's up, Edgar?"
		)).toBe(0);
	});
});
describe("when 4 E-less letters deemed repellent", ()=> {
	let lipogram;
	beforeEach(()=> {
		lipogram = new Lipogram("aiou"); // sometimes y...
	});
	it("eyes every expressed letter, & expects select letters be held/kept", ()=> {
		expect(lipogram.evaluate("nearly anything")).toBe(0);
	});
	it("rejects merely even ever 1 non-E", ()=> {
		expect(lipogram.evaluate("rejects merely even ever one")).toBe(0);
	});
	it("freely greens & esteems E sprees", ()=> {
		expect(lipogram.evaluate("eEeEEeeeE333E3e3eee! eee! yes, E!")).toBe(1);
	});
});
