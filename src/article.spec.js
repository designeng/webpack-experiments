import wireDebugPlugin from 'essential-wire/source/debug';
import reactComponentPlugin from './plugins/handlebars/template';
const templateA = require("html!./templates/templateA.html");

export default {
    $plugins: [
        wireDebugPlugin
    ],

    component: {
        createComponent: {
            template: templateA
        }
    }
}