import React from 'react';
import isString from 'is-string';
import ReactDOMServer from 'react-dom/server';

// facets
function renderInFacet(resolver, facet, wire) {
    let target = facet.target;
    let selector = facet.options.selector;
    let element;

    // TODO: strange... process.browser is true in node.js running
    console.log("LOG PROCESS:::::::::::", process, process.browser);

    if (process.browser) {
        element = document.querySelector(selector);    }

    resolver.resolve(target);
}

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
        if (process.env.NODE_ENV == 'server') {
            resolver.resolve(ReactDOMServer.renderToString(component));
        } else if (process.env.NODE_ENV == 'client') {
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
        },
        facets: {
            renderIn: {
                ready: renderInFacet
            }
        }
    }
}