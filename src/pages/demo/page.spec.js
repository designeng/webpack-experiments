import wireDebugPlugin  from 'essential-wire/source/debug';
import requestPlugin    from '../../plugins/api/request';
import handlebarsTemplatePlugin from '../../plugins/handlebars/template';
import Handlebars   from 'handlebars';
import _ from "underscore";

import pageHbs   from '../../../public/assets/templates/page.hbs';

import { 
    getNewsUrl, 
    getNewsBlockTemplateUrl, 
    getPageTemplateUrl 
} from '../../api/config';

const getPage = (items, block, page) => {
    return page({ items:  _.reduce(items, (result, item, index) => {
        result = result + block(item);
        return result;
    }, '') });
}

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
            },
            output: {
                skip: [0]
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

    // TODO: {{{ items }}}
    // pageTemplate: {
    //     request: {
    //         url: getPageTemplateUrl(),
    //         output: {
    //             transform: Handlebars.compile
    //         }
    //     }
    // },

    // noop:
    pageTemplate: pageHbs,

    page: {
        create: {
            module: getPage,
            args: [
                {$ref: 'news'},
                {$ref: 'newsBlockTemplate'},
                {$ref: 'pageTemplate'}
            ]
        }
    }

}