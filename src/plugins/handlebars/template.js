import Handlebars   from 'handlebars';
import adler32      from 'adler-32';

function createComponent(resolver, compDef, wire) {
    wire(compDef.options).then(({
        template,
        model
    }) => {
        let html = template(model);
        let checksum = adler32.str(html);
        let prefix = "<div data-checksum='" + checksum + "'>";
        let suffix = "</div>";
        resolver.resolve(prefix + html + suffix);
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