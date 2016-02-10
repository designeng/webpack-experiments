import socket from 'socket.io';

function connectToServer(resolver, facet, wire) {
    const target = facet.target;
    wire(facet.options).then(server => {
        resolver.resolve(target.listen(server));
    })
}

function createSocketIO(resolver, compDef, wire) {
    resolver.resolve(socket);
}

export default function SocketIOPlugin(options) {
    return {
        factories: {
            createSocketIO
        },
        facets: {
            connectToServer: {
                'connect': connectToServer
            }
        }
    }
}