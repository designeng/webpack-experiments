import Router from 'falcor-router';
import { Model } from 'falcor';

let $atom = Model.atom;

const usersSource = [
    {name: 'John'},
    {name: 'Paul'},
    {name: 'Augustin'},
    {name: 'Robert'},
]

const UsersRouter = Router.createClass([
    {
        route: "users",
        get: function() {
            return {path:["users"], value: $atom(usersSource)};
        }
    }
]);

export default UsersRouter;