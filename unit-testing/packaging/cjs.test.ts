import closure, { initialize } from ".";

describe( "CJS", () => {
    initialize() && void closure();

    test( "Import", async () => {
        const main = require( ".." );
        const snapshot = JSON.stringify( main, null, 4 );
        const result = "Successful";

        const state: import("Unit-Testing").State = {
            ... expect.getState(), ... {
                data: { result, snapshot }
            }
        };

        expect( main ).toBeTruthy();

        expect( snapshot ).toMatchSnapshot();

        expect.setState( state );
    } );
} );
