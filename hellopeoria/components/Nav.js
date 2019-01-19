import Link from 'next/link';
import User from './User';

const Nav = () => (
    <div className="nav">
        <User>
            {({ data: { me } }) => (
                <div>
                    <Link href={{pathname: '/places',}}>
                        <a>Places</a>
                    </Link>
                    {me && (
                    <>
                        <div>{me.name}</div>
                    </>
                    )}
                    {!me && (
                    <Link href="/signup">
                        <a>Sign In</a>
                    </Link>

                    )}
                </div>
            )}
        </User>
    </div>
)

export default Nav;