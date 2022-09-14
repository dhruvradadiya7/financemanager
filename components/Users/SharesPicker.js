import { useEffect, useState } from "react";
import BigInput from "components/shared/BigInput";

// icons
import { ReactComponent as LinkIcon } from "icons/link.svg";
import { ReactComponent as CloseIcon } from "icons/close.svg";
import { ReactComponent as CheckIcon } from "icons/check.svg";
import { useAuth } from "utils/AuthContext";
import { pushObj } from "utils/fetchfb";

const SharesPicker = ({
  ticker,
  price,
  edit,
  investedPrice,
  investedShares,
  onClose,
  ...rest
}) => {
  const [shares, setShares] = useState(investedShares || 0);
  const [amount, setAmount] = useState(
    investedPrice ? investedShares * investedPrice : 0
  );
  const { currentUser } = useAuth();

  const handleShareChange = (value) => {
    setShares(value);
    const cal = value ? parseFloat(value) * parseFloat(price) : 0;
    setAmount(cal.toFixed(2));
  };

  const handleAmountChange = (value) => {
    setAmount(value);
    const cal = value ? parseFloat(value) / parseFloat(price) : 0;
    setShares(cal.toFixed(2));
  };

  const handleSubmit = async () => {
    const obj = {
      ticker,
      price,
      shares,
    };
    if (edit) {
      await createNUpdateObj(`${currentUser.uid}/portfolio`, obj);
    } else {
      await pushObj(`${currentUser.uid}/portfolio`, obj);
    }
    onClose();
  };

  return (
    <div className="shares-picker_container frcc">
      <div className="shares-picker_form">
        <h2 className="shares-picker_heading">
          {edit ? "Edit" : "Enter"} purchased shares {ticker}
        </h2>
        <button
          type="button"
          className="frcc shares-picker_close-icon close"
          onClick={() => onClose()}
        >
          <CloseIcon className="icon" />
        </button>
        <div className="shares-picker_content frcc">
          <BigInput
            title="Invested Shares"
            type="number"
            placeholder="Enter invested shares..."
            half
            value={shares}
            onChange={handleShareChange}
          />
          <LinkIcon className="shares-picker_icon" />
          <BigInput
            title="Invested Amount"
            type="number"
            placeholder="Enter invested amount..."
            half
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
        <div className="frec shares-picker_actions">
          <button
            type="button"
            className="frcc shares-picker_action-btn close"
            onClick={() => onClose()}
          >
            <CloseIcon className="shares-picker_action-btn-icon" />
            <p>Cancel</p>
          </button>
          <button
            type="button"
            className="frcc shares-picker_action-btn submit"
            onClick={() => handleSubmit()}
          >
            <CheckIcon className="shares-picker_action-btn-icon" />
            <p>Submit</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SharesPicker;
