import wireDebugPlugin from 'essential-wire/source/debug';
import handlebarsTemplatePlugin from './plugins/handlebars/template';
import createEventsPlugin from './plugins/events';
import insertInPlugin from './plugins/dom/insert';

import templateA from "./templates/templateA.hbs";
import controller from "./controller";
import environment from "./decorators/environment";

let spec = {
    $plugins: [
        wireDebugPlugin,
        handlebarsTemplatePlugin,
        insertInPlugin
    ],

    component: {
        createComponent: {
            template: templateA,
            model: {id: "1234567"}
        },
        insert: {
            inTo: {$ref: 'slot'}
        }
    },

    events: {
        createEvents: {
            list: [
                {id: 'one', handler: {$ref: 'controller.log'}}
            ],
            bindTo: {$ref: 'component'}
        }
    },

    controller: {
        create: controller
    }
}

export default environment('events', 'controller')(spec);