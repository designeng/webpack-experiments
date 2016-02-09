import reactComponentPlugin from './plugins/react/component';
import UserList from "./components/UserList";

export default {
    $plugins: [
        reactComponentPlugin
    ],

    container: {
        createComponent: {
            source: UserList,
            props: {
                users: [
                    {name: "one", key: 0},
                    {name: "two", key: 1}
                ]
            }
        }
    }

}