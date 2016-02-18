import wireDebugPlugin from 'essential-wire/source/debug';
import handlebarsTemplatePlugin from './plugins/handlebars/template';

// const templateA = require("html!./templates/templateA.html");
import templateA from "./templates/templateA.html";

export default {
    $plugins: [
        wireDebugPlugin,
        handlebarsTemplatePlugin
    ],

    component: {
        createComponent: {
            template: templateA
        }
    }
}