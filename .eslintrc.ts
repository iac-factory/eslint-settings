export const Configuration = {
    "env": {
        "browser": true,
        "es6": true,
        "es2021": true,
        "commonjs": true,
        "jest": true,
        "jest/globals": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:jest/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "jest"
    ],
    "ignorePatterns": [
        "setup.*",
        "*.config.*",
        "*.eslintrc.*",
        "**/scripts/**"
    ],
    "overrides": [
        {
            "files": [
                "**/unit-testing/**"
            ],
            "extends": [
                "eslint:recommended",
                "plugin:jest/recommended",
                "plugin:@typescript-eslint/recommended"
            ],
            "rules": {
                "indent": "off",
                "no-undef": "off",
                "require-yield": "off",
                "@typescript-eslint/no-var-requires": "off",
                "@typescript-eslint/no-explicit-any": "off",
                "jest/no-disabled-tests": "warn",
                "jest/no-focused-tests": "error",
                "jest/no-identical-title": "error",
                "jest/prefer-to-have-length": "warn",
                "jest/valid-expect": "error",
                "jest/prefer-lowercase-title": "off",
                "jest/require-hook": [
                    "error",
                    {
                        "allowedFunctionCalls": ["enableAutoDestroy"]
                    }
                ]
            }
        }
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};

export default Configuration;
