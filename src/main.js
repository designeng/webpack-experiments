import wire     from 'essential-wire';
import when     from 'when';
import mainSpec from './main.spec';

wire(mainSpec)
    .then(context => {
        console.log("context:::", context);
        when.all([context.oneModule(), context.twoModule()])
            .then(context =>  console.log("inner context:::", context))
            .otherwise(err => console.log("inner context error:::", err));
    })
    .otherwise(err => console.log("error:::", err));