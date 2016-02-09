import reactComponentPlugin from './plugins/react/component';
import Header from "./components/Header";

export default {
    $plugins: [
        reactComponentPlugin
    ],

    Header: {
        createComponent: {
            source: Header
        }
    }

    // to be resolved in routeMiddlewarePlugin/routeMiddleware facet the root container
    // should be named 'container' in specification:
    container: {
        createContainer: {
            source: Article
        }
    }

}