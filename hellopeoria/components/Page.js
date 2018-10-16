import React, { Component } from 'react';
import Header from '../components/Header';
import Meta from '../components/Meta';

// Styles
import '../style.css';

class Page extends Component {
    render() {
        return (
            <div>
                <Meta />
                <Header />
                {this.props.children}
            </div>
        );
    }
}

export default Page;