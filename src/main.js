import wire         from 'essential-wire';
import when         from 'when';
import mainSpec     from './main.spec';

import expressSpec  from './express.spec';

import Timer    from './utils/timer';

let timer = new Timer();

// wire(mainSpec)
//     .then(context => {
//         console.log("context:::", context);
//         when.all([context.oneModule(), context.twoModule()])
//             .then(context =>  {
//                 console.log("inner context:::", context);
//                 console.log("COMMON RUN TIME:::", timer.end());
//             })
//             .otherwise(err => console.log("inner context error:::", err));
//     })
//     .otherwise(err => console.log("error:::", err));


// const specs = [mainSpec, expressSpec];

// let promises = specs.reduce((previousSpec, currentSpec, currentIndex, array) => {
//     return wire(currentSpec)
// });

// console.log("promises:::", promises);

// when.all(promises)
//     .then(context => {
//     console.log("inner context:::", context);
//     })
//     .otherwise(err => console.log("inner context error:::", err));

wire(mainSpec).then(context => {
    context.wire(expressSpec).then(context => {
        
    }).otherwise(error => console.error("ERROR expressSpec:", error));
}).otherwise(error => console.error("ERROR mainSpec:", error));