import wire         from 'essential-wire';
import pipeline     from 'when/pipeline';
// import mainSpec     from './main.spec';

import testSpec     from './test.ess';

wire(testSpec).then(context => {
    console.log("context::", context);
}).otherwise(error => console.error("ERROR:", error))