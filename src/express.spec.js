import wireDebugPlugin      from 'essential-wire/source/debug';
import expressAppPlugin     from './plugins/express/application';
import expressRoutingMiddlewarePlugin from './plugins/express/routing';

// pages
import demoPageSpec from './pages/demo/page.spec';

export default {
    $plugins: [
        wireDebugPlugin,
        expressAppPlugin,
        expressRoutingMiddlewarePlugin
    ],
    app: {
        expressApplication: true,
        routeMiddleware: {
            routes: [
                {   
                    url: '/demo', 
                    spec: demoPageSpec
                }
            ]
        },
        static: {
            dir: './public'
        },
        routeNotFoundMiddleware: {},
        server: {
            port            : process.env.PORT || 3000,
            verbose         : true
        }
    }
}