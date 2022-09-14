import cx from 'classnames';
import { ReactComponent as AddIcon } from 'icons/add.svg';

const Button = ({ title }) => (
  <div className={Styles.back}>
    <img src="/images/logo.png" alt="logo" />
    <button type="button" className={cx(Styles.button, Styles.active)}>
      {title}
      <AddIcon />
      {process.env.DEMO_KEY}
    </button>
  </div>
);


export default Button;
