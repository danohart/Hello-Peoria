import React, { Component } from 'react';
import { initGA, logPageView } from '../lib/analytics';
import Header from './Header';
import Alert from './Alert';
import Footer from './Footer';

// Styles
import '../styles/style.scss';

class Page extends Component {
  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }
  render() {
    return (
      <div>
        <Alert />
        <Header />
        <div className='main'>{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}

export default Page;
