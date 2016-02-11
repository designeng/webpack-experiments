import { createStore, applyMiddleware, compose } from 'redux';

function getStore(resolver, compDef, wire) {
    wire(compDef.options).then( ({
        storeBuilder,
        user
    }) => {
        let store = storeBuilder({user: user});
        resolver.resolve(store);
    });
}

// options
//      rootReducer,
//      middleware
function getStoreBuilder(resolver, compDef, wire) {
    wire(compDef.options).then( ({ 
            rootReducer,
            middleware
    }) => {
        const finalCreateStore = compose(applyMiddleware(middleware))(createStore);
        const storeBuilder = (initialState) => finalCreateStore(rootReducer, initialState);

        resolver.resolve(storeBuilder);
    })
}

export default function storeBuilderPlugin(options) {
    return {
        factories: {
            getStoreBuilder,
            getStore
        }
    }
}