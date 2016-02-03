import React from 'react';

export default class Article extends React.Component {
    constructor(props) {
        super(props);
    }

    /* This method runs when component just added to the real DOM*/
    componentDidMount() {
        
    }

    handleClick() {
        console.log("CLICK!");
    }

    render() {
        const value = "Button";
        return (
            <section>
                <div>Article content here...</div>
                <div><button value={value} onClick={this.handleClick} /></div>
            </section>
        )
    }
}

