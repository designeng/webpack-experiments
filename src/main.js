import wire         from 'essential-wire';
import pipeline     from 'when/pipeline';
import mainSpec     from './main.spec';
import expressSpec  from './express.spec';

import Timer    from './utils/timer';

let timer = new Timer();

const mainTask = () => {
    return wire(mainSpec);
}

const expressTask = (context) => {
    return context.wire(expressSpec);
}

pipeline([mainTask, expressTask]).then(context => {
    timer.end();
}).otherwise(error => console.error("ERROR:::", error));