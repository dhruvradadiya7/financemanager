import { useState, useEffect } from 'react';

// Icons
import { ReactComponent as AddIcon } from 'icons/add.svg';
import SubSidebar from 'components/shared/SubSidebar';
import TableRow from 'widgets/TableRow';
import { useAuth } from 'utils/AuthContext';
import getObj, { createNUpdateObj, pushObj } from 'utils/fetchfb';
import Alert from 'components/widgets/Alert';

const tabIndexes = {
  expenses: 1,
  incomes: 2,
  investments: 3,
};

const MainTemplate = ({ type }) => {
  const [add, setAdd] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [monthId, setMonthId] = useState(null);
  const [months, setMonths] = useState([]);
  const [totalSpentAmount, setTotalSpentAmount] = useState(0);
  const [activeData, setActiveData] = useState(null);
  const [usedAmount, setUsedAmount] = useState(0);
  const [error, setError] = useState(null);
  const [updates, setUpdates] = useState(true);
  const { masters, currentUser, fetchMasters } = useAuth();

  const fetchActiveData = async (id) => {
    try {
      const result = await getObj(`${currentUser?.uid}/${monthId[0]}/${type}_${id}`);
      setActiveData(result || []);
      let sum = 0;
      Object.values(result).forEach((e) => { sum += parseInt(e.amount, 10); });
      if (sum !== usedAmount) {
        setUsedAmount(sum);
      }
    } catch (e) {
      setActiveData(null);
      setUsedAmount(0);
      console.log('err', e);
    }
  };

  useEffect(() => {
    if (activeCategory?.id && monthId?.[0]) {
      fetchActiveData(activeCategory?.id);
    }
  }, [activeCategory?.id, monthId && monthId[0]]);

  // Get all categories for sub-sidebar
  useEffect(() => {
    const categoryResult = masters[tabIndexes[type]];
    const monthResult = masters[0];
    setCategories(categoryResult?.value || []);
    setMonths(monthResult?.value || []);
    // set default first month
    setMonthId(monthId || ((monthResult?.value && Object.entries(monthResult?.value)[0]) || null));
    // set default first category
    if (!activeCategory?.id) {
      const [id, item] = (categoryResult?.value && Object.entries(categoryResult?.value)[0]) || [];
      setActiveCategory(id ? { id, ...item } : null);
    }
    setUpdates(true);
  }, [masters]);

  useEffect(() => {
    setTotalSpentAmount(0);
  }, [monthId && monthId[0]]);

  // On submit row
  const submitData = async (values, id) => {
    try {
      let path = `${currentUser?.uid}/${monthId[0]}/${type}_${activeCategory.id}`;
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
      fetchActiveData(activeCategory?.id);
      setUpdates(true);
    } catch (e) {
      console.log(e);
      setError('Something went wrong, please try again!');
    }
  };

  // On delete row
  const deleteData = async (id) => {
    try {
      const path = `${currentUser?.uid}/${monthId[0]}/${type}_${activeCategory.id}/${id}`;
      await createNUpdateObj(path, null);
      fetchMasters();
      fetchActiveData(activeCategory?.id);
      setUpdates(true);
    } catch (e) {
      console.log(e);
      setError('Something went wrong, please try again!');
    }
  };

  const plannedActiveAmount = (activeCategory?.amount && parseInt(activeCategory?.amount, 10)) || 0;

  return (
    <>
      <SubSidebar
        type={type}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        categories={categories}
        monthId={monthId}
        setMonthId={setMonthId}
        months={months}
        setTotalSpentAmount={setTotalSpentAmount}
        totalSpentAmount={totalSpentAmount}
        updates={updates}
        setUpdates={setUpdates}
      />
      <div className="exe_main-content-box fcss">
        <div className="frcb exe_main-content_header">
          <h3>{activeCategory?.title}</h3>
          <div className="frcb exe_main-content_header-actions">
            <p className="frcb exe_main-content_header-action">
              Pre-planned :
              <span>
                $
                {plannedActiveAmount}
              </span>
            </p>
            <p className="frcb exe_main-content_header-action">
              Total Spent :
              <span>
                $
                {usedAmount}
              </span>
            </p>
            <p className="frcb exe_main-content_header-action">
              Remining Amount :
              <span>
                $
                {plannedActiveAmount - usedAmount}
              </span>
            </p>
            <button type="button" className="frcc exe_main-content_header-action exe_main-content-btn" onClick={() => setAdd(true)}>
              <p>
                <AddIcon className="exe_main-content-btn-icon" />
                Add New
              </p>
            </button>
          </div>
        </div>
        {(!add && !(activeData && Object.entries(activeData).length > 0)) ? (
          <div className="fccc exe_main-content_empty">
            <img src="/images/empty-img.png" alt="empty-category-img" />
            <h3>
              No
              {' '}
              {activeCategory?.title}
              {' '}
              record
              found!
            </h3>
            <button type="button" className="frcc exe_main-content_header-action exe_main-content-btn" onClick={() => setAdd(true)}>
              <p>
                <AddIcon className="exe_main-content-btn-icon" />
                Add New
              </p>
            </button>
          </div>
        )
          : (
            <div className="exe_main-content_table fcss">
              <div className="exe_main-content_table-row-header frss">
                <div className="exe_main-content_table-col fccs col-1">
                  <p>Date</p>
                </div>
                <div className="exe_main-content_table-col fccs col-2">
                  <p>Description</p>
                </div>
                <div className="exe_main-content_table-col fccs col-2">
                  <p>Remark</p>
                </div>
                <div className="exe_main-content_table-col fccs col-1">
                  <p>Amount</p>
                </div>
              </div>
              {add
                && (
                  <TableRow
                    empty
                    onSubmit={submitData}
                    onDelete={() => setAdd(false)}
                    setError={setError}
                  />
                )}
              {
                activeData && Object.entries(activeData).map(([id, item]) => (
                  <TableRow
                    item={{ ...item, id }}
                    onSubmit={submitData}
                    onDelete={(e) => deleteData(e.id)}
                    setError={setError}
                    key={id}
                  />
                ))
              }
            </div>
          )}
      </div>
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}
    </>
  );
};

export default MainTemplate;
