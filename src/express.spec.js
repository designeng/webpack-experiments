import wireDebugPlugin      from 'essential-wire/source/debug';
import expressAppPlugin     from './plugins/express/application';
import expressRoutingMiddlewarePlugin from './plugins/express/routing';

export default {
    $plugins: [
        // wireDebugPlugin,
        expressAppPlugin,
        expressRoutingMiddlewarePlugin
    ],
    app: {
        expressApplication: true,
        routeMiddleware: {
            routes: [
                {url: 'article', component: "ARTICLE"}
            ]
        },
        routeNotFoundMiddleware: {},
        server: {
            port            : process.env.PORT || 3000,
            verbose         : true
        }
    }
}