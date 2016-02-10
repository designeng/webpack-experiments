import Falcor from "falcor";
import FalcorDataSource from 'falcor-http-datasource';

import React, { PropTypes } from "react";

function invariant(response) {
    return response;
}

function createFalcorModel(resolver, compDef, wire) {
    wire(compDef.options).then(({
        sourcePath,
        route,
        invokeAfterResponse
    }) => {

        const model = new Falcor.Model({
            source: new FalcorDataSource(sourcePath)
        });

        model.getValue([route])
            .then(
                invokeAfterResponse,
                error => console.log("ERROR [addFalcorModel]: ", error)
            );

        resolver.resolve(model);
    });
}

export default function FalcorModelPlugin(options) {
    return {
        factories: {
            createFalcorModel
        }
    }
}