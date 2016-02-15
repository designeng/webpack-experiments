const createNotResolvedPlugin = (options) => {
    return {
        factories: {
            createNotResolved(resolver, compDef, wire){
                resolver.reject("NO RESOLVED")
                // resolver.resolve("RESOLVED")
            }
        }
    }
}


export default {
    $plugins: [
        createNotResolvedPlugin
    ],
    
    notResolvedComponent: {
        createNotResolved: {}
    }
}