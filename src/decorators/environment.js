import _ from "underscore";
const COMPILATION_MODE = process.env.COMPILATION_MODE;

export default function environment(...extraElements) {
    return (spec) => {
        if(COMPILATION_MODE == 'server'){
            let _spec = _.clone(spec);
            extraElements.forEach(element => {
                if(_spec.hasOwnProperty(element)){
                    delete _spec[element];
                }
            });
            return _spec;
        } else {
            return spec;
        }
    }
}