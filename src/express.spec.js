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

    demoPage: {
        wire: {
            spec: demoPageSpec,
            defer: true
        }
    },

    app: {
        expressApplication: true,
        routeMiddleware: {
            routes: [
                {   
                    url: '/demo', 
                    wireHandler: {$ref: 'demoPage'}
                }
            ]
        },
        static: {
            dir: './public'
        },
        cssAssets: {
            main: './public/assets/global.css'
        },
        routeNotFoundMiddleware: {},
        server: {
            port            : process.env.PORT || 3000,
            verbose         : true
        }
    }
}