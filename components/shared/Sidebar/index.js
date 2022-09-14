import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Icons
import { ReactComponent as HomeIcon } from 'icons/home.svg';
import { ReactComponent as ExpenseIcon } from 'icons/expenses.svg';
import { ReactComponent as IncomeIcon } from 'icons/income.svg';
import { ReactComponent as InvestmentsIcon } from 'icons/investments.svg';
import { ReactComponent as SettingsIcon } from 'icons/settings.svg';
import { ReactComponent as PortfolioIcon } from 'icons/portfolio.svg';
import { ReactComponent as UserIcon } from 'icons/user.svg';
import { useAuth } from 'utils/AuthContext';
import Settings from 'components/Settings';

const SliderBtn = ({
  Icon, title, active, url,
}) => (
  <Link href={url}>
    <button type="button" className={`fccc exe_main-slider_btn ${active && 'active'}`}>
      <Icon />
      <p>{title}</p>
    </button>
  </Link>
);

const Sidebar = () => {
  const router = useRouter();
  const { logout, currentUser, isAdmin } = useAuth();
  const [settings, setSettings] = useState(false);
  const [userData, setUserData] = useState([]);
  const initial = currentUser?.displayName ? currentUser?.displayName.charAt(0) : 'F';

  const handleLogout = async () => {
    await logout();
    router.push('/signin');
  };

  return (
    <div className="exe_main-slider fcsc">
      <button type="button" className="exe_main-slider-user frcc" onClick={handleLogout}>
        <h2>{initial}</h2>
      </button>
      <div className="exe_main-slider-btn-group fcsc">
        {/* <SliderBtn Icon={HomeIcon} title="home" url="/" active={router?.pathname === '/'} /> */}
        <SliderBtn Icon={ExpenseIcon} title="expenses" url="expenses" active={router?.pathname === '/expenses' || router?.pathname === '/'} />
        <SliderBtn Icon={IncomeIcon} title="incomes" url="incomes" active={router?.pathname === '/incomes'} />
        <SliderBtn Icon={InvestmentsIcon} title="investments" url="investments" active={router?.pathname === '/investments'} />
        <SliderBtn Icon={PortfolioIcon} title="portfolio" url="portfolio" active={router?.pathname === '/portfolio'} />
        {isAdmin && <SliderBtn Icon={UserIcon} title="users" url="users" active={router?.pathname === '/users'} />}
      </div>
      <button type="button" className="exe_main-slider-add-btn frcc" onClick={() => setSettings(true)}>
        <SettingsIcon />
      </button>
      {settings && <Settings onClose={setSettings} />}
    </div>
  );
};

export default Sidebar;
