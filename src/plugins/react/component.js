import React from 'react';
import isString from 'is-string';
import ReactDOMServer from 'react-dom/server';

// factories
function createComponent(resolver, compDef, wire) {
    let component;
    if (!compDef.options.source) {
        throw new Error("source options should be specified!");
    }
    const source = compDef.options.source;

    if (isString(source)) {
        component = require(source);
        resolver.resolve(component);
    } else {
        component = React.createElement(source);

        // to correlate with ad-hoc webpack compilation (see plugins/express/routing/config/webpack.page.config.js)
        if (process.env.COMPILATION_MODE == 'server') {
            resolver.resolve(ReactDOMServer.renderToString(component));
        } else if (process.env.COMPILATION_MODE == 'client') {
            resolver.resolve(component);
        }
    }
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