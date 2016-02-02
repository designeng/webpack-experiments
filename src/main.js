import wire     from 'essential-wire';
import when     from 'when';
import mainSpec from './main.spec';
import Timer    from './utils/timer';

let timer = new Timer();

wire(mainSpec)
    .then(context => {
        console.log("context:::", context);
        when.all([context.oneModule(), context.twoModule()])
            .then(context =>  {
                console.log("inner context:::", context);
                console.log("COMMON RUN TIME:::", timer.end());
            })
            .otherwise(err => console.log("inner context error:::", err));
    })
    .otherwise(err => console.log("error:::", err));