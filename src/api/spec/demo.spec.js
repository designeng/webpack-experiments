import wireDebugPlugin  from 'essential-wire/source/debug';
import { getNewsUrl }  from '../config';

export default {
    $plugins: [
        wireDebugPlugin,
        requestPlugin
    ],

    news: {
        request: {
            url: getNewsUrl(),
            params: [
                {count: 10}
            ]
        }
    }
}