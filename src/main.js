import wire         from 'essential-wire';
import mainSpec     from './main.spec';

import expressSpec      from './express.spec';
import usersActivity    from './noop/users/activity';

import Timer    from './utils/timer';

let timer = new Timer();

wire(mainSpec).then(context => {
    context.wire(expressSpec).then(context => {
        console.log("WIRING TIME:", timer.end());
        usersActivity(context.socketIo);
    }).otherwise(error => console.error("ERROR expressSpec:", error));
}).otherwise(error => console.error("ERROR mainSpec:", error));