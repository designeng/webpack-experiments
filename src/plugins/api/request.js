import axios from 'axios';
import _ from 'underscore';

function resolve(resolver, options, response) {
    let output = options.output;
    if(_.isString(output)) {
        response = response[output];
    } else {
        response = response['data'];
    }

    response = output && output.transform ? output.transform(response) : response;
    resolver.resolve(response);
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
    .then(response => {
        // console.log("RESPONSE:::::", response);
        resolver.resolve("TEST");
        // resolve(resolver, compDef.options, response)
    })
    .catch(error => resolver.reject(error));
}

export default function requestPlugin(options) {
    return {
        factories: {
            request
        }
    }
}