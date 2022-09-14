import { ReactComponent as EditIcon } from 'icons/edit.svg';
import { ReactComponent as DeleteIcon } from 'icons/delete.svg';
import { ReactComponent as CloseIcon } from 'icons/close.svg';
import { ReactComponent as CheckIcon } from 'icons/check.svg';
import { useEffect, useState } from 'react';
import Alert from 'components/widgets/Alert';

const TableRow = ({
  item, onSubmit, onDelete, empty, setError,
}) => {
  const [edit, setEdit] = useState(empty || false);
  const [title, setTitle] = useState(item?.title || '');
  const [amount, setAmount] = useState(item?.amount || '');

  useEffect(() => {
    if (edit) {
      setTitle(item?.title);
      setAmount(item?.amount);
    }
  }, [edit]);

  const handleSubmit = () => {
    if (!title) {
      return setError('Please enter Title field to save!');
    }
    if (!amount) {
      return setError('Please enter Amount field to save!');
    }
    setEdit(false);
    onSubmit({
      title, amount,
    }, item?.id);
  };

  const handleKeyUp = ({ key }) => {
    if (key === 'Enter') {
      handleSubmit();
    }
  };
  return (
    <div className={`sgf_content_table-row frss ${edit && 'edit'}`} onDoubleClick={() => setEdit(true)}>
      <div className="sgf_content_table-col fccs">
        {edit ? <input type="text" className="sgf_content_table-col_input frsc" placeholder="title" onKeyUp={handleKeyUp} value={title || ''} onChange={(e) => setTitle(e.target.value)} /> : <p>{item?.title}</p>}
      </div>
      <div className="sgf_content_table-col fccs">
        {edit ? <input type="number" className="sgf_content_table-col_input max-width frsc" placeholder="amount" onKeyUp={handleKeyUp} value={amount || ''} onChange={(e) => setAmount(e.target.value)} /> : (
          <p>
            $
            {item?.amount}
          </p>
        )}
      </div>
      <div className="sgf_content_table-row-actions frcc">
        {edit
          ? (
            <button type="button" className="sgf_content_table-row-action fccc check-btn" onClick={() => handleSubmit()}>
              <CheckIcon />
            </button>
          )
          : (
            <button type="button" className="sgf_content_table-row-action fccc edit-btn" onClick={() => setEdit(true)}>
              <EditIcon />
            </button>
          )}
        {edit && !empty
          ? (
            <button type="button" className="sgf_content_table-row-action fccc delete-btn" onClick={() => setEdit(false)}>
              <CloseIcon />
            </button>
          )
          : (
            <button type="button" className="sgf_content_table-row-action fccc delete-btn" onClick={() => onDelete(item)}>
              <DeleteIcon />
            </button>
          )}
      </div>
    </div>
  );
};

export default TableRow;
