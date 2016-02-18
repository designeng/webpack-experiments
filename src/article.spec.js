import wireDebugPlugin from 'essential-wire/source/debug';
import handlebarsTemplatePlugin from './plugins/handlebars/template';
import bindEventsPlugin from './plugins/events';
import insertInPlugin from './plugins/dom/insert';

import templateA from "./templates/templateA.hbs";
import controller from "./controller";
import environment from "./decorators/environment";

let spec = {
    $plugins: [
        wireDebugPlugin,
        handlebarsTemplatePlugin,
        bindEventsPlugin,
        insertInPlugin
    ],

    component: {
        createComponent: {
            template: templateA,
            model: {id: "1234567"}
        },
        insert: {
            inTo: {$ref: 'slot'}
        },
        bindEvents: {
            list: [
                {class: 'component-0', event: 'click',  handler: {$ref: 'controller.log'}},
                {id: 'first-name'    , event: 'change', handler: {$ref: 'controller.onFirstNameChange'}},
                {id: 'second-name'   , event: 'change', handler: {$ref: 'controller.onSecondNameChange'}},
            ]
        }
    },

    controller: {
        create: controller
    }
}

export default environment('controller')(spec);