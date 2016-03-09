import wire         from 'essential-wire';
import pipeline     from 'when/pipeline';

import demoSpec     from './pages/demo/page.spec';
import expressSpec  from './express.spec';

import Timer    from './utils/timer';

let timer = new Timer();

const demoTask = (context) => {
    return wire(expressSpec);
}

const expressTask = (context) => {
    return context.wire(demoSpec);
}

pipeline([demoTask, expressTask]).then(context => {
    timer.end();
}).otherwise(error => console.error("ERROR:::", error));