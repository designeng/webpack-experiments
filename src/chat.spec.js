import wireDebugPlugin      from 'essential-wire/source/debug';
import reactComponentPlugin from './plugins/react/component';
import falcorModelPlugin    from './plugins/falcor/model';
import hotRuntimePlugin     from './plugins/hot/hotRuntimePlugin';
import storeBuilderPlugin   from './plugins/redux/storeBuilderPlugin';

import rootReducer from "./reducers";

import thunkMiddleware      from "redux-thunk";
import promiseMiddleware    from "./middleware/promiseMiddleware";

import Chat from "./components/Chat";

import config from "./config"

export default {
    $plugins: [
        wireDebugPlugin,
        reactComponentPlugin,
        falcorModelPlugin,
        storeBuilderPlugin,
        hotRuntimePlugin
    ],

    rootReducer: rootReducer,

    middleware: [
        thunkMiddleware,
        promiseMiddleware
    ],

    storeBuilder: {
        getStoreBuilder: {
            rootReducer : {$ref: 'rootReducer'},
            middleware  : {$ref: 'middleware'}
        },
        acceptHotRuntime: {
        }
    },

    container: {
        createComponent: {
            source: Chat,
            props: {
                socketIoHost: config.host,
                messagesCallback: res => { return res }
            }
        }
    },

    // noop
    invokeAfterResponse: (res) => {console.log("RESULT:", res)},

    messagesModel: {
        createFalcorModel: {
            sourcePath: 'http://localhost:3000/messages/model.json',
            route: 'messages',
            invokeAfterResponse: {$ref: 'container.props.messagesCallback'}
        }
    }

}