import chai, { expect } from 'chai';
import spies from 'chai-spies';
import when from 'when';

import wire                 from 'essential-wire';
import wireDebugPlugin      from 'essential-wire/source/debug';

import reactComponentPlugin from '../../src/plugins/react/component';
import Header               from '../../src/components/Header';

chai.use(spies);

// boilerplate
// const isAuthorizedPlugin = (options) => {
//     const isAuthorized = (resolver, compDef, wire) => {
//         wire(compDef.options).then((options) => {
//             const user = options.user;
//             resolver.resolve(!!user && !!user.name);
//         });
//     }

//     return {
//         factories: {
//             isAuthorized
//         }
//     }
// }

describe('components',  () => {

    let rootContext = {};

    const before = (done) => {
        wire({
            $plugins: [
                wireDebugPlugin,
                reactComponentPlugin
            ],

            addTodo: () => {},

            Header: {
                createComponent: {
                    source: Header,
                    props: {
                        addTodo: {$ref: 'addTodo'}
                    }
                }
            }
        })
        .then((context) => {
            rootContext = context;
            done();
        })
        .otherwise((error) => console.log("ERROR::::", error))
    }

    beforeEach(before);

    it('Header ok',  (done) => {
        expect(rootContext.Header).to.be.ok;
        done();
    });

    it('Header props: addTodo',  (done) => {
        expect(rootContext.Header.props.addTodo).to.be.ok;
        done();
    });

    it('Header props: addTodo: function',  (done) => {
        expect(rootContext.Header.props.addTodo).to.be.an('function');
        done();
    });

});