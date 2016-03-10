import wireDebugPlugin  from 'essential-wire/source/debug';
import requestPlugin    from '../../plugins/api/request';
import handlebarsTemplatePlugin from '../../plugins/handlebars/template';
import Handlebars   from 'handlebars';
import moment       from 'moment';
import _            from "underscore";

import pageHbs   from '../../../public/assets/templates/page.hbs';
import blockHbs  from '../../../public/assets/templates/block.hbs';

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

const preprocessNews = (items) => {
    return _.map(items, (item) => {
        return _.extend({}, item, {
            time: moment(item.time).fromNow(),
            caption: item.caption.replace(/\{(.*?)\}/, function(match, aText) {
                return '<a href="' + item.url + '">' + aText + '</a>';
            })
        });
    });
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
                skip: [0],
                transform: preprocessNews
            }
        }
    },

    // preprocessedNews: {
    //     create: {
    //         module: preprocessNews,
    //         args: [
    //             {$ref: 'news'},
    //         ]
    //     }
    // },

    // TODO: {{{ caption }}}
    // newsBlockTemplate: {
    //     request: {
    //         url: getNewsBlockTemplateUrl(),
    //         output: {
    //             transform: Handlebars.compile
    //         }
    //     }
    // },

    newsBlockTemplate: blockHbs,

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