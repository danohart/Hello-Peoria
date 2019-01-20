import Link from 'next/link';
import User from './User';
import Signout from './Signout';

const Nav = () => (
    <div className="nav">
        <User>
            {({ data: { me } }) => (
                <>
                    <Link href={{pathname: '/places',}}>
                        <a>Places</a>
                    </Link>
                    {me && (
                    <>
                        <div>{me.name}</div>
                        <Signout />
                    </>
                    )}
                    {!me && (
                    <Link href="/signup">
                        <a>Sign In</a>
                    </Link>
                    )}
                </>
            )}
        </User>
    </div>
)

export default Nav;