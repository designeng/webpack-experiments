import fs from 'fs';
import isString from 'is-string';
import isFunction from 'isfunction';

import pipeline     from 'when/pipeline';
import when         from "when";
import chalk        from "chalk";

import essentialWire from 'essential-wire';

function routeMiddleware(resolver, facet, wire) {
    const target = facet.target;

    wire(facet.options).then(options => {
        const routes = options.routes;

        routes.forEach(route => {
            target.get(route.url, function (req, res) {
                let wireHandler = route.wireHandler;

                wireHandler().then(
                    (context) => {
                        res.status(200).end(context.controller.render())
                    },
                    (error) => res.status(500).end(error)
                );
            });
        });

        resolver.resolve(target);
    });
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

function cssAssets(resolver, facet, wire) {
    const target = facet.target;
    const main = facet.options.main;

    target.get("/css/global.css", function (req, res) {
        let result = fs.readFileSync(main);
        res.status(200).end(result);
    });

    resolver.resolve(target);
}

function imagesAssets(resolver, facet, wire) {
    const target = facet.target;
    const host = facet.options.host;

    target.get("/images/*", function (req, res) {
        console.log(">>>>>>", req.url);
        res.status(200).end(req.url);
    });

    resolver.resolve(target);
}

export default function routeMiddlewarePlugin(options) {
    return {
        facets: {
            routeMiddleware: {
                'initialize:before': routeMiddleware
            },
            routeNotFoundMiddleware: {
                'initialize:after': routeNotFoundMiddleware
            },
            cssAssets: {
                'initialize:after': cssAssets
            },
            imagesAssets: {
                'initialize:after': imagesAssets
            }
        }
    }
}