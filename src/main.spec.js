import oneSpec      from './one.spec';
import twoSpec      from './two.spec';

import reactComponentPlugin from './plugins/react/component';

import Article from "./components/Article";

export default {
    $plugins: [
        reactComponentPlugin
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

    articleReactComponent: {
        createComponent: {
            source: Article
        }
    }
}