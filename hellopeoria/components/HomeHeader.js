import Link from 'next/link';
import Router from 'next/router';

const HomeHeader = () => (
    <div className="hero">
        <div className="text">
        	<h3>A community-driven movement for positity in Peoria. You're already in!</h3>
        	<button className="secondary">Learn More</button>
        	<button>Get Involved</button>
        </div>
        <div className="image">
        	<div><img src="https://images.unsplash.com/photo-1524168272322-bf73616d9cb5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=161ce6b10a1b9518237d89cc7510a018&auto=format&fit=crop&w=1500&q=80" /></div>
        </div>
    </div>
)

export default HomeHeader;