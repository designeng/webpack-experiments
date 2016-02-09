import reactComponentPlugin from './plugins/react/component';
import UserList from "./components/UserList";

export default {
    $plugins: [
        reactComponentPlugin
    ],

    UserList: {
        createComponent: {
            source: UserList,
            props: {
                users: [
                    {name: "one"},
                    {name: "two"}
                ]
            }
        }
    }

}