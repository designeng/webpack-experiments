import _ from 'underscore';
import requestPlugin from './plugins/request';
import preprocessPlugin from './plugins/preprocess';

const doSmth = (x) => {
    return _.extend(x, {a: 1});
}

const view = (data) => {
    console.log("DATA::", data);
    return JSON.stringify(data)
}

export default {
    $plugins: [
        requestPlugin,
        preprocessPlugin
    ],
    
    data: {
        request: {
            endpoint: {}
        },
        preprocess: doSmth
    },


    view: {
        create: {
            module: view,
            args: [
                {$ref: 'data'}
            ]
        }
    }

}