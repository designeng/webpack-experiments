import wireDebugPlugin from 'essential-wire/source/debug';
import articleSpec      from './../article.spec';

export default {
    $plugins: [

    ],

    articleContainer: {
        wire: {
            spec: articleSpec,
            defer: true
        }
    }
}