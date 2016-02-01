import wire     from 'essential-wire';
import mainSpec from './main.spec';

wire(mainSpec)
    .then(context => {
        console.log("context:::", context);
        context.onePageModule()
            .then(context =>  console.log("inner context:::test", context.test))
            .otherwise(err => console.log("inner context error:::", err));
    })
    .otherwise(err => console.log("error:::", err));