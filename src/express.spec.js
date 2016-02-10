import wireDebugPlugin      from 'essential-wire/source/debug';
import expressAppPlugin     from './plugins/express/application';
import expressRoutingMiddlewarePlugin from './plugins/express/routing';
import expressFalcorPlugin  from './plugins/express/falcor/middleware';
import socketIOPlugin       from './plugins/express/socket';

import UsersRouter          from './api/falcor/routers/users';

export default {
    $plugins: [
        wireDebugPlugin,
        expressAppPlugin,
        expressRoutingMiddlewarePlugin,
        expressFalcorPlugin,
        socketIOPlugin
    ],
    app: {
        createExpressApplication: {

        },
        falcorMiddleware: {
            api: [
                {apiPath: '/users/model.json', router: UsersRouter}
            ]
        },
        routeMiddleware: {
            routes: [
                {   
                    url: '/chat', 
                    component: {$ref: 'ChatContainer'},
                    title: 'Chat page'
                }
            ]
        },
        pageScriptsMiddleware: {
            scripts: [
                {url: '/build/bundle.js', path: './public/build/bundle.js'}
            ]
        },
        routeNotFoundMiddleware: {},
        server: {
            port            : process.env.PORT || 3000,
            verbose         : true
        }
    },

    // socketIo: {
    //     createSocketIO: {
            
    //     },
    //     // connectToServer: {
    //     //     server: {$ref: 'app'}
    //     // }
    // }
}