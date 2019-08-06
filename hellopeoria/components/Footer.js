import React, { Component } from 'react';
import Link from 'next/link';

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="copyright">
          &copy; Hello Peoria &bull; {new Date().getFullYear()}
        </div>
        <div>
          <Link href="/terms-privacy">
            <a> Terms & Privacy Policy</a>
          </Link>
        </div>
      </div>
    );
  }
}

export default Footer;
