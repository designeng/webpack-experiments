//---------------- createDeferredComponentPlugin -----------------
// factory
function createDeferredComponent(resolver, compDef, wire) {
    setTimeout(() => resolver.resolve("abc"), 2000);
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