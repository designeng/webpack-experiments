import wire     from 'essential-wire';
import mainSpec from './main.spec';
import 'babel-polyfill';

wire(mainSpec)
    .then(context => {
        console.log("context:::", context);
        context.onePageModule({one: 1})
            .then(context =>  {
                console.log("inner context:::", context.test, context.onePageModuleVariable, context.one)
            })
            .otherwise(err => console.log("inner context error:::", err));


        context.twoModule({some: 1})
            .then(context =>  {
                console.log("twoModule inner context notResolvedComponent:::", context.notResolvedComponent)
            })
            .otherwise(err => console.log("inner context error:::::::", err));
    })
    .otherwise(err => console.log("error:::", err));