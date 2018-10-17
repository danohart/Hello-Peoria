import React, { Component } from 'react';
import Header from '../components/Header';
import Meta from '../components/Meta';

// Styles
import '../styles/style.scss';

class Page extends Component {
    render() {
        return (
            <div className="main">
                <Meta />
                <Header />
                {this.props.children}
            </div>
        );
    }
}

export default Page;