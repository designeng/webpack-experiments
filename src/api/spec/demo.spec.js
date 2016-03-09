import wireDebugPlugin  from 'essential-wire/source/debug';
import requestPlugin    from '../../plugins/api/request';
import handlebarsTemplatePlugin from '../../plugins/handlebars/template';
import { getNewsUrl, getPageTemplateUrl } from '../config';

export default {
    $plugins: [
        wireDebugPlugin,
        requestPlugin,
        handlebarsTemplatePlugin
    ],

    news: {
        request: {
            url: getNewsUrl(),
            params: {
                count: 10
            }
        }
    },

    pageTemplate: {
        request: {
            url: getPageTemplateUrl()
        },
        asHandlebars: true
    }
}