import wireDebugPlugin      from 'essential-wire/source/debug';
import reactComponentPlugin from './plugins/react/component';
import falcorModelPlugin    from './plugins/falcor/model';

import Chat from "./components/Chat";

import config from "./config"

export default {
    $plugins: [
        wireDebugPlugin,
        reactComponentPlugin,
        falcorModelPlugin
    ],

    container: {
        createComponent: {
            source: Chat,
            props: {
                socketIoHost: config.host
            }
        }
    },

    // noop
    invokeAfterResponse: (res) => {console.log("RESULT:", res)},

    model: {
        createFalcorModel: {
            sourcePath: 'http://localhost:3000/messages/model.json',
            route: 'messages',
            invokeAfterResponse: {$ref: 'invokeAfterResponse'}
        }
    }

}