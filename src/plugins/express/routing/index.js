import React from 'react';
import isString from 'is-string';
import isFunction from 'isfunction';

const renderFullPage = (componentHTML) => {
    return `
        <!doctype html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>Isomorphic</title>
            </head>
            <body >
                <div id="root">${componentHTML}</div>
            </body>
        </html>
    `;
}

function routeMiddleware(resolver, facet, wire) {
    const target = facet.target;

    wire(facet.options).then(options => {
        const routes = options.routes;

        routes.forEach(route => {
            target.get(route.url, function (req, res) {
                let component = route.component;
                if (isString(component)) {
                    res.status(200).end(renderFullPage(component));
                } else if (isFunction(component)){
                    component().then(context => {
                        res.status(200).end(renderFullPage(context.container));
                    })
                }
            });
        });

        resolver.resolve(target);
    });
}

function routeNotFoundMiddleware(resolver, facet, wire) {
    const target = facet.target;

    target.get("/*", function (req, res) {
        res.status(404).end("Page not found:" + req.url);
    });

    resolver.resolve(target);
}

export default function routeMiddlewarePlugin(options) {
    return {
        facets: {
            routeMiddleware: {
                initialize: routeMiddleware
            },
            routeNotFoundMiddleware: {
                'ready:before': routeNotFoundMiddleware
            }
        }
    }
}