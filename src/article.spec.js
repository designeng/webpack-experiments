import reactComponentPlugin from './plugins/react/component';
import Article from "./components/Article";

export default {
    $plugins: [
        reactComponentPlugin
    ],

    // TODO: createContainer facet ?
    container: {
        createComponent: {
            source: Article
        }
    }
}