import onePageSpec from './one.page.spec';
import wireDebug from 'essential-wire/source/debug';

const deferWire = (config) => {
    return (target, name, description) => {
        return {
            value: {
                wire: {
                    spec: config.spec,
                    defer: true
                }
            }
        }
    }
}

export default {

    $plugins: [
        wireDebug
    ],

    
    test: 123,

    @deferWire({spec: onePageSpec})
    onePageModule: {
    }
}