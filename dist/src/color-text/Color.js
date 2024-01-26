export default class Color {
    colors = [];
    text;
    /*
     *  Foreground Colors
     */
    static Black = "\x1b[30m";
    static Red = "\x1b[31m";
    static Green = "\x1b[32m";
    static Yellow = "\x1b[33m";
    static Blue = "\x1b[34m";
    static Magenta = "\x1b[35m";
    static Cyan = "\x1b[36m";
    static White = "\x1b[37m";
    static Gray = "\x1b[90m";
    /*
     *  Background Colors
     */
    static BgBlack = "\x1b[40m";
    static BgRed = "\x1b[41m";
    static BgGreen = "\x1b[42m";
    static BgYellow = "\x1b[43m";
    static BgBlue = "\x1b[44m";
    static BgMagenta = "\x1b[45m";
    static BgCyan = "\x1b[46m";
    static BgWhite = "\x1b[47m";
    /*
     * Text Effects
     */
    static Bright = "\x1b[1m";
    static Dim = "\x1b[2m";
    static Underscore = "\x1b[4m";
    static Blink = "\x1b[5m";
    static Reverse = "\x1b[7m";
    static Hidden = "\x1b[8m";
    static Bold = "\x1b[1m";
    constructor(text) {
        this.text = text;
    }
    addColor(color) {
        this.colors.push(color);
        return this;
    }
    static text(text) {
        return new Color(text);
    }
    red() {
        return this.addColor(Color.Red);
    }
    green() {
        return this.addColor(Color.Green);
    }
    gray() {
        return this.addColor(Color.Gray);
    }
    yellow() {
        return this.addColor(Color.Yellow);
    }
    blue() {
        return this.addColor(Color.Blue);
    }
    magenta() {
        return this.addColor(Color.Magenta);
    }
    cyan() {
        return this.addColor(Color.Cyan);
    }
    white() {
        return this.addColor(Color.White);
    }
    black() {
        return this.addColor(Color.Black);
    }
    bgWhite() {
        return this.addColor(Color.BgWhite);
    }
    bgRed() {
        return this.addColor(Color.BgRed);
    }
    bgGreen() {
        return this.addColor(Color.BgGreen);
    }
    bgYellow() {
        return this.addColor(Color.BgYellow);
    }
    bgBlue() {
        return this.addColor(Color.BgBlue);
    }
    bgMagenta() {
        return this.addColor(Color.BgMagenta);
    }
    bgCyan() {
        return this.addColor(Color.BgCyan);
    }
    bgBlack() {
        return this.addColor(Color.BgBlack);
    }
    dim() {
        return this.addColor(Color.Dim);
    }
    underscore() {
        return this.addColor(Color.Underscore);
    }
    bold() {
        return this.addColor(Color.Bold);
    }
    blink() {
        return this.addColor(Color.Blink);
    }
    reverse() {
        return this.addColor(Color.Reverse);
    }
    hidden() {
        return this.addColor(Color.Hidden);
    }
    //TODO implement rgb custom colors
    valueOf() {
        const reset = "\x1b[0m";
        return this.colors.reduce((text, color) => `${color}${text}`, this.text) + reset;
    }
}
