import reactComponentPlugin from './plugins/react/component';
import Article from "./components/Article";

export default {
    $plugins: [
        reactComponentPlugin
    ],

    container: {
        createContainer: {
            source: Article
        }
    }
}