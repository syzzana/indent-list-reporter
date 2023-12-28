class Color {
    constructor(text) {
        this.colors = [];
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
/*
 *  Foreground Colors
 */
Color.Black = "\x1b[30m";
Color.Red = "\x1b[31m";
Color.Green = "\x1b[32m";
Color.Yellow = "\x1b[33m";
Color.Blue = "\x1b[34m";
Color.Magenta = "\x1b[35m";
Color.Cyan = "\x1b[36m";
Color.White = "\x1b[37m";
Color.Gray = "\x1b[90m";
/*
 *  Background Colors
 */
Color.BgBlack = "\x1b[40m";
Color.BgRed = "\x1b[41m";
Color.BgGreen = "\x1b[42m";
Color.BgYellow = "\x1b[43m";
Color.BgBlue = "\x1b[44m";
Color.BgMagenta = "\x1b[45m";
Color.BgCyan = "\x1b[46m";
Color.BgWhite = "\x1b[47m";
/*
 * Text Effects
 */
Color.Bright = "\x1b[1m";
Color.Dim = "\x1b[2m";
Color.Underscore = "\x1b[4m";
Color.Blink = "\x1b[5m";
Color.Reverse = "\x1b[7m";
Color.Hidden = "\x1b[8m";
Color.Bold = "\x1b[1m";
export default Color;
