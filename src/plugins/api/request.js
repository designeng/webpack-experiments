import axios from 'axios';

function resolve(resolver, options, response) {
    if(options.output) {
        resolver.resolve(response[options.output]);
    } else {
        resolver.resolve(response['data']);
    }
}

function request(resolver, compDef, wire) {
    let url = compDef.options.url;
    let params = compDef.options.params;
    if (!url) {
        throw new Error('Please set url to request factory.')
    }
    let method = compDef.options.method;
    const allowedMethods = ['get', 'delete', 'head', 'post', 'put', 'patch'];

    if(!method) {
        method = 'get'
    } else if(allowedMethods.indexOf(method) == -1) {
        throw new Error('Unknown method!');
    }

    axios[method](url, {
        params
    })
    .then(response => resolve(resolver, compDef.options, response))
    .catch(error => resolver.reject(error));
}

export default function requestPlugin(options) {
    return {
        factories: {
            request
        }
    }
}