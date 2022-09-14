const TransIconButton = ({ title, onClick }) => (
  <button type="button" className="trans-button" onClick={onClick}>
    {title}
  </button>
);

export default TransIconButton;
