import DateSelector from 'components/widgets/DateSelector';
import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import getObj from 'utils/fetchfb';

const SubSliderBtn = ({
  title, plannedAmount, active, onClick, id, type, monthId, setTotalSpentAmount, totalSpentAmount, updates,
}) => {
  const [usedAmount, setUsedAmount] = useState(0);
  const [subUpdates, setSubUpdates] = useState(false);
  const { currentUser } = getAuth();

  const getPlannedAmount = async () => {
    try {
      const result = await getObj(`${currentUser?.uid}/${monthId[0]}/${type}_${id}`);
      let sum = 0;
      Object.values(result).forEach((e) => { sum += parseInt(e.amount, 10); });
      if (sum !== usedAmount) {
        setUsedAmount(sum);
      }
    } catch (e) {
      console.log(e);
      setUsedAmount(0);
    }
  };
  useEffect(() => {
    if ((monthId && monthId[0]) || subUpdates) {
      getPlannedAmount();
      setSubUpdates(false);
    }
  }, [id, subUpdates, monthId && monthId[0]]);

  useEffect(() => {
    if (updates) {
      setSubUpdates(updates);
    }
  }, [updates]);

  useEffect(() => {
    setTotalSpentAmount(totalSpentAmount + usedAmount);
  }, [usedAmount]);
  return (
    <button type="button" className={`exe_main-sub-slider_item frcb ${active && 'active'}`} onClick={() => onClick()}>
      <h4>{title}</h4>
      <p>
        $
        {usedAmount}
        {' '}
        / $
        {plannedAmount}
      </p>
    </button>
  );
};

const SubSidebar = ({
  type, categories, activeCategory, setActiveCategory, months, monthId, setMonthId, setTotalSpentAmount, totalSpentAmount, updates, setUpdates
}) => {
  const [totalPlannedAmount, setTotalPlannedAmount] = useState();
  useEffect(() => {
    if (updates && categories && Object.values(categories)) {
      let sum = 0;
      Object.values(categories).forEach((e) => { sum += parseInt(e.amount, 10); });
      setTotalPlannedAmount(sum);
      setUpdates(false);
    }
  }, [updates, categories && Object.values(categories).length]);
  return (
    <div className="exe_main-sub-slider fcss">
      <h3>Finance Manager</h3>
      <div className="exe_main-sub-slider_content">
        <div className="exe_main-sub-slider_header frcb">
          <div className="fcss">
            <h1 className="exe_main-sub-slider_title">
              My
              {' '}
              {type}
            </h1>
            <p className="exe_main-sub-slider_subtitle">
              $
              {totalSpentAmount}
              / $
              {totalPlannedAmount}
            </p>
          </div>
          <DateSelector options={months} active={monthId} onClick={setMonthId} />
        </div>
        <div className="exe_main-sub-slider_items">
          {Object.entries(categories).map(([id, item]) => <SubSliderBtn type={type} title={item?.title} id={id} key={id} monthId={monthId} setTotalSpentAmount={setTotalSpentAmount} totalSpentAmount={totalSpentAmount} plannedAmount={item?.amount} usedAmount={0} active={activeCategory?.id === id} onClick={() => setActiveCategory({ ...item, id })} updates={updates} setUpdates={setUpdates} />)}
        </div>
      </div>
    </div>
  );
};

export default SubSidebar;
