import wire         from 'essential-wire';
import pipeline     from 'when/pipeline';

import demoPageSpec from './pages/demo/page.spec';

const smokeTask = () => {
    return wire(demoPageSpec);
}

pipeline([smokeTask]).then(context => {
    console.log("CTX::::", context);
    context.controller.render()
}).otherwise(error => console.error("ERROR:::", error));