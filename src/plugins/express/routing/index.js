import fs from 'fs';
import React from 'react';
import isString from 'is-string';
import isFunction from 'isfunction';

function renderFullPage(componentHTML, title) {
    return `
        <!doctype html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>${title}</title>
            </head>
            <body>
                <div id="root">${componentHTML}</div>
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

                if (isString(component)) {
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

function pageBundleMiddleware(resolver, facet, wire) {
    const target = facet.target;
    const bundleUrl = facet.options.bundleUrl;
    const targetFilePath = facet.options.targetFilePath;

    target.get(bundleUrl, function (req, res) {
        let result = fs.readFileSync(targetFilePath);
        res.status(200).end(result);
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
            routeMiddleware: {
                initialize: routeMiddleware
            },
            pageBundleMiddleware: {
                'initialize:before': pageBundleMiddleware
            },
            routeNotFoundMiddleware: {
                'ready:before': routeNotFoundMiddleware
            }
        }
    }
}