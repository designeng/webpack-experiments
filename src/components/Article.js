import React from 'react';

export default class Article extends React.Component {
    constructor(props) {
        super(props);
    }

    /* This method runs when component just added to the real DOM*/
    componentDidMount() {
        
    }

    render() {
        return (
            <div>Article content here</div>
        )
    }
}

