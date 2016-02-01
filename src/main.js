import wire from 'essential-wire';
import mainSpec from './main.spec';

wire(mainSpec)
    .then(context => {
        console.log("context:::", context);
        wire(context.onePageModule())
            .then(_context => console.log("_context:::", _context))
            .otherwise(err => console.log("_context error:::", err));
    })
    .otherwise(err => console.log("error:::", err));

// let name = 'one';
// let externalModule = require('./' + name);

// require.ensure(["./one"], function(require) {
//     let oneModule = require("./one");
//     oneModule("hello!")
// });