import Falcor from "falcor";
import FalcorDataSource from 'falcor-http-datasource';

import React, { PropTypes } from "react";

function addFalcorModel(resolver, facet, wire) {
    let target = facet.target;
    const {
        sourcePath,
        route
    } = facet.options;

    const model = new Falcor.Model({
        source: new FalcorDataSource(sourcePath)
    });

    model.getValue([route])
        .then(
            response => {
                console.log("target:::::", target, response, target.state);
                // target.setState({ [route]: response });
            },
            error => console.log("ERROR [addFalcorModel]: ", error)
        );

    resolver.resolve(target);
}

export default function FalcorModelPlugin(options) {
    return {
        facets: {
            addFalcorModel: {
                initialize: addFalcorModel
            }
        }
    }
}