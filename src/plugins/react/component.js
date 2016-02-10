import React from 'react';
import isString from 'is-string';
import ReactDOMServer from 'react-dom/server';
import objectAssign from 'object-assign';

import NoopComponent    from './../../utils/NoopComponent';

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
            if(source.prototype instanceof React.Component) {
                component = React.createElement(source, objectAssign({}, props));

                if (process.env.NODE_ENV == 'server') {
                    component = new NoopComponent({html: ReactDOMServer.renderToString(component)});
                    resolver.resolve(component);
                } else if (process.env.NODE_ENV == 'client') {
                    resolver.resolve(component);
                }

            // another component type (noop e.g.)
            } else if (source.prototype instanceof NoopComponent) {
                if (process.env.NODE_ENV == 'server') {
                    resolver.resolve(component.getHtml());
                } else if (process.env.NODE_ENV == 'client') {
                    resolver.resolve(component);
                }
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