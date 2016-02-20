import wireDebugPlugin  from 'essential-wire/source/debug';
import pipeline         from 'when/pipeline';
import articleSpec      from './article.spec';

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