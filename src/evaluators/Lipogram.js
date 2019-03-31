function escapeRegExp(text) {
	return text.replace(/[-[\]{}()*+?.,\\/^$|#\s]/g, '\\$&');
}

export default class Lipogram {
	constructor(forbidden) {
		this.forbidden = forbidden.toLowerCase();
		this.forbiddenRegExp = new RegExp(`[${escapeRegExp(this.forbidden)}]`);
	}
	evaluate(text) {
		return text.toLowerCase().match(this.forbiddenRegExp) ? 0 : 1;
	}
}
