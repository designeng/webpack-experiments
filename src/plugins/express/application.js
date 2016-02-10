import express from 'express';
import http from 'http';
import socket from 'socket.io';

function startExpressServerFacet(resolver, facet, wire) {
    const port = facet.options.port;
    let target = facet.target;

    const server = http.Server(target);
    var io = socket(server);

    server.listen(port, () => {
        if (facet.options.verbose === true){
            const host = server.address().address;
            const port = server.address().port;
            console.info("==> 🌎  Express app listening at http://%s:%s", host, port);
        }
    });

    resolver.resolve(server);
}

function createExpressApplication(resolver, compDef, wire) {
    if (!compDef.options) {
        throw new Error("Please set true value to create Express application.")
    }

    const app = express();

    app.use(express.static('./public'));

    resolver.resolve(app);
}

export default function ExpressAppPlugin(options) {
    return {
        factories: {
            createExpressApplication
        },
        facets: {
            server: {
                ready: startExpressServerFacet
            }
        }
    }
}

// -------
// var express = require('express');
// var bodyParser = require('body-parser');
// var app = express();
// var server = require('http').Server(app);
// var io = require('socket.io')(server);

// var FalcorServer = require('falcor-express');

// /* ---- import falcor routers ---- */
// import NavigationRouter     from './api/falcor/routers/navigation';
// import UsersRouter           from './api/falcor/routers/users';

// import chatFactory from './routers/chat';
// var chatRouter = chatFactory(io);

// var port = process.env.PORT;
// app.set('port', port || 8080);

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

//  ---- falcor models API ---- 
// app.use('/navigation/model.json',   FalcorServer.dataSourceRoute(() => new NavigationRouter()));
// app.use('/users/model.json',         FalcorServer.dataSourceRoute(() => new UsersRouter()));

// // express routers
// app.use('/', chatRouter);

// // static pages
// app.use(express.static('./public'));

// /* 404 */
// app.use(function(req, res, next) {
//     var err = new Error('Url is not found! ::: ' + req.url);
//     err.status = 404;
//     next(err);
// });

// server.listen(port, err => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log('navigate to http://localhost:' + port);
// });

// module.exports = app;