import { ReactComponent as CloseIcon } from 'icons/close.svg';

const { useEffect } = require('react');

const DeleteConfirmation = ({ title, message, onCancel, onDelete }) => {
  return (
    <div className="fcss global-delete-pop_wrapper">
      <h3>{title}</h3>
      <p>{message}</p>
      <div className="global-delete-pop_actions frcb">
        <button className="cancel-btn frcc" type="button" onClick={() => onCancel()}>
          Cancel
        </button>
        <button className="delete-btn frcc" type="button" onClick={() => onDelete()}>
          Delete Anyway
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
