import wireDebugPlugin      from 'essential-wire/source/debug';
import reactComponentPlugin from './plugins/react/component';

import Article from "./components/Article"

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
    return new Factory();
}

const anotherComponentFactory = () => {
    return class AnotherComponent {

    }
}
 
export default {
    $plugins: [
        wireDebugPlugin,
        contextPlugin,
        reactComponentPlugin
    ],
    someComponent: {
        create: someComponentFactory,
        ready: {
            onReadySomeComponent: ["one", "two", "three"],
            greetAll: {}
        }
    },
    anotherComponent: {
        create: anotherComponentFactory
    },
    article: {
        createComponent: {
            // source: "./components/Article"
            source: Article
        },
        // renderIn: {
        //     selector: "#root"
        // }
    }
}