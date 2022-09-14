import { ReactComponent as LineOneImg } from 'images/Auth/LineOne.svg';
import { ReactComponent as LineTwoImg } from 'images/Auth/LineTwo.svg';

const AuthSidebar = ({ heading, subHeading }) => (
  <div className="fccs auth-sidebar_container">
    <LineOneImg className="auth-sidebar_line-one" />
    <h2>{heading}</h2>
    <p>{subHeading}</p>
    <LineTwoImg className="auth-sidebar_line-two" />
  </div>
);

export default AuthSidebar;
