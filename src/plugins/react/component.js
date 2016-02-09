import React from 'react';
import isString from 'is-string';
import ReactDOMServer from 'react-dom/server';
import objectAssign from 'object-assign';

// factories
function createComponent(resolver, compDef, wire) {
    let component;

    if (!compDef.options.source) {
        throw new Error("source options should be specified!");
    }

    wire(compDef.options).then(options => {
        const {
            source,
            props
        } = options;

        if (isString(source)) {
            component = require(source);
            resolver.resolve(component);
        } else {
            component = React.createElement(source, objectAssign({}, props));

            console.log("component::::", component);

            // to correlate with ad-hoc webpack compilation (see plugins/express/routing/config/webpack.page.config.js)
            if (process.env.NODE_ENV == 'server') {
                resolver.resolve(ReactDOMServer.renderToString(component));
            } else if (process.env.NODE_ENV == 'client') {
                resolver.resolve(component);
            }
        }
    });
}

export default function ReactComponentPlugin(options) {
    return {
        factories: {
            createComponent,
            // alias
            createContainer: createComponent
        }
    }
}