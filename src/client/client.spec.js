import wireDebugPlugin from 'essential-wire/source/debug';
import articleSpec      from './../article.spec';

export default {
    $plugins: [
        wireDebugPlugin
    ],

    articleContainer: {
        wire: {
            spec: articleSpec,
            defer: true
        }
    }
}