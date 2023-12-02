module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/stylistic",
        "prettier",
    ],
    parser: "@typescript-eslint/parser",
    root: true,
    plugins: ["@typescript-eslint"],
    rules: {
        "@typescript-eslint/no-explicit-any": 0,
        "no-console": 0,
        "no-restricted-syntax": [
            "error",
            {
                selector: "CallExpression[calle.property.name='only']",
                message: "We don't wan to leave .only on our tests 😱",
            },
            {
                selector: "CallExpression[callee.name='validateJsonSchema'][arguments.length!=3]",
                message: "We don't want to commit validateJsonSchema(*,*,*,true)😎",
            },
        ],
    },
};
