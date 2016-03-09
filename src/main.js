import wire         from 'essential-wire';
import pipeline     from 'when/pipeline';

import demoSpec     from './api/spec/demo.spec';
import mainSpec     from './main.spec';
import expressSpec  from './express.spec';

import Timer    from './utils/timer';

let timer = new Timer();

const mainTask = () => {
    return wire(mainSpec);
}

const demoTask = (context) => {
    return context.wire(expressSpec);
}

const expressTask = (context) => {
    return context.wire(demoSpec);
}

pipeline([mainTask, demoTask, expressTask]).then(context => {
    console.log("context::::pageTemplate", context.pageTemplate);
    timer.end();
}).otherwise(error => console.error("ERROR:::", error));