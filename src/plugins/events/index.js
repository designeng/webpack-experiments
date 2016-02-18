import $ from "jquery";

// factories
function createEvents(resolver, compDef, wire) {
    wire(compDef.options).then(({
        bindTo,
        list
    }) => {
        let events = {}
        list.forEach(event => {
            // $()
        })
        
        resolver.resolve(events)
    })
}

export default function createEventsPlugin(options) {
    return {
        factories: {
            createEvents
        }
    }
}