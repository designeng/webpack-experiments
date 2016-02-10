import fs from 'fs';
import React from 'react';
// import isString from 'is-string';

import isFunction from 'isfunction';

import NoopComponent    from './../../../utils/NoopComponent';

function renderFullPage(component, title) {
    return `
        <!doctype html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>${title}</title>
            </head>
            <body>
                <div id="root">${component.toHtml()}</div>
                <script src="/socket.io/socket.io.js"></script>
                <script src="/build/bundle.js"></script>
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
                let title = route.title;

                if (component instanceof NoopComponent) {
                    res.status(200).end(renderFullPage(component, title));
                } else if (isFunction(component)){
                    component().then(context => {
                        res.status(200).end(renderFullPage(context.container, title));
                    })
                }
            });
        });

        resolver.resolve(target);
    });
}

function pageScriptsMiddleware(resolver, facet, wire) {
    const target = facet.target;
    const scripts = facet.options.scripts;

    scripts.forEach(item => {
        target.get(item.url, function (req, res) {
            let result = fs.readFileSync(item.path);
            res.status(200).end(result);
        });
    });

    resolver.resolve(target);
}

function routeNotFoundMiddleware(resolver, facet, wire) {
    const target = facet.target;
    const template = facet.options.template;

    target.get("/*", function (req, res) {
        let result = template? template(req.url) : "Page not found:" + req.url
        res.status(404).end(result);
    });

    resolver.resolve(target);
}

export default function routeMiddlewarePlugin(options) {
    return {
        facets: {
            pageScriptsMiddleware: {
                'initialize:before': pageScriptsMiddleware
            },
            routeMiddleware: {
                initialize: routeMiddleware
            },
            routeNotFoundMiddleware: {
                'initialize:after': routeNotFoundMiddleware
            }
        }
    }
}