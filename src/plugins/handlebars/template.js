import Handlebars from 'handlebars';
import isString from 'is-string';

function createComponent(resolver, compDef, wire) {
    wire(compDef.options).then(({
        template,
        model
    }) => {
        let html = template(model);
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