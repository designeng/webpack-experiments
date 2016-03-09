import wireDebugPlugin  from 'essential-wire/source/debug';
import requestPlugin    from '../../plugins/api/request';
import handlebarsTemplatePlugin from '../../plugins/handlebars/template';
import controller from './controller';
import Handlebars   from 'handlebars';

import { 
    getNewsUrl, 
    getNewsBlockTemplateUrl, 
    getPageTemplateUrl 
} from '../../api/config';

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

    newsBlockTemplate: {
        request: {
            url: getNewsBlockTemplateUrl(),
            output: {
                transform: Handlebars.compile
            }
        }
    },

    pageTemplate: {
        request: {
            url: getPageTemplateUrl(),
            output: {
                transform: Handlebars.compile
            }
        }
    },

    controller: {
        create: {
            module: controller
        },
        properties: {
            news: {$ref: 'news'},
            pageTemplate: {$ref: 'pageTemplate'},
            newsBlockTemplate: {$ref: 'newsBlockTemplate'}
        }
    }

}