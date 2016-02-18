import $ from 'jquery';

function insertInFacet(resolver, facet, wire) {
    const target = facet.target;
    wire(facet.options).then(({
        inTo
    }) => {
        $(target).appendTo(inTo);
        resolver.resolve(target);
    })
}

export default function insertInPlugin(options) {
    return {
        facets: {
            insert: {
                ready: insertInFacet
            }
        }
    }
}