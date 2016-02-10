import socket from 'socket.io';

function createSocketIO(resolver, compDef, wire) {
    wire(compDef.options).then(options => {
        const server = options.basedOnServer;
        resolver.resolve(socket.listen(server));
    })
}

export default function SocketIOPlugin(options) {
    return {
        factories: {
            createSocketIO
        }
    }
}