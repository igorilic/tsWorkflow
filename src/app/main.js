var Main = (function () {
    function Main(message) {
        this.word = message;
    }
    Main.prototype.greet = function () {
        return 'Hello, ' + this.word;
    };
    return Main;
})();
var greeter = new Main('World');
greeter.greet();

//# sourceMappingURL=main.js.map
