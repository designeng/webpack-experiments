import wireDebugPlugin      from 'essential-wire/source/debug';
import expressAppPlugin     from './plugins/express/application';
import expressRoutingMiddlewarePlugin from './plugins/express/routing';

export default {
    $plugins: [
        wireDebugPlugin,
        expressAppPlugin,
        expressRoutingMiddlewarePlugin
    ],
    app: {
        expressApplication: true,
        pageBundleMiddleware: {
            bundleUrl: '/build/bundle.js',
            targetFilePath: './public/build/bundle.js'
        },
        routeMiddleware: {
            routes: [
                {   
                    url: '/article', 
                    component: {$ref: 'articleContainer'},
                    title: 'Isomorphic article page'
                }
            ]
        },
        routeNotFoundMiddleware: {},
        server: {
            port            : process.env.PORT || 3000,
            verbose         : true
        }
    }
}