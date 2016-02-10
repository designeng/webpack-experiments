import React from 'react';

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {users: [{name: 'one', key: 1}]}
    }

    componentDidMount() {
        this.socket = io(this.props.socketIoHost);
        this.textarea = document.getElementById("messageField");

        console.log("messagesCallback .......", this.props.messagesCallback);
    }

    handleClick() {
        let message = this.textarea.value
        this.socket.emit('chat_click', {message: message});
        console.log("CLICK", message);
    }

    handleChange(event) {
        console.log("TARGET::::", event.target.value);
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
                <textarea id="messageField" onChange={this.handleChange.bind(this)}/>
                <input type="button" value='Send Message' onClick={this.handleClick.bind(this)} />
            </section>
        )
    }
}