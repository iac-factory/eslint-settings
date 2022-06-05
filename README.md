# ESLint Settings #

## Overview ##

ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript
code, with the goal of making code more consistent and avoiding bugs. In many ways, it is
similar to JSLint and JSHint with a few exceptions:

- ESLint uses `Espree` for JavaScript parsing.
- ESLint uses an AST to evaluate patterns in code.
- ESLint is completely pluggable, every single rule is a plugin and you can add more at runtime.

## Usage ##

```
npm install --save-dev @iac-factory/eslint-settings
```

Then in the project's `package.json` file:

```json
{
    "eslintConfig": {
        "settings": {
            "extends": "@iac-factory/eslint-settings"
        }
    }
}
```

## Testing ##

The goal is to provide long-term support while limiting the manual requirements behind updating dependencies.

`iac-factory/eslint-settings` includes very limited unit-tests to ensure of cross organizational compliance.
However, it should be noted that such configuration is easily extended, and should be almost certainly
applicable to other projects/organizations, too.

### Usage ####

```bash
npm run test
```
