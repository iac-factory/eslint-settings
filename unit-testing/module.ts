declare module  "Unit-Testing" {
    export * from "jest";

    /***
     * Rules
     * ---
     *
     * {@link https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/require-hook.md Require-Hook}
     */

    export type State = jest.MatcherState & Record<string, any> & { data?: object | string; };
}
