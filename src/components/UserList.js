import React from 'react';

export default class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {users: []}
    }

    handleClick() {
        console.log("CLICK!", this.state.users);

        // this.setState({ users: [
        //             {name: "wiliam", key: 0},
        //             {name: "mariam", key: 1}
        //         ]})

        const socket = io(this.props.socketIoHost);
        socket.emit('chat_click', { my: 'data123', clicked: true });
    }

    renderUsers(users) {
        return users.map(user => {
            return <li key={user.key}>{user.name}</li>
        })
    }

    render() {
        const users = this.state.users;
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