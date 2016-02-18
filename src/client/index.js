import wire         from 'essential-wire';
import $            from 'jquery';
import isFunction   from 'isfunction';

import clientSpec   from './client.spec';

wire({ slot: $("#root") }).then(context => {
    context.wire(clientSpec).then(context => {
        let rootComponent = context.articleContainer
        if (isFunction(rootComponent)){
            rootComponent().then(context => {
                console.log("context.component:::", context.component);
                // $("#root").html(context.component)
            })
        }
    }).otherwise(error => console.error("ERROR clientSpec:", error));
})