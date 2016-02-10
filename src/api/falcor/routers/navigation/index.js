import Router from 'falcor-router';
import { Model } from 'falcor';
let $atom = Model.atom;

let data = {
    items: [
        {name: "Новости", href: "/news"}, 
        {name: "Наши тест-драйвы", href: "/drive-tests"},
        {name: "Наши видео" , href: "/video"}
    ],
    brands: [
        {name: "Acura", href: "/acura/"}, 
        {name: "Alfa Romeo", href: "/alfaromeo/"}, 
        {name: "Nissan", href: "/nissan/"},
        {name: "Ferrari" , href: "/ferrari/"},
        {name: "Ford" , href: "/ford/"}
    ]
};
    
const NavigationRouter = Router.createClass([
        {
            route: "items",
            get: function() {
                return {path:["items"], value: $atom(data.items)};
            }
        },
        {
            route: "brands",
            get: function() {
                return {path:["brands"], value: $atom(data.brands)};
            }
        },
        {
            route: 'items.add',
            call: (callPath, args) => {
                console.log(callPath, args);
                var newItem = args[0];

                return [
                    {
                        path: ['items', items.length-1],
                        value: newItem
                    },
                    {
                        path: ['items', 'length'],
                        value: items.length
                    }
                ]
            }
        }
    ]);

export default NavigationRouter;