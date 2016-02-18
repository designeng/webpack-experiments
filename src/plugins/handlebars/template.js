import Handlebars from 'handlebars';
import isString from 'is-string';

// factories
function createComponent(resolver, compDef, wire) {
    let component;
    
    wire(compDef).then(({
        template
    }) => {
        let html = Handlebars.compile(template)
        resolver.resolve(html)
    })
}

export default function HandlebarsTemplatePlugin(options) {
    return {
        factories: {
            createComponent,
            // alias
            createContainer: createComponent
        }
    }
}