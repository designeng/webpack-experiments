import _ from "underscore";

const controller = function controller() {}

controller.prototype.render = function() {
    let items = _.reduce(this.news, (result, item, index) => {
        result = result + this.newsBlockTemplate(item);
        return result;
    }, '');

    let page = this.pageTemplate({ items });

    return page;
};

export default controller;