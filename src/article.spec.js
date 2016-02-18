import wireDebugPlugin from 'essential-wire/source/debug';
import handlebarsTemplatePlugin from './plugins/handlebars/template';

import templateA from "./templates/templateA.hbs";

export default {
    $plugins: [
        wireDebugPlugin,
        handlebarsTemplatePlugin
    ],

    component: {
        createComponent: {
            template: templateA,
            model: {id: "1234567...."}
        }
    }
}