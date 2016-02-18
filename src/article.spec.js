import wireDebugPlugin from 'essential-wire/source/debug';
import handlebarsTemplatePlugin from './plugins/handlebars/template';

import templateA from "./templates/templateA.hbs";
import controller from "./controller";
import environment from "./decorators/environment";

@environment('events', 'controller')
export default {
    $plugins: [
        wireDebugPlugin,
        handlebarsTemplatePlugin
    ],

    component: {
        createComponent: {
            template: templateA,
            model: {id: "1234567"}
        }
    },

    events: {
        list: [
            {id: 'one', handler: {$ref: 'controller.log'}}
        ],
        bindTo: {$ref: 'component'}
    },

    controller: {
        create: controller
    }
}