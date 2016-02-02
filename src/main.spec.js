import oneSpec      from './one.spec';
import twoSpec      from './two.spec';
import threeSpec    from './three.spec';

export default {
    $plugins: [
    ],
    test: 123,
    oneModule: {
        wire: {
            spec: oneSpec,
            defer: true
        }
    },
    twoModule: {
        wire: {
            spec: twoSpec,
            defer: true
        }
    },
    threeModule: {
        wire: {
            spec: threeSpec
        }
    }
}