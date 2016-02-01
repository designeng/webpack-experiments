import wire from 'essential-wire';
import mainSpec from './main.spec';

wire(mainSpec)
    .then(context => {
        console.log("context:::", context);
        context.onePageModule()
            .then(_context => console.log("_context:::test", _context.test))
            .otherwise(err => console.log("_context error:::", err));
    })
    .otherwise(err => console.log("error:::", err));

// let name = 'one';
// let externalModule = require('./' + name);

// require.ensure(["./one"], function(require) {
//     let oneModule = require("./one");
//     oneModule("hello!")
// });