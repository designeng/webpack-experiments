import wire         from 'essential-wire';
import $            from 'jquery';
import isFunction   from 'isfunction';

import clientSpec   from './client.spec';

const bootstrapTask = () => {
    return wire({ slot: $("#root") });
}

const clientTask = (context) => {
    return context.wire(clientSpec);
}

const startTask = (context) => {
    let rootComponent = context.articleContainer
    if (isFunction(rootComponent)){
        rootComponent().then(context => {
            console.log("context.component:::", context.component);
        })
    }
}

pipeline([bootstrapTask, clientTask]).then(context => {
    startTask();
}).otherwise(error => console.error("ERROR:", error));