import wireDebugPlugin  from 'essential-wire/source/debug';
import requestPlugin    from '../../plugins/api/request';
import Handlebars       from 'handlebars';
import _                from 'underscore';

import { 
    getPageTemplateUrl
} from '../../api/config';

const getPage = (page, url) => {
    return page({ items:  'Страница ' + url + ' не найдена'});
}

export default {
    $plugins: [
        wireDebugPlugin,
        requestPlugin
    ],

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
                {$ref: 'pageTemplate'},
                {$ref: 'requestUrl'}
            ]
        }
    }
}