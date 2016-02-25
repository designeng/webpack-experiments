import onePageSpec from './one.page.spec';
import someClass from './someClass';

export default {
    $plugins: [
    ],
    test: 123,
    onePageModule: {
        wire: {
            spec: onePageSpec,
            defer: true
        }
    },
    someInstance: {
        create: {
            module: someClass,
            isConstructor: true
        }
    }
}