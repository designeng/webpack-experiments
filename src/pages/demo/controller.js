// function pageController() {
// }

// pageController.prototype.render = function() {
//     return "ABC... " + this.news;
// }

// export default pageController;

class PageController {
    render() {
        return "ABC... " + this.news;
    }
}

export function contr() {
    return PageController;
}
