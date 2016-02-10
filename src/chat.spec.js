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
                users: [
                    {name: "one", key: 0},
                    {name: "two", key: 1}
                ],
                socketIoHost: config.host
            }
        },
        addFalcorModel: {
            sourcePath: '/users/model.json',
            route: 'users'
        }
    }

}