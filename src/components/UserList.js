import React from 'react';

export default class UserList extends React.Component {
    constructor(props) {
        super(props);
    }

    /* This method runs when component just added to the real DOM*/
    componentDidMount() {
        
    }

    renderUsers(users) {
        return users.map(user => {
            return <li key={user.key}>{user.name}</li>
        })
    }

    render() {
        const users = this.props.users
        return (
            <section>
                <ul>
                    {this.renderUsers(users)}
                </ul>
            </section>
        )
    }
}