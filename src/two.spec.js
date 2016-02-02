//---------------- createDeferredComponentPlugin -----------------
// factory
function createDeferredComponent(resolver, compDef, wire) {
    setTimeout(() => resolver.resolve("abc"), 100);
}

const createDeferredComponentPlugin = (options) => {
    return {
        factories: {
            createDeferredComponent
        }
    }
}
//---------------- /createDeferredComponentPlugin -----------------

export default {
    $plugins: [
        createDeferredComponentPlugin
    ],
    twoModuleDeferredComponent: {
        createDeferredComponent: {}
    }
}