import fs from 'fs';
import isString from 'is-string';
import isFunction from 'isfunction';

// page webpack compilation
import webpack      from "webpack";
import when         from "when";
import chalk        from "chalk";
import config       from "./config/webpack.page.config";

const compiler = webpack(config);

function compile() {
    return when.promise((resolve, reject, notify) => {
        compiler.run((err, stats) => {
            if (err) {
                console.error(`COMPILATION ERROR: ${err}`);
                reject(err);
            } else {
                resolve("COMPILED::: " + stats);
            }
        });
    })
}

function pageBundleMiddleware(resolver, facet, wire) {
    const target = facet.target;
    const bundleUrl = facet.options.bundleUrl;
    const targetFilePath = facet.options.targetFilePath;

    target.get(bundleUrl, (req, res) => {
        let count = 0;
        // 5 sec is enouph for compilation
        let maxCount = 50;
        let interval = setInterval(() => {
            if (count < maxCount) {
                fs.stat(targetFilePath, (err, stats) => {
                    if (stats && stats.isFile()) {
                        clearInterval(interval);
                        let result = fs.readFileSync(targetFilePath);
                        res.status(200).end(result);
                    }
                });
            } else {
                clearInterval(interval);
            }
            count++;
        }, 100);
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
                            res.status(200).end(renderFullPage(context.component, title));
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