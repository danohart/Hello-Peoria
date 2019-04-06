import Link from "next/link";
import User from "./User";
import Signout from "./Signout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";

const Nav = () => (
  <div className="nav">
    <User>
      {({ data: { me } }) => (
        <>
          <Link href={{ pathname: "/places" }}>
            <a>Places</a>
          </Link>
          {me && (
            <>
              <div className="account">
                <div className="account-name">
                  <FontAwesomeIcon icon={faUserCircle} /> {me.firstName}
                  <div className="account-details">
                    <div className="account-signout">
                      <Signout />
                    </div>
                  </div>
                </div>
              </div>
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
);

export default Nav;
