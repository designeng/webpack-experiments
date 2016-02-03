import reactComponentPlugin from './plugins/react/component';
import Article from "./components/Article";

export default {
    $plugins: [
        reactComponentPlugin
    ],

    // to be resolved in routeMiddlewarePlugin/routeMiddleware facet the root container
    // should be named 'container' in specification:
    container: {
        createContainer: {
            source: Article
        }
    }
}