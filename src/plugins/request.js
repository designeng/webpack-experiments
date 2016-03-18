const request = (resolver, compDef, wire) => {
    setTimeout(() => {
        resolver.resolve({e: 2}); 
    }, 1000);
}

export default function requestPlugin(options) {
    return {
        factories: {
            request
        }
    }
}