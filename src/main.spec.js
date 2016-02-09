import wireDebugPlugin from 'essential-wire/source/debug';
import chatSpec      from './chat.spec';

export default {
    $plugins: [

    ],

    ChatContainer: {
        wire: {
            spec: chatSpec,
            defer: true
        }
    }
}