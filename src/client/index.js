import wire         from 'essential-wire';
import { render }   from 'react-dom';
import isFunction   from 'isfunction';

import clientSpec   from './client.spec';

let rootElement = document.querySelector("#root");

wire(clientSpec).then(context => {
    let rootComponent = context.articleReactComponent
    if (isFunction(rootComponent)){
        rootComponent().then(context => {
            console.log("context.container:::::::", context.container);
            render(context.container, rootElement);
        })
    }
}).otherwise(error => console.error("ERROR clientSpec:", error));