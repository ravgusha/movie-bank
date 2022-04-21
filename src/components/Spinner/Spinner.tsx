import './Spinner.scss';

const Spinner = () => {
  return (
    <div className="spinner-container" data-testid="spinner">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Spinner;
