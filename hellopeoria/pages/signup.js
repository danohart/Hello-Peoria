import Signup from '../components/Signup';
import Signin from '../components/Signin';
import ResetPassword from '../components/RequestReset';

const SignupPage = props => (
  <div className="sub-containter">
    <Signup />
    <Signin />
    <ResetPassword />
  </div>
);

export default SignupPage;
