import React from 'react';

// facets
function facetName(resolver, facet, wire) {
    let target = facet.target;
    resolver.resolve(target);
}

// factories
function createComponent(resolver, compDef, wire) {
    // if (!compDef.options) {
    //     throw new Error(".......")
    // }

    resolver.resolve();
}

export default function ReactComponentPlugin(options) {
    return {
        factories: {
            createComponent
        },
        // facets: {
        //     facetName: {
        //         initialize: 
        //     }
        // }
    }
}