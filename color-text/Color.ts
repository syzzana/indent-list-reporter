export default class Color {
    private colors: string[] = [];
    private readonly text: string;

    /*
     *  Foreground Colors
     */
    private static Black = "\x1b[30m";
    private static Red = "\x1b[31m";
    private static Green = "\x1b[32m";
    private static Yellow = "\x1b[33m";
    private static Blue = "\x1b[34m";
    private static Magenta = "\x1b[35m";
    private static Cyan = "\x1b[36m";
    private static White = "\x1b[37m";
    private static Gray = "\x1b[90m";

    /*
     *  Background Colors
     */
    private static BgBlack = "\x1b[40m";
    private static BgRed = "\x1b[41m";
    private static BgGreen = "\x1b[42m";
    private static BgYellow = "\x1b[43m";
    private static BgBlue = "\x1b[44m";
    private static BgMagenta = "\x1b[45m";
    private static BgCyan = "\x1b[46m";
    private static BgWhite = "\x1b[47m";

    /*
     * Text Effects
     */
    private static Bright = "\x1b[1m";
    private static Dim = "\x1b[2m";
    private static Underscore = "\x1b[4m";
    private static Blink = "\x1b[5m";
    private static Reverse = "\x1b[7m";
    private static Hidden = "\x1b[8m";
    private static Bold = "\x1b[1m";

    private constructor(text: string) {
        this.text = text;
    }

    private addColor(color: string): Color {
        this.colors.push(color);
        return this;
    }

    public static text(text: string): Color {
        return new Color(text);
    }

    public red(): Color {
        return this.addColor(Color.Red);
    }

    public green(): Color {
        return this.addColor(Color.Green);
    }

    public gray(): Color {
        return this.addColor(Color.Gray);
    }

    public yellow(): Color {
        return this.addColor(Color.Yellow);
    }

    public blue(): Color {
        return this.addColor(Color.Blue);
    }

    public magenta(): Color {
        return this.addColor(Color.Magenta);
    }

    public cyan(): Color {
        return this.addColor(Color.Cyan);
    }

    public white(): Color {
        return this.addColor(Color.White);
    }

    public black(): Color {
        return this.addColor(Color.Black);
    }

    public bgWhite(): Color {
        return this.addColor(Color.BgWhite);
    }

    public bgRed(): Color {
        return this.addColor(Color.BgRed);
    }

    public bgGreen(): Color {
        return this.addColor(Color.BgGreen);
    }

    public bgYellow(): Color {
        return this.addColor(Color.BgYellow);
    }

    public bgBlue(): Color {
        return this.addColor(Color.BgBlue);
    }

    public bgMagenta(): Color {
        return this.addColor(Color.BgMagenta);
    }

    public bgCyan(): Color {
        return this.addColor(Color.BgCyan);
    }

    public bgBlack(): Color {
        return this.addColor(Color.BgBlack);
    }

    public dim(): Color {
        return this.addColor(Color.Dim);
    }

    public underscore(): Color {
        return this.addColor(Color.Underscore);
    }

    public bold(): Color {
        return this.addColor(Color.Bold);
    }

    public blink(): Color {
        return this.addColor(Color.Blink);
    }

    public reverse(): Color {
        return this.addColor(Color.Reverse);
    }

    public hidden(): Color {
        return this.addColor(Color.Hidden);
    }

    //TODO implement rgb custom colors
    public valueOf(): string {
        const reset = "\x1b[0m";
        return this.colors.reduce((text, color) => `${color}${text}`, this.text) + reset;
    }
}
