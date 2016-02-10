// import meld from "meld";
import Falcor from "falcor";
import FalcorDataSource from 'falcor-http-datasource';

import React, { PropTypes } from "react";

function invariant(response) {
    return response;
}

function createFalcorModel(resolver, compDef, wire) {
    const {
        sourcePath,
        route,
        invokeAfterResponse
    } = compDef.options;

    const model = new Falcor.Model({
        source: new FalcorDataSource(sourcePath)
    });

    // meld.after(null, invariant, function(res) {
    //     console.log("RES::::", res);
    // });

    model.getValue([route])
        .then(
            invariant,
            error => console.log("ERROR [addFalcorModel]: ", error)
        );

    resolver.resolve(model);
}

export default function FalcorModelPlugin(options) {
    return {
        factories: {
            createFalcorModel
        }
    }
}