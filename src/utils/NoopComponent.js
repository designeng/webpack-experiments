// noop component class
export default class NoopComponent {
    constructor(options) {
        const {
            html
        } = options;

        this.html = html;

        this.props = {
            messagesCallback: () => {}
        }
    }

    toHtml() {
        return this.html;
    }

    render() {

    }
}