import wire     from 'essential-wire';
import mainSpec from './main.spec';

wire(mainSpec)
    .then(context => {
        console.log("context:::", context);
    })
    .otherwise(err => console.log("error:::", err));