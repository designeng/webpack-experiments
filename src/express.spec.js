import wireDebugPlugin      from 'essential-wire/source/debug';
import expressAppPlugin     from './plugins/express/application';
import expressRoutingMiddlewarePlugin from './plugins/express/routing';

// pages
import demoPageSpec from './pages/demo/page.spec';
import notFoundSpec from './pages/404/page.spec';

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

    notFoundPage: {
        wire: {
            spec: notFoundSpec,
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
                },
                {   
                    url: '/404error', 
                    wireHandler: {$ref: 'notFoundPage'}
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