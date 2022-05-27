import FS from "node:fs" ;
import Network from "node:net" ;
import Awaitable from "node:async_hooks" ;

const { fd: output } = process.stdout;
const logger = { indent: 0 };

const Main = Awaitable.createHook( {
    init( asyncId: number, type: string, triggerAsyncId: number ) {
        const eid = Awaitable.executionAsyncId();
        const indentation = " ".repeat( logger.indent );
        FS.writeSync( output, `${ indentation }${ type }(${ asyncId }):` + ` trigger: ${ triggerAsyncId } execution: ${ eid }\n` );
    },
    before( asyncId: number ) {
        const indentation = " ".repeat( logger.indent );
        FS.writeSync( output, `${ indentation }before:  ${ asyncId }\n` );
        logger.indent += 2;
    },
    after( asyncId: number ) {
        logger.indent -= 2;
        const indentation = " ".repeat( logger.indent );
        FS.writeSync( output, `${ indentation }after:  ${ asyncId }\n` );
    },
    destroy( asyncId: number ) {
        const indentation = " ".repeat( logger.indent );
        FS.writeSync( output, `${ indentation }destroy:  ${ asyncId }\n` );
    },
} );

Main.enable()

/// const callback = () => Main.disable();
const callback = () => void null;
Network.createServer( callback ).listen( 8080, () => {
    // Wait 100ms before Logging
    const log = () => console.log( ">>>", Awaitable.executionAsyncId() );
    setTimeout( log, 100 );
} );
