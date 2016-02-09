import wireDebugPlugin  from 'essential-wire/source/debug';
import todoSpec      from './todo.spec';

export default {
    $plugins: [
        wireDebugPlugin
    ],

    todoContainer: {
        wire: {
            spec: todoSpec,
            defer: true
        }
    }
}