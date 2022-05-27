import closure, { initialize } from ".";

describe( "Awaitable", () => {
    initialize() && void closure();

    test( "Import", async () => {
        const main = import("..");
        const snapshot = JSON.stringify(main, null, 4);
        const result = "Successful";

        const state: import("Unit-Testing").State = {
            ... expect.getState(), ... {
                data: { result, snapshot }
            }
        };

        await expect( main ).resolves.toBeTruthy().then(() => {
            expect.setState( state );
        }).finally(() => {
            expect(snapshot).toMatchSnapshot();
        });
    } );
} );
