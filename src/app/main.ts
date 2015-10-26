class Main {
	word: string;
	constructor(message: string) {
		this.word = message;
	}
	greet() {
		return 'Hello, ' + this.word;
	}
}
var greeter = new Main('World');