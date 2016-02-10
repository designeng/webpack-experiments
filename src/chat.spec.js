import reactComponentPlugin from './plugins/react/component';
import UserList from "./components/UserList";

// import io from "socket.io"
import config from "./config"

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
                ],
                socketIoHost: config.host
            }
        }
    }

}