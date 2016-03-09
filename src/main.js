import wire         from 'essential-wire';
import pipeline     from 'when/pipeline';

import expressSpec  from './express.spec';

import Timer    from './utils/timer';

let timer = new Timer();

const expressTask = (context) => {
    return wire(expressSpec);
}

pipeline([expressTask]).then(context => {
    timer.end();
}).otherwise(error => console.error("ERROR:::", error));