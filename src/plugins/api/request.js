import axios from 'axios';

function request(resolver, compDef, wire) {
    let url = compDef.options.url;
    let params = compDef.options.params;
    if (!url) {
        throw new Error("Please set url to request factory.")
    }
    let method = compDef.options.method;
    if(!method) method = 'get';

    axios[method](url, {
        params
    })
    .then(response => resolver.resolve(response))
    .catch(error => resolver.reject(error));
}

export default function requestPlugin(options) {
    return {
        factories: {
            request
        }
    }
}