import closure, { initialize } from ".";

describe( "ECMA", () => {
    initialize() && void closure();

    test( "Import", async () => {
        const main = await import("..");
        const snapshot = JSON.stringify(main, null, 4);
        const result = "Successful";

        const state: import("Unit-Testing").State = {
            ... expect.getState(), ... {
                data: { result, snapshot }
            }
        };

        expect.setState( state );

        expect(snapshot).toMatchSnapshot();

        expect( main ).toBeTruthy();
    } );
});
