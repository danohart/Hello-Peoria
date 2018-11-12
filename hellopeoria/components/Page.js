import React, { Component } from 'react';
import Header from './Header';
import HomeHeader from './HomeHeader';
import Meta from './Meta';

// Styles
import '../styles/style.scss';

class Page extends Component {
    render() {
        return (
            <div>
                <Meta />
                <Header />
                <HomeHeader />
                <div className="main">
                	{this.props.children}
                </div>
            </div>
        );
    }
}

export default Page;