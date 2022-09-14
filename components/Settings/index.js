import { useState, useEffect } from 'react';

// Icons
import { ReactComponent as CalenderIcon } from 'icons/calender.svg';
import { ReactComponent as ExpenseIcon } from 'icons/expenses.svg';
import { ReactComponent as IncomeIcon } from 'icons/income.svg';
import { ReactComponent as InvestmentsIcon } from 'icons/investments.svg';
import { ReactComponent as AddIcon } from 'icons/add.svg';
import { ReactComponent as CloseIcon } from 'icons/close.svg';
import { useAuth } from 'utils/AuthContext';
import Alert from 'components/widgets/Alert';
import { createNUpdateObj, pushObj } from 'utils/fetchfb';
import DeleteConfirmation from 'components/widgets/DeleteConfirmation';
import TableRow from './TableRow';

const settingsTab = {
  'Customize Months': 0,
  'Expense Categories': 1,
  'Income Categories': 2,
  'Investment Categories': 3,
};
const settingsURI = {
  'Customize Months': process.env.NEXT_PUBLIC_MASTER_MONTH_KEY || 'months',
  'Expense Categories': process.env.NEXT_PUBLIC_MASTER_INCOME_CATEGORY_KEY || 'income_categories',
  'Income Categories': process.env.NEXT_PUBLIC_MASTER_EXPENSE_CATEGORY_KEY || 'expense_categories',
  'Investment Categories': process.env.NEXT_PUBLIC_MASTER_INVESTMENT_CATEGORY_KEY || 'investment_categories',
};

const Settings = ({ onClose }) => {
  const [currentSection, setCurrentSection] = useState('Customize Months');
  const [add, setAdd] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [shouldDelete, setShouldDelete] = useState(null);

  const { masters, currentUser, fetchMasters } = useAuth();
  useEffect(() => {
    const result = masters[settingsTab[currentSection]];
    setCategories(result?.value || []);
  }, [masters, currentSection]);

  const submitCategory = async (values, id) => {
    try {
      let path = `${currentUser.uid}/${settingsURI[currentSection]}`;
      let result = {};
      if (id) {
        // Edit Category
        path = `${path}/${id}`;
        result = await createNUpdateObj(path, values);
      } else {
        // Add Category
        result = await pushObj(path, values);
      }
      if (add) { setAdd(false); }
      fetchMasters();
    } catch (e) {
      console.log(e);
      setError('Something went wrong, please try again!');
    }
  };

  const deleteCategory = async (id) => {
    try {
      const path = `${currentUser.uid}/${settingsURI[currentSection]}/${id}`;
      const result = await createNUpdateObj(path, null);
      console.log(result);
      setShouldDelete(null);
      fetchMasters();
    } catch (e) {
      console.log(e);
      setError('Something went wrong, please try again!');
    }
  };

  return (
    <>
      <div className="setting_global_form-container frss fade-in">
        <div className="sgf_sidebar fcss">
          <button type="button" className={`sgf_sidebar-item fccc ${currentSection === 'Customize Months' && 'active'}`} onClick={() => setCurrentSection('Customize Months')}>
            <CalenderIcon />
            <p>Customize Months</p>
          </button>
          <button type="button" className={`sgf_sidebar-item fccc ${currentSection === 'Expense Categories' && 'active'}`} onClick={() => setCurrentSection('Expense Categories')}>
            <ExpenseIcon />
            <p>Expense Categories</p>
          </button>
          <button type="button" className={`sgf_sidebar-item fccc ${currentSection === 'Income Categories' && 'active'}`} onClick={() => setCurrentSection('Income Categories')}>
            <IncomeIcon />
            <p>Income Categories</p>
          </button>
          <button type="button" className={`sgf_sidebar-item fccc ${currentSection === 'Investment Categories' && 'active'}`} onClick={() => setCurrentSection('Investment Categories')}>
            <InvestmentsIcon />
            <p>Investment Categories</p>
          </button>
        </div>
        <div className="sgf_content_box">
          <div className="sgf_content_header frcb">
            <h3>{currentSection}</h3>
            <div className="frcc">
              <button type="button" className="frcc sgf_content_header-action-btn" onClick={() => setAdd(true)}>
                <p>
                  <AddIcon className="sgf_content_header-action-btn-icon" />
                  Add New
                </p>
              </button>
              <button type="button" className="frcc sgf_content_header-action-btn close" onClick={() => onClose(false)}>
                <CloseIcon className="sgf_content_header-action-btn-icon" />
              </button>
            </div>
          </div>

          {(!add && Object.entries(categories).length < 1) ? (
            <div className="fccc sgf_content_empty">
              <img src="/images/empty-img.png" alt="empty-category-img" />
              <h3>
                No
                {' '}
                {currentSection}
                {' '}
                found!
              </h3>
            </div>
          )
            : (
              <div className="sgf_content_table fcss">
                <div className="sgf_content_table-row-header frss">
                  <div className="sgf_content_table-col fccs">
                    <p>Title</p>
                  </div>
                  <div className="sgf_content_table-col fccs">
                    <p>Planned Amount</p>
                  </div>
                </div>
                {add
                  && (
                    <TableRow
                      empty
                      onSubmit={submitCategory}
                      onDelete={() => setAdd(false)}
                      setError={setError}
                    />
                  )}
                {Object.entries(categories).reverse().map(([id, item]) => (
                  <TableRow
                    item={{ ...item, id }}
                    onSubmit={submitCategory}
                    onDelete={setShouldDelete}
                    setError={setError}
                    key={id}
                  />
                ))}
              </div>
            )}
        </div>
      </div>
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}
      {shouldDelete?.id && <DeleteConfirmation title={`Are you sure to delete ${shouldDelete.title}?`} message="Once you delete this data, you may loss all relevent stored data with it." onDelete={() => deleteCategory(shouldDelete?.id)} onCancel={() => setShouldDelete(null)} />}
    </>
  );
};

export default Settings;
