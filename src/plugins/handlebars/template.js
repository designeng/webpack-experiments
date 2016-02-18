import Handlebars   from 'handlebars';
import adler32      from 'adler-32';
import { DATA_CHECKSUM } from '../constants';

const calculatePrefix = Handlebars.compile("<div {{ DATA_CHECKSUM }} ='{{ checksum }}'>")

function createComponent(resolver, compDef, wire) {
    wire(compDef.options).then(({
        template,
        model
    }) => {
        let html = template(model);
        let checksum = adler32.str(html);
        // TODO: make es6 template strings work!
        let prefix = calculatePrefix({DATA_CHECKSUM, checksum});
        let suffix = '</div>';
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