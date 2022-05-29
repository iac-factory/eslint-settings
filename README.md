# ESLint Settings #

## Overview ##

ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript
code, with the goal of making code more consistent and avoiding bugs. In many ways, it is
similar to JSLint and JSHint with a few exceptions:

- ESLint uses `Espree` for JavaScript parsing.
- ESLint uses an AST to evaluate patterns in code.
- ESLint is completely pluggable, every single rule is a plugin and you can add more at runtime.

### Integration(s) ###

[Official Integration(s)](https://eslint.org/docs/user-guide/integrations)

Additional integrations extend to version control, CI-CD tools, build utilities, and commandline application(s),
including:

- [Git Precommit Hook](https://coderwall.com/p/zq8jlq/eslint-pre-commit-hook)
- Gulp - `gulp-eslint`
- [Unit-Testing](https://www.npmjs.com/package/mocha-eslint)

#### IDEs ####

- Sublime Text 3:
    - [SublimeLinter-eslint](https://github.com/roadhump/SublimeLinter-eslint)
    - [Build Next](https://github.com/albertosantini/sublimetext-buildnext)
- Eclipse Orion: ESLint is the [default linter](https://dev.eclipse.org/mhonarc/lists/orion-dev/msg02718.html)
- Eclipse IDE: [Tern ESLint linter](https://github.com/angelozerr/tern.java/wiki/Tern-Linter-ESLint)
- Atom:
    - [`linter-eslint`](https://atom.io/packages/linter-eslint) - [Reference](https://atom.io/packages/linter-eslint)
    - `fast-eslint-8`
- JetBrains (all external references are the same) - [ESLint](https://www.jetbrains.com/help/webstorm/eslint.html):
    - IDEA: [ESLint](https://www.jetbrains.com/help/webstorm/eslint.html)
    - WebStorm: [ESLint](https://www.jetbrains.com/help/webstorm/eslint.html)
    - PhpStorm: [ESLint](https://www.jetbrains.com/help/webstorm/eslint.html)
    - PyCharm: [ESLint](https://www.jetbrains.com/help/webstorm/eslint.html)
    - RubyMine: [ESLint](https://www.jetbrains.com/help/webstorm/eslint.html)
    - GoLand: [ESLint](https://www.jetbrains.com/help/webstorm/eslint.html)
- Visual Studio Code: [ESLint Extension]()

## Usage ##

`npm install --save-dev @iac-factory/eslint-settings`

Lastly, in either a `.eslintrc.[json, yml, ts, js]`, or file:

```json
{
    "extends": [
        "@iac-factory/eslint-settings"
    ]
}
```

Additionally, the same extension can be specified in a project's `package.json` file:

```json
{
    "eslintConfig": {
        "extends": [
            "@iac-factory/eslint-settings"
        ]
    }
}
```

Using either method, or using a combination, still allows for extension(s) and customization.

## Setup ##

*Note* - the following section only relates to first-time setup, and shouldn't be needed
unless the goal is to start another ESLint-related package from scratch.

1. Install
    ```bash
    npm install eslint --save-dev
    ```
2. Configure (the following prompts aren't verbatim answers -- such is to avoid changes in the future to the setup
   options)
    ```bash
    npm init @eslint/config
    ```
    - `Check Syntax, Find Problems, Enforce`
    - `JavaScript Modules (import/export)`
    - `No Framework`
    - `Yes, Project Uses Typescript`
    - `Node`
    - `Answer Questions about Code Style`
        - `Configuration Format: JavaScript`
        - `Spaces for Indentation`
        - `Double Quotes`
        - `Unix`
        - `Require Semicolons`
        - `Yes, install @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest eslint@latest`
        - `Package Manager: npm`

Now a general, recommended baseline configuration should be available.

Depending on the configuration format selection, (`yaml`, `json`, `javascript`), a `.eslintrc.*` file
should now be available in the root of the package.

The following repository contains all configuration options, with a few additional `commonjs` related
setups. The default elects to use `commonjs` + `ecma` modules. The default configuration format is
`json`.

### Typescript ###

Given `iac-factory` uses `typescript` for ***every*** node.js package, the next section relates
to, again, only first-time setup.

1. Install `typescript`
    ```bash
    npm install --save-dev typescript@latest tslib@latest @types/node
    npm install --save-optional @swc/core@latest @swc/helpers@latest
    npm install --save-peer ts-node@latest
    ```
2. Update `package.json`
    - Because `ts-node` is technically a development-only dependency, it's useful and in some contexts
      a requirement to update the `peerDepedenciesMeta` section of the `package.json` file.

   <br/>

   `package.json`

   ```json
   ...
   {
       "peerDependenciesMeta": {
            "ts-node": {
                "optional": true
            }
       }
   }
   ```

Note that the following section is not a full, exhaustive list of `@iac-factory/eslint-settings`'s
`peerDependenciesMeta` declaration; the [**Typescript Setup**](#typescript-setup) section is only for
conceptual configuration. Changes occur over time, and its of best interest to avoid otherwise
*code-breaking settings*. Additionally, to avoid introducing *drift*  from the perspective of documentation.

## Testing ##

The goal is to provide long-term support while limiting the manual requirements behind updating dependencies.

`iac-factory/eslint-settings` includes very limited unit-tests to ensure of cross organizational compliance.
However, it should be noted that such configuration is easily extended, and should be almost certainly
applicable to other projects/organizations, too.

### Usage ####

```bash
npm run test
```

### Snapshotting & Jest (Partial) ###

> *Should snapshot files be committed?*

Yes, all snapshot files should be committed alongside the modules they are covering and their tests.

They should be considered part of a test, similar to the value of any other assertion in Jest. In fact,
snapshots represent the state of the source modules at any given point in time. In this way, when the source
modules are modified, Jest can tell what changed from the previous version. It can also provide a lot of
additional context during code review in which reviewers can study your changes better.

> *Does snapshot testing only work with React components?*

React components are a good use case for snapshot testing. ***However, snapshots can capture
any serializable value and should be used anytime the goal is testing whether the output is
correct***.

The Jest repository contains many examples of testing the output of Jest itself, the output of Jest's
assertion library as well as log messages from various parts of the Jest codebase.

> *What's the difference between snapshot testing and visual regression testing?*

*The following answer only relates to User-Interface(s); however, context isn't only limited to
front-end or UI.*

Snapshot testing and visual regression testing are two distinct ways of testing UIs, and they serve
different purposes. Visual regression testing tools take screenshots of web pages and compare the
resulting images pixel by pixel.

*The next answer relates to all types of testing*.

With Snapshot testing values are serialized, stored within text files, and compared using a diff algorithm.

> *Does snapshot testing replace unit testing?*

Snapshot testing is only one of more than 20 assertions that ship with Jest.

The aim of snapshot testing is not to replace existing unit tests, but to provide additional value and
make testing painless. In some scenarios, snapshot testing can potentially remove the need for unit testing
for a particular set of functionalities (e.g. React components), but they can work together as well.

### Additional Notes ###

It's worth noting that the following package ***does not use `ts-jest`***. Contrary to many references online,
***it's not required***.

While this section is contextually related to Unit-Testing, there's detrimental, required domain knowledge
also relating to TypeScript, ECMA and Common-JS.

Limiting package dependencies, so long as it doesn't *add complexity or manual efforts*, is always of high
interest. `ts-jest` isn't a requirement so long as a `typescript` project is first compiled, and compiled
to `common-js`, prior to invoking `jest` (commandline executable).

> *Why not just use ts-jest, anyways? My project is based off of ECMA, so jest doesn't cut it.*

It's not your package type that isn't compliant -- it's how you're transpiling `*.ts` to `*.js`. But
as an admission, this doesn't answer the question:

> *Why not just use ts-jest [...] ?*

While implementation and ensuring of compliance is complex, the answer is simple:

- **Because `ts-jest` isn't kept updated alongside `jest`**.

The team behind `ts-jest` does their best to stay updated, certainly. It's still an external dependency. As such,
drift and dependency hell can occur when developers are attempting to either mitigate security vulnerabilities
or when looking to use the latest technologies.

IaC-Factory intentionally implements all `node` packages via `ECMA`, BUT transpiles to `common-js` simply
for one reason -- **Unit-Testing** compliance with `jest`. However, especially relating to backend-related
`node` runtimes, there are additional benefits.

Writing an entire package in ECMA via TypeScript in such a way of which compiles down to Common-JS isn't easy.
Moreover, as with IaC-Factory packages, transpiling compliant TypeScript even further down to `ES3` JavaScript
isn't any easier, either.

But it's possible, and the case, with all relating packages.

Research and efforts that went into determining an organization-wide compliant means for typescript transpilation
was extensive, and has spanned over the course of ~ 5 months. However, and in confidence, these generalized
configurations found in all related packages are
the most non-opinionated, agnostic settings, determined (at least at this point in time).

Front-end or backend, `node` or `ts-node`, Windows vs. Unix (mostly), IaC-Factory methods of packaging
is compliant in all runtime-related environments. Teams relating to Development, Security, QA, and DevOps
can and all do benefit from a standardized, compliant packaging schema.

### References ###

- [Rules](https://github.com/jest-community/eslint-plugin-jest/tree/main/docs/rules)
- [Snapshot Testing](https://jestjs.io/docs/snapshot-testing)
