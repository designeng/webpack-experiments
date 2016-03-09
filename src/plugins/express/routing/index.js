import fs from 'fs';
import axios from 'axios';

import pipeline     from 'when/pipeline';
import when         from "when";
import chalk        from "chalk";

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
        let lastFragment = req.url.replace('/images/', '')
        console.log(">>>>>>", lastFragment);
        axios.get(host + lastFragment)
            .then(result => res.status(200).end(result))
            .catch(error => res.status(500).end(error));
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