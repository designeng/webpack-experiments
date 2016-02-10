import React from 'react';

export default class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    /* This method runs when component just added to the real DOM*/
    componentDidMount() {
        // const socket = io(this.props.socketIoHost);
        // socket.emit('chat_rendered', { my: 'data123' });
    }

    handleClick() {
        console.log("CLICK!");
        const socket = io(this.props.socketIoHost);
        socket.emit('chat_click', { my: 'data123', clicked: true });
    }

    renderUsers(users) {
        return users.map(user => {
            return <li key={user.key}>{user.name}</li>
        })
    }

    render() {
        const users = this.props.users;
        return (
            <section>
                <ul>
                    {this.renderUsers(users)}
                </ul>
                <div><button value='button' onClick={this.handleClick.bind(this)} /></div>
            </section>
        )
    }
}