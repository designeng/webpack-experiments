import fs from 'fs';
import React from 'react';
import isString from 'is-string';
import isFunction from 'isfunction';

// page webpack compilation
import webpack      from "webpack";
import when         from "when";
import chalk        from "chalk";
import config       from "./config/webpack.page.config";

const compiler = webpack(config);

function compile() {
    return when.promise((resolve, reject, notify) =>{
        compiler.run((err, stats) => {
            if (err) {
                console.error(`COMPILATION ERROR: ${err}`);
                reject(err);
            } else {
                resolve("COMPILED");
            }
        });
    })
}

function pageBundleMiddleware(resolver, facet, wire) {
    const target = facet.target;
    const bundleUrl = facet.options.bundleUrl;
    const targetFilePath = facet.options.targetFilePath;

    // let result = fs.readFileSync(targetFilePath);

    // TODO: does not work: error, file does not exist
    fs.readFile(targetFilePath, (err, result) => {
        if (err) {
            console.log(chalk.blue(err));
        };

        target.get(bundleUrl, (req, res) => {
            res.status(200).end(result);
        });
    });

    resolver.resolve(target);
}

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
                <script async src="/build/bundle.js"></script>
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
                        when(compile()).then(compilationResult => {
                            console.log(`COMPILATION RESULT::::::: ` + chalk.blue(compilationResult));
                            res.status(200).end(renderFullPage(context.container, title));
                        })
                    })
                }
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

export default function routeMiddlewarePlugin(options) {
    return {
        facets: {
            pageBundleMiddleware: {
                'initialize': pageBundleMiddleware
            },
            routeMiddleware: {
                'initialize:before': routeMiddleware
            },
            routeNotFoundMiddleware: {
                'initialize:after': routeNotFoundMiddleware
            }
        }
    }
}