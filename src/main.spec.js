import onePageSpec from './one.page.spec';

export default {
    $plugins: [
    ],
    test: 123,
    onePageModule: {
        wire: {
            spec: onePageSpec,
            defer: true
        }
    }
} 