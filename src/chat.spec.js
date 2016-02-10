import wireDebugPlugin      from 'essential-wire/source/debug';
import reactComponentPlugin from './plugins/react/component';
import falcorModelPlugin    from './plugins/falcor/model';

import UserList from "./components/UserList";

import config from "./config"

export default {
    $plugins: [
        wireDebugPlugin,
        reactComponentPlugin,
        falcorModelPlugin
    ],

    container: {
        createComponent: {
            source: UserList,
            props: {
                socketIoHost: config.host
            }
        }
    },

    // noop
    invokeAfterResponse: (res) => {console.log("RESULT:", res)},

    model: {
        createFalcorModel: {
            sourcePath: 'http://localhost:3000/users/model.json',
            route: 'users',
            invokeAfterResponse: {$ref: 'invokeAfterResponse'}
        }
    }

}