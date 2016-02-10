import React from 'react';

export default class UserList extends React.Component {
    constructor(props) {
        super(props);

        console.log("UserList constructor!");
    }

    componentWillMount() {
        console.log("componentWillMount!!!!!");
    }

    /* This method runs when component just added to the real DOM*/
    componentDidMount() {
        alert(123)
        // this.props.socketIo.emit('chat_rendered', { my: 'data123' });
        const socket = io(socketIoHost);
        console.log('chat_rendered sent', io);
        socket.emit('chat_rendered', { my: 'data123' });
    }

    handleClick() {
        console.log("CLICK!");
    }

    renderUsers(users) {
        return users.map(user => {
            return <li key={user.key}>{user.name}</li>
        })
    }

    render() {
        const users = this.props.users;
        console.log("RENDERED!");
        return (
            <section>
                <ul>
                    {this.renderUsers(users)}
                </ul>
                <div><button value='button' onClick={this.handleClick} /></div>
            </section>
        )
    }
}