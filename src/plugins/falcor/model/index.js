import Falcor from "falcor";
import FalcorDataSource from 'falcor-http-datasource';

import React, { PropTypes } from "react";

function getWrapper(component, model, route) {
        let Component = component;

        // error: can't extend non-extendable object
        // Component.contextTypes = {
        //     model: PropTypes.object.isRequired
        // };

        class ConnectModelComponent extends React.Component {

            constructor(props) {
                super(props);
                this.state = { model: model };
            }

            getChildContext() {
                return { model: this.state.model };
            }

            componentWillMount() {
                console.log("::::::::componentWillMount:::::::::::");
                model.getValue([route])
                    .then(response => {
                        this.refs.childComponent.setState({ [route]: response });
                        console.log("this.refs.childComponent", this.refs.childComponent.state);
                    },
                    (error) => console.log("ERROR [connect-data-decorator]: ", error));
            }

            render() {
                return <Component {...this.props} ref="childComponent" />;
            }

        }

        ConnectModelComponent.childContextTypes = {
            model: React.PropTypes.object.isRequired
        }

        return ConnectModelComponent;
    };

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

    if (process.env.NODE_ENV == 'server') {
        resolver.resolve(target);
    } else if (process.env.NODE_ENV == 'client') {
        // target = new getWrapper(target, model, route);
        console.log("target::::: ", target);
        resolver.resolve(target);
    }
}

export default function FalcorModelPlugin(options) {
    return {
        facets: {
            addFalcorModel: {
                'create:after': addFalcorModel
            }
        }
    }
}