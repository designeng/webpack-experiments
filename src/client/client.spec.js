import wireDebugPlugin from 'essential-wire/source/debug';
import articleSpec      from './../article.spec';

export default {
    $plugins: [

    ],

    articleReactComponent: {
        wire: {
            spec: articleSpec,
            defer: true
        }
    }
}