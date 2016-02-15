import onePageSpec  from './one.page.spec';
import deferWire    from './decorators/deferWire';

import wireDebug    from 'essential-wire/source/debug';

export default {

    $plugins: [
        wireDebug
    ],

    test: 123,

    @deferWire({spec: onePageSpec})
    onePageModule: {}
}