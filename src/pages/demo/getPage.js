import _ from 'underscore';

export default function getPage(items, block, page) {
    return page({ items:  _.reduce(items, (result, item, index) => {
        result = result + block(item);
        return result;
    }, '') });
}