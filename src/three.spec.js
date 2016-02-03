import wireDebugPlugin      from 'essential-wire/source/debug';

//---------------- contextPlugin -----------------
const contextPlugin = (options) => {
    return {
        context: {
            ready: (resolver, wire) => {
                console.log("READY CONTEXT");
                resolver.resolve()
            }
        },

        create: (resolver, proxy) => {
            console.log("ID:::", proxy.id);
            resolver.resolve();
        },

        ready: (resolver, proxy, wire) => {
            console.log("PROXY:::::", proxy.target);
            resolver.resolve()
        }
    }
}
//---------------- /contextPlugin -----------------

const someComponentFactory = () => {
    const Factory = () => {}
    Factory.prototype.onReadySomeComponent = function(...persons) {
        this.greeting = "Hello " + persons;
    }
    Factory.prototype.greetAll = function() {
        console.log(this.greeting);
    }
    Factory.prototype.logExternalReactComponent = function(component) {
        console.log("ExternalReactComponent:", component);
    }
    return new Factory();
}

const anotherComponentFactory = () => {
    return class AnotherComponent {

    }
}
 
export default {
    $plugins: [
        wireDebugPlugin,
        contextPlugin
    ],
    someComponent: {
        create: someComponentFactory,
        ready: {
            onReadySomeComponent: ["one", "two", "three"],
            greetAll: {},
            logExternalReactComponent: {$ref: 'articleReactComponent'}
        }
    },
    anotherComponent: {
        create: anotherComponentFactory
    }
}