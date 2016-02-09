import wireDebugPlugin from 'essential-wire/source/debug';
import todoSpec      from './../todo.spec';

export default {
    $plugins: [

    ],

    TodoContainer: {
        wire: {
            spec: todoSpec,
            defer: true
        }
    }
}