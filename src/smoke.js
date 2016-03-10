import wire         from 'essential-wire';
import pipeline     from 'when/pipeline';

import demoPageSpec from './pages/demo/page.spec';

const smokeTask = () => {
    return wire(demoPageSpec);
}

pipeline([smokeTask]).then(context => {
    console.log("CTX::::", context);
}).otherwise(error => console.error("ERROR:::", error));