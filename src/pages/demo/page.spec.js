import wireDebugPlugin  from 'essential-wire/source/debug';
import requestPlugin    from '../../plugins/api/request';
import Handlebars       from 'handlebars';
import moment           from 'moment';
import _                from 'underscore';

import { 
    getNewsUrl, 
    getNewsBlockTemplateUrl, 
    getPageTemplateUrl
} from '../../api/config';

moment.locale('ru');

const preprocessNews = (items) => {
    return _.map(items, (item) => {
        return _.extend({}, item, {
            time    : moment.unix(item.time).fromNow(),
            caption : item.caption.replace(/\{(.*?)\}/, function(match, aText) {
                return '<a href="' + item.url + '">' + aText + '</a>';
            })
        });
    });
}

const getPage = (items, block, page) => {
    return page({ items:  _.reduce(items, (result, item, index) => {
        result = result + block(item);
        return result;
    }, '') });
}

export default {
    $plugins: [
        wireDebugPlugin,
        requestPlugin
    ],

    news: {
        request: {
            url: getNewsUrl(),
            params: {
                count: 15
            },
            output: {
                skip: [4, 5],
                transform: preprocessNews
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