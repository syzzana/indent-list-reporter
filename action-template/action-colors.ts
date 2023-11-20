const ColorReset = "\x1b[0m";

export type ColorOptions = {
    isDimmed?: boolean;
    backgroundColor?: BackgroundColor;
    foregroundColor?: ForegroundColor;
    isBold?: boolean;
    isUnderlined?: boolean;
    isBlinking?: boolean;
};
enum TextEffect {
    Bright = "\x1b[1m",
    Dim = "\x1b[2m",
    Underscore = "\x1b[4m",
    Blink = "\x1b[5m",
    Reverse = "\x1b[7m",
    Hidden = "\x1b[8m"
}

enum ForegroundColor {
    Black = "\x1b[30m",
    Red = "\x1b[31m",
    Green = "\x1b[32m",
    Yellow = "\x1b[33m",
    Blue = "\x1b[34m",
    Magenta = "\x1b[35m",
    Cyan = "\x1b[36m",
    White = "\x1b[37m"
}

enum BackgroundColor { //TODO implement background colors
    Black =  "",
    Red = "",
    Green = "",
    Yellow = "",
    Blue = "",
    Magenta = "",
    Cyan = "",
    White = ""
}

export const color = (text: string, options?: ColorOptions) => {
    let myStyledText = "";
    if (options?.foregroundColor) {
        myStyledText += options.foregroundColor;
    }
    if (options?.backgroundColor) {
        myStyledText += options.backgroundColor;
    }
    if (options?.isBold) {
        myStyledText += TextEffect.Bright;
    }
    if (options?.isDimmed) {
        myStyledText += TextEffect.Dim;
    }
    if (options?.isUnderlined) {
        myStyledText += TextEffect.Underscore;
    }
 return `${myStyledText}${text}${ColorReset}`;
}